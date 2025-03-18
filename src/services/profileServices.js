const Profile = require('../models/Profile');
const User = require("../models/User")
const mongoose = require("mongoose");

exports.onBoardUser = async (body) => {
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
  imageUrl,
  medicalDescription,
} = body

const requiredFields = [
  'userId',
  'fullName',
  'dob',
  'nextOfKinName',
  'phone',  
  'address',
  'maritalStatus',
  'medicalStatus',
  'reportingOfficer',
  'imageUrl',
  'medicalDescription',
  ];
  
  // Check for missing fields
  for (const field of requiredFields) {
  if (!body[field]) {
  return { status: 400, data: { message: `${field} is required` } };
  }
}
const supportTicket = await helpCenter.findOne({userId})
if(supportTicket) {
  return {error: 'Support ticket already exists'}
}
  
  const profile = await Profile.findOne({ userId });
  if (profile) {
    throw new Error("Profile already exists");
  }

  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId format." });
      }
      if (!mongoose.Types.ObjectId.isValid(reportingOfficer)) {
        return res.status(400).json({ message: "Invalid reportingOfficer format." });
      }
  
      if (isNaN(new Date(dob))) {
        return res.status(400).json({ message: "Invalid DOB format." });
      }
  
  // Create and save the profile
  const userProfile = new Profile({
    userId,
    fullName,
    nextOfKinName,
    phone,
    address,
    maritalStatus,
    medicalStatus,
    dob: new Date(dob),  // 🛠 Convert to Date
    imageUrl,
    reportingOfficer,
    medicalDescription,
  });
  await userProfile.save();
  await User.findByIdAndUpdate(userId, { isProfileCreated: true })
 

  return userProfile;
};


// Update Profile
exports.updateUserProfile = async (userId, updateFields) => {
  try {
    // Ensure at least one field is provided for update
    if (Object.keys(updateFields).length === 0) {
      throw new Error("At least one field must be updated.");
    }

    // Update user in database
    const updatedUser = await Profile.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!updatedUser) {
      throw new Error("User not found.");
    }

    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
