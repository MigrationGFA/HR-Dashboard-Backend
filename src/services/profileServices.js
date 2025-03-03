const Profile = require('../models/Profile');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');

exports.onBoardUser = async ({
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
  imageUrl,
  medicalDescription,
}) => {
  // Check if profile already exists
  const profile = await Profile.findOne({ userId });
  if (profile) {
    throw new Error("Profile already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  // Create and save the profile
  const userProfile = new Profile({
    userId,
    fullName,
    passwordHash,
    nextOfKinName,
    phone,
    address,
    maritalStatus,
    medicalStatus,
    dob: new Date(dob),  // 🛠 Convert to Date
    imageUrl,
    reportingOfficer,
    team,
    contractEndDate: new Date(contractEndDate),  // 🛠 Convert to Date
    contractType,
    role,
    department,
    dateOfResumption: new Date(dateOfResumption), 
    medicalDescription // 🛠 Convert to Date
  });


  await userProfile.save();
  console.log("Saved Profile in DB:", userProfile); 

  return userProfile;
};


// Update Profile
exports.updateUserProfile = async (userId, updateFields) => {
  try {
    // Ensure at least one field is provided for update
    if (Object.keys(updateFields).length === 0) {
      throw new Error("At least one field must be updated.");
    }

    // Hash password if provided
    if (updateFields.password) {
      const saltRounds = 10;
      updateFields.password = await bcrypt.hash(updateFields.password, saltRounds);
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
