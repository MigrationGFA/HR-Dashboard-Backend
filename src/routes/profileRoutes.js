const express = require("express");
const profileController = require("../controller/profileController");
const upload = require("../helper/multer");

const router = express.Router();

// Onboarding
router.post("/onboarding", upload.single("image"), profileController.onboarding);

// Update Profile
router.patch("/update-profile/:userId", upload.single("image"), profileController.updateProfile);

module.exports = router;