const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const protect = require("../../middleware/protect");
const validate = require("../../middleware/validate");
const { registerSchema, loginSchema } = require("./auth.validation");

router.post("/register", validate(registerSchema), authController.register);       
router.post("/login", validate(loginSchema), authController.login);             
router.post("/refresh-token", authController.refreshToken); 
router.post("/logout", authController.logout);           
router.post("/logout-all", protect, authController.logoutAll);
module.exports = router;