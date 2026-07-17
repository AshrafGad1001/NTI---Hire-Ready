const User = require("../User/user.model");
const RefreshToken = require("../../models/RefreshToken");
const { generateAccessToken, generateRefreshToken } = require("../../utils/generateTokens");
const hashToken = require("../../utils/hashToken");
const getRefreshTokenExpiry = () => {
    const days = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN) || 7;
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};
const setRefreshTokenCookie = (res, refreshToken) => {
    const days = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN) || 7;
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: days * 24 * 60 * 60 * 1000, 
        path: "/", 
    });
};
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
        next(error); 
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
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated. Contact an admin.",
            });
        }
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
        const { refreshToken: incomingToken } = req.cookies;
        if (!incomingToken) {
            return res.status(401).json({
                success: false,
                message: "No refresh token provided",
            });
        }
        const incomingTokenHash = hashToken(incomingToken);
        const storedToken = await RefreshToken.findOne({ tokenHash: incomingTokenHash });
        if (!storedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }
        if (storedToken.isRevoked) {
            await RefreshToken.updateMany(
                { userId: storedToken.userId },
                { isRevoked: true }
            );
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
        if (storedToken.expiresAt < new Date()) {
            return res.status(401).json({
                success: false,
                message: "Refresh token has expired. Please log in again.",
            });
        }
        storedToken.isRevoked = true;
        await storedToken.save();
        const user = await User.findById(storedToken.userId);
        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists or is deactivated",
            });
        }
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken();
        await RefreshToken.create({
            tokenHash: hashToken(newRefreshToken),
            userId: user._id,
            deviceInfo: req.headers["user-agent"] || "Unknown",
            expiresAt: getRefreshTokenExpiry(),
        });
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
            await RefreshToken.findOneAndUpdate(
                { tokenHash },
                { isRevoked: true }
            );
        }
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
        await RefreshToken.updateMany(
            { userId: req.user.userId },
            { isRevoked: true }
        );
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