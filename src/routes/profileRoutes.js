const express = require("express");
const profileController = require("../controller/profileController");
const upload = require("../helper/multer");
const authMiddleware = require("../middlewares/authentication");

const router = express.Router();

// Onboarding
router.post("/onboarding", upload.single("image"), authMiddleware, profileController.onboarding);

// Update Profile
router.patch("/update-profile/:userId", upload.single("image"), authMiddleware, profileController.updateProfile);

module.exports = router;