const Profile = require('../models/Profile');
const User = require("../models/User")

exports.onBoardUser = async ({
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
}) => {
  // Check if profile already exists
  const profile = await Profile.findOne({ userId });
  if (profile) {
    throw new Error("Profile already exists");
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
