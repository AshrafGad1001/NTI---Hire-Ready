const express = require("express");
const router = express.Router();
const { getAllUsers, getMe } = require("./user.controller");
const protect = require("../../middleware/protect");
const restrictTo = require("../../middleware/restrictTo");
router.use(protect);
router.get("/me", getMe);
router.get("/", restrictTo("admin"), getAllUsers);
module.exports = router;