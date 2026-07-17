const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const protect = require("../../middleware/protect");

// ── Public Routes — ما محتاجوش login ──
router.post("/register", authController.register);       // تسجيل يوزر جديد
router.post("/login", authController.login);             // تسجيل دخول
router.post("/refresh-token", authController.refreshToken); // تجديد tokens
router.post("/logout", authController.logout);           // خروج من جهاز واحد

// ── Protected Route — محتاج access token ──
// عشان نعرف userId بتاع مين عشان نلغي كل tokens بتاعته
router.post("/logout-all", protect, authController.logoutAll);

module.exports = router;