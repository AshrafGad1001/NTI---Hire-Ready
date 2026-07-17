const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" }
    );
};

const generateRefreshToken = () => {
    return crypto.randomBytes(40).toString("hex");
};

module.exports = { generateAccessToken, generateRefreshToken };