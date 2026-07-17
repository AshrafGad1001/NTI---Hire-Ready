const express = require("express");
const router = express.Router();
const { getAllUsers, getMe } = require("./user.controller");
const protect = require("../../middleware/protect");
const restrictTo = require("../../middleware/restrictTo");

// كل routes الـ users محتاجة login
router.use(protect);

// أي يوزر logged in يقدر يشوف بياناته
router.get("/me", getMe);

// admin بس يقدر يشوف كل المستخدمين
router.get("/", restrictTo("admin"), getAllUsers);

module.exports = router;