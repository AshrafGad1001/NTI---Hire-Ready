const User = require("./user.model");
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-__v");
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        next(error);
    }
};
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select("-__v");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};