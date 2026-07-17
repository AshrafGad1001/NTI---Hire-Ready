const User = require("./user.model");

/**
 * @desc    عرض كل المستخدمين
 * @route   GET /api/users
 * @access  Protected + Admin Only
 */
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-__v");
        // الباسورد مش هيرجع هنا عشان select: false في الـ schema 👍
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    عرض بيانات اليوزر الحالي (اللي عامل login)
 * @route   GET /api/users/me
 * @access  Protected — أي يوزر مسجل دخول يقدر يشوف بياناته
 */
exports.getMe = async (req, res, next) => {
    try {
        // req.user.userId جاي من الـ protect middleware (من الـ JWT payload)
        const user = await User.findById(req.user.userId).select("-__v");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};