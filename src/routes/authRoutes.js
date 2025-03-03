const express = require("express");
const authController = require("../controller/authController");
const upload = require("../helper/multer");

const router = express.Router();

// Sign-Up
router.post("/signup", upload.single("image"), authController.signUp);

// Login
router.post("/login", authController.Login);

// Forgot Password
router.post("/forgot-password", authController.forgotPassword);

// Reset Password
router.post("/reset-password", authController.ResetPassword);

// Resend OTP
router.post("/resend-otp", authController.resendOtp);

module.exports = router;