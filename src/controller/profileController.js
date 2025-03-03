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
      password,
      fullName,
      dob,
      nextOfKinName,
      phone,
      address,
      maritalStatus,
      medicalStatus,
      role,
      department,
      contractType,
      dateOfResumption,
      contractEndDate,
      reportingOfficer,
      team,
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
    if (isNaN(new Date(dateOfResumption))) {
      return res.status(400).json({ message: "Invalid dateOfResumption format." });
    }
    if (isNaN(new Date(contractEndDate))) {
      return res.status(400).json({ message: "Invalid contractEndDate format." });
    }

    const imageFile = req.file ? req.file.path : null;
    let imageUrl = null;

    if (imageFile) {
      const normalizedImageFile = imageFile.replace(/\\/g, "/");
      const result = await cloudinary.uploader.upload(normalizedImageFile, {
        folder: "profile_images",
        resource_type: "auto",
      });
      imageUrl = result.secure_url;
    }

    const result = await profileService.onBoardUser({
      userId,
      password,
      fullName,
      dob: new Date(dob),
      nextOfKinName,
      phone,
      address,
      maritalStatus,
      medicalStatus,
      role,
      department,
      contractType,
      dateOfResumption: new Date(dateOfResumption),
      contractEndDate: new Date(contractEndDate),
      reportingOfficer,
      team,
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
      password,
      fullName,
      dob,
      nextOfKinName,
      phone,
      address,
      maritalStatus,
      medicalStatus,
      medicalDescription,
      team,
      contractEndDate,
      contractType,
      role,
      department,
      dateOfResumption,

    } = req.body;

    const imageFile = req.file ? req.file.path : null;

    const normalizedImageFile = imageFile
      ? imageFile.replace(/\\/g, "/")
      : null;

    let imageUrl = null;
    if (normalizedImageFile) {
      const result = await cloudinary.uploader.upload(normalizedImageFile, {
        folder: "profile_images",
        resource_type: "auto",
      });
      imageUrl = result.secure_url;
    }

    const updateFields = {};
    if (password) updateFields.password = password;
    if (fullName) updateFields.fullName = fullName;
    if (dob) updateFields.dob = new Date(dob);
    if (nextOfKinName) updateFields.nextOfKinName = nextOfKinName;
    if (phone) updateFields.nokPhone = phone;
    if (address) updateFields.nokAddress = address;
    if (maritalStatus) updateFields.maritalStatus = maritalStatus;
    if (medicalStatus) updateFields.medicalStatus = medicalStatus;
    if (medicalDescription)
      updateFields.medicalDescription = medicalDescription;
    if (team) updateFields.team = team;
    if (contractEndDate) updateFields.contractEndDate = new Date(contractEndDate);
    if (contractType) updateFields.contractType = contractType; 
    if (role) updateFields.role = role;
    if (department) updateFields.department = department;
    if (dateOfResumption) updateFields.dateOfResumption = new Date(dateOfResumption);
    if (imageUrl) updateFields.imageUrl = imageUrl;


    const updatedUser = await profileService.updateUserProfile(userId, updateFields, imageUrl);

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
