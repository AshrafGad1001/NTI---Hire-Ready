const User = require("../User/user.model");
const RefreshToken = require("../../models/RefreshToken");
const { generateAccessToken, generateRefreshToken } = require("../../utils/generateTokens");
const hashToken = require("../../utils/hashToken");

// ── Helper: حساب تاريخ انتهاء الـ Refresh Token ──
const getRefreshTokenExpiry = () => {
    const days = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN) || 7;
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};

// ── Helper: تخزين الـ Refresh Token كـ HttpOnly Cookie ──
const setRefreshTokenCookie = (res, refreshToken) => {
    const days = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN) || 7;
    res.cookie("refreshToken", refreshToken, {
        // ══ أمان: HttpOnly ══
        // الجافاسكريبت في البراوزر مش هتقدر تقرأ الـ cookie دي
        // حتى لو في XSS attack، المهاجم مش هيقدر يسرق الـ refresh token
        httpOnly: true,

        // ══ أمان: Secure ══
        // الـ cookie بتتبعت على HTTPS بس (في production)
        // بيمنع إن حد يعترض الـ cookie على شبكة مش مشفرة
        secure: process.env.NODE_ENV === "production",

        // ══ أمان: SameSite=Strict ══
        // الـ cookie مش بتتبعت مع requests جاية من مواقع تانية
        // بيمنع CSRF attacks — لو موقع تاني حاول يبعت request باسم اليوزر
        // البراوزر مش هيبعت الـ cookie معاه
        sameSite: "Strict",

        maxAge: days * 24 * 60 * 60 * 1000, // المدة بالمللي ثانية
        path: "/", // الـ cookie متاحة على كل المسارات
    });
};

// ═══════════════════════════════════════════════
// 1. REGISTER — تسجيل يوزر جديد
// ═══════════════════════════════════════════════
/**
 * @route   POST /api/auth/register
 * @access  Public — أي حد يقدر يسجل
 *
 * ══ ليه مش بنعمل auto-login بعد التسجيل؟ ══
 * 1. بيأكد إن اليوزر فعلاً عارف بياناته (هيحتاج يدخلها تاني)
 * 2. بيعمل audit trail واضح — التسجيل والدخول events منفصلة
 * 3. في المستقبل ممكن نضيف email verification قبل السماح بالدخول
 */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "A user with this email already exists",
            });
        }


        await User.create({ name, email, password });

        res.status(201).json({
            success: true,
            message: "User registered successfully. Please log in.",
        });
    } catch (error) {
        next(error); // أي خطأ بيتبعت للـ centralized error handler
    }
};


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        // ── لازم نستخدم .select("+password") ──
        // عشان في الـ schema حاطين select: false على الباسورد
        // بدون ده مش هنقدر نقارن الباسورد
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.comparePassword(password))) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // لو اليوزر متعطل
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated. Contact an admin.",
            });
        }

        // ── إنشاء التوكنات ──
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken();


        await RefreshToken.create({
            tokenHash: hashToken(refreshToken),
            userId: user._id,
            deviceInfo: req.headers["user-agent"] || "Unknown",
            expiresAt: getRefreshTokenExpiry(),
        });


        setRefreshTokenCookie(res, refreshToken);


        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        // بنقرأ الـ refresh token من الـ cookie
        const { refreshToken: incomingToken } = req.cookies;

        if (!incomingToken) {
            return res.status(401).json({
                success: false,
                message: "No refresh token provided",
            });
        }


        const incomingTokenHash = hashToken(incomingToken);

        // بندور على الـ token في الداتابيز
        const storedToken = await RefreshToken.findOne({ tokenHash: incomingTokenHash });

        if (!storedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }


        if (storedToken.isRevoked) {
            // 🔴 إلغاء كل الـ tokens بتاعت اليوزر ده على كل الأجهزة
            await RefreshToken.updateMany(
                { userId: storedToken.userId },
                { isRevoked: true }
            );

            // مسح الـ cookie
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
            });

            return res.status(401).json({
                success: false,
                message: "Suspicious activity detected. All sessions have been revoked. Please log in again.",
            });
        }

        // بنشيك لو الـ token انتهت صلاحيته
        // (الـ TTL index بيمسح الـ documents تلقائيًا بس ممكن يكون في delay)
        if (storedToken.expiresAt < new Date()) {
            return res.status(401).json({
                success: false,
                message: "Refresh token has expired. Please log in again.",
            });
        }

        // ══ ROTATION: بنعمل revoke للـ token الحالي ══
        // كده لو حد حاول يستخدمه تاني، هنعرف إن في سرقة
        storedToken.isRevoked = true;
        await storedToken.save();

        // بنتأكد إن اليوزر لسه موجود ونشط
        const user = await User.findById(storedToken.userId);
        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists or is deactivated",
            });
        }

        // ── إنشاء token pair جديد ──
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken();

        // تخزين الـ hash بتاع الـ token الجديد
        await RefreshToken.create({
            tokenHash: hashToken(newRefreshToken),
            userId: user._id,
            deviceInfo: req.headers["user-agent"] || "Unknown",
            expiresAt: getRefreshTokenExpiry(),
        });

        // بعت الـ refresh token الجديد كـ cookie
        setRefreshTokenCookie(res, newRefreshToken);

        res.status(200).json({
            success: true,
            message: "Tokens refreshed successfully",
            data: { accessToken: newAccessToken },
        });
    } catch (error) {
        next(error);
    }
};


exports.logout = async (req, res, next) => {
    try {
        const { refreshToken: incomingToken } = req.cookies;

        if (incomingToken) {
            const tokenHash = hashToken(incomingToken);
            // بنعمل revoke مش delete — عشان لو حد حاول يستخدمه تاني
            // هنقدر نكشف السرقة (theft detection)
            await RefreshToken.findOneAndUpdate(
                { tokenHash },
                { isRevoked: true }
            );
        }

        // مسح الـ cookie بغض النظر عن أي حاجة
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        next(error);
    }
};


exports.logoutAll = async (req, res, next) => {
    try {
        // req.user.userId موجود عشان الـ protect middleware حطه
        await RefreshToken.updateMany(
            { userId: req.user.userId },
            { isRevoked: true }
        );

        // مسح الـ cookie على الجهاز الحالي
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        res.status(200).json({
            success: true,
            message: "Logged out from all devices successfully",
        });
    } catch (error) {
        next(error);
    }
};