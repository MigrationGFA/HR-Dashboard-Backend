const profileService = require("../services/profileServices");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

// Onboarding
exports.onboarding = async (req, res) => {
  try {
    const cleanedBody = Object.keys(req.body).reduce((acc, key) => {
      acc[key.trim()] = req.body[key];
      return acc;
    }, {});

    const {
      userId,
      fullName,
      dob,
      nextOfKinName,
      phone,
      address,
      maritalStatus,
      medicalStatus,
      reportingOfficer,
      medicalDescription
    } = cleanedBody;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format." });
    }
    if (!mongoose.Types.ObjectId.isValid(reportingOfficer)) {
      return res.status(400).json({ message: "Invalid reportingOfficer format." });
    }

    if (isNaN(new Date(dob))) {
      return res.status(400).json({ message: "Invalid DOB format." });
    }

    let imageUrl = null;
    if (req.file) {
      const normalizedImageFile = req.file.path.replace(/\\/g, "/");
      const result = await cloudinary.uploader.upload(normalizedImageFile, {
        folder: "profile_images",
        resource_type: "auto",
      });
      imageUrl = result.secure_url;
    }

    const result = await profileService.onBoardUser({
      userId,
      fullName,
      dob: new Date(dob),
      nextOfKinName,
      phone,
      address,
      maritalStatus,
      medicalStatus,
      reportingOfficer,
      imageUrl,
      medicalDescription
    });

    res.status(200).json(result);
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const {userId} = req.params;
    const {
      fullName,
      dob,
      nextOfKinName,
      phone,
      address,
      maritalStatus,
      medicalStatus,
      medicalDescription,

    } = req.body;

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images",
        resource_type: "auto",
      });
      imageUrl = result.secure_url;
    }

    const updateFields = {};
    if (fullName) updateFields.fullName = fullName;
    if (dob) updateFields.dob = new Date(dob);
    if (nextOfKinName) updateFields.nextOfKinName = nextOfKinName;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;
    if (maritalStatus) updateFields.maritalStatus = maritalStatus;
    if (medicalStatus) updateFields.medicalStatus = medicalStatus;
    if (medicalDescription)
      updateFields.medicalDescription = medicalDescription;
    if (imageUrl) updateFields.imageUrl = imageUrl;


    const updatedUser = await profileService.updateUserProfile(userId, updateFields, imageUrl);

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
