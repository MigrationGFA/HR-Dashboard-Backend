const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const {generateAccessToken, generateRefreshToken, isRefreshTokenValid} = require("../utils/generateToken");
const sendForgotPasswordOTP = require("../utils/forgotPassword");
const sendResetPasswordAlert = require("../utils/resetOtp");
const sendWelcomeEmailCreator = require("../utils/welcomeEmail");
const Profile = require("../models/Profile")

//userSignup
exports.userSignup = async (
  email,
  role,
  department,
  contractType,
  contractEndDate,
  dateOfResumption,
  team,

) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }

  const password = email;
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    role,
    department,
    contractType,
    contractEndDate: new Date(contractEndDate),   
    dateOfResumption: new Date(dateOfResumption),
    team,
    password: passwordHash,
  });

  await newUser.save();

  // Send verification email
  await sendWelcomeEmailCreator({
    email,
  });

  return { message: "User created successfully" };
};

exports.userLogin = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid Credentials");
  }

  // Generate tokens
  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id, user.role);

  // Save the refresh token in the database
  user.refreshToken = refreshToken;
  await user.save();

  if (user.isProfileCreated) {
    // Fetch the user's profile
    const userProfile = await Profile.findOne({ userId: user._id });

    // Exclude sensitive fields from the response
    const { _id, createdAt, updatedAt, userId, ...profileData } = userProfile.toObject();
    return { 
      message: "Login successful", 
      accessToken, 
      refreshToken, 
      user: userProfile,
      isProfileCreated: user.isProfileCreated
    };
  } else {
    return { 
      message: "Login successful. Profile not yet created.", 
      accessToken, 
      refreshToken,
      isProfileCreated: user.isProfileCreated, 
    };
  }
};


exports.ForgotPassword = async (email) => {
const user = await User.findOne({email})
if (!user) {
  throw new Error("User not found")
}
if (!email) {
  throw new Error("Email is required" );
}

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);
const otp = generateOtp();
user.verifyOtp = otp;
user.expiredOtp = Date.now() + 10 * 60 * 1000; // 10 minutes
await user.save();

await sendForgotPasswordOTP({
  username: user.email,
    email: user.email,
    otp: user.verifyOtp,
});
};

exports.resetPassword = async (email, verifyOtp, password) => {
  const user = await User.findOne({ email });
  if (!user || user.verifyOtp !== verifyOtp || user.expiredOtp < Date.now()) {
    throw new Error("Invalid or expired OTP");
  }

  if (!email) {
    throw new Error("Email is required" );
  }
  

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.verificationOtp = null;
  user.otpExpired = null;
  await user.save();

  await sendResetPasswordAlert({
    username: user.email,
    email: user.email,
  });
  return { message: "Password reset successful" };
};

exports.resendOtp = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  if (!email) {
    throw new Error("Email is required" );
  }

  // Generate new OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);
  const otp = generateOtp();
  user.verifyOtp = otp;
  user.expiredOtp = Date.now() + 5 * 60 * 1000; // 10 minutes
  await user.save();

  await sendForgotPasswordOTP({
    username: user.email,
    email: user.email,
    otp: user.verifyOtp,
  });

};