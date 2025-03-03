const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const {generateAccessToken, generateRefreshToken, isRefreshTokenValid} = require("../utils/generateToken");
const sendForgotPasswordOTP = require("../utils/forgotPassword");
const sendResetPasswordAlert = require("../utils/resetOtp");
const sendWelcomeEmailCreator = require("../utils/welcomeEmail");

//userSignup
exports.userSignup = async (
  email,
  role,
  department,
  contractType,
  contractEndDate,
  dateOfResumption,
  team,
  imageUrl,
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
    imageUrl,
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
const user = await User.findOne({email})
if (!user) {
  throw new Error("Invalid Credentials")
}

const validPassword = await bcrypt.compare(password, user.password)
if (!validPassword) {
  throw new Error("Invalid Credentials")
}
 // Generate access token
 const accessToken = generateAccessToken(user._id, user.email);

 // Generate refresh token
 const refreshToken = generateRefreshToken(user._id, user.email);

 // Save the refresh token in the database
 user.refreshToken = refreshToken;
 await user.save();
  // Send login success email
  const html = `<p>You have successfully logged in to your account.</p>`;
  await sendEmail({
    to: email,
    subject: "Login Successful",
    html,
  });

  return { message: "Login successful", accessToken, refreshToken };

}

exports.ForgotPassword = async (email) => {
const user = await User.findOne({email})
if (!user) {
  throw new Error("User not found")
}

const resetToken = generateAccessToken(user._id, user.email);

// Save the reset token in the database
user.resetToken = resetToken;
user.resetTokenExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
await user.save();

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
return resetToken;
};

exports.resetPassword = async (email, verifyOtp, password) => {
  const user = await User.findOne({ email });
  if (!user || user.verifyOtp !== verifyOtp || user.expiredOtp < Date.now()) {
    throw new Error("Invalid or expired OTP");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 12);
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

  const resetToken = generateAccessToken(user._id, user.email);

// Save the reset token in the database
user.resetToken = resetToken;
user.resetTokenExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

  // Generate new OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);
  const otp = generateOtp();
  user.verifyOtp = otp;
  user.expiredOtp = Date.now() + 5 * 60 * 1000; // 10 minutes
  await user.save();

  // Send new OTP via email
  const html = `<p>Your new OTP for verification is: <strong>${otp}</strong></p>`;
  await sendEmail({
    to: email,
    subject: "New OTP for Verification",
    html,
  });
 
};