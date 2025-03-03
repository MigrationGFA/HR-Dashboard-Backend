const authService = require("../services/authServices");
const cloudinary = require("../utils/cloudinary");
const upload = require("../helper/multer");

// Sign-Up
exports.signUp = async (req, res) => {
  try {
    const {
      email,
      role,
      department,
      contractType,
      contractEndDate,
      dateOfResumption,
      team,
    } = req.body;

    if (!role || !department || !contractType || !dateOfResumption || !contractEndDate || !team) {
      return res.status(400).json({ message: "All fields are required required." });
    }

    if (isNaN(new Date(dateOfResumption))) {
      return res.status(400).json({ message: "Invalid dateOfResumption format." });
    }
    if (isNaN(new Date(contractEndDate))) {
      return res.status(400).json({ message: "Invalid contractEndDate format." });
    }

    const result = await authService.userSignup(
      email,
      role,
      department,
      contractType,
      contractEndDate,
      dateOfResumption,
      team,
    );
    res.status(201).json(result);
  } catch (error) {
    console.log("Error in signUp:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.Login = async (req, res) => {
  try {
    const {email, password} = req.body
    const result = await authService.userLogin(email, password)
    return res.status(200).json({message: "User Login Successfully", result})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

exports.forgotPassword = async (req, res) => {
const {email} = req.body
try {
  const result = await authService.ForgotPassword(email)
  return res.status(200).json({message: "OTP sent to email", result})
}
catch (error) {
  console.log(error.message)
  res.status(500).json({message: error.message})
}
}

exports.ResetPassword = async (req, res) => {
  const {email, verifyOtp, password} = req.body
  try {
    const result = await authService.resetPassword(email, verifyOtp, password)
    return res.status(200).json({message: "Password Reset Successfully", result})
  }
  catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
  }

  // Resend OTP
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.resendOtp(email);
    res.status(200).json({message: "OTP sent to email", result});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};