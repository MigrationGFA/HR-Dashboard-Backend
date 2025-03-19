const express = require("express");
const profileController = require("../controller/profileController");
const upload = require("../helper/multer");
const {authenticatedUser, hrAuthentication} = require("../middlewares/authentication");

const router = express.Router();

// Onboarding
router.post("/onboarding", upload.single("image"), authenticatedUser, profileController.onboarding);

// Update Profile
router.patch("/update-profile/:userId", upload.single("image"), authenticatedUser, profileController.updateProfile);

router.get("/get-profile/", authenticatedUser, hrAuthentication, profileController.getAllStaff);

module.exports = router;