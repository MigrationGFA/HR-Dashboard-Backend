const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  contractType: {
    type: String,
    required: true,
  },
  contractEndDate: {
    type: Date,
    required: true,
  },
  dateOfResumption: {
    type: Date,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  verifyOtp: {
    type: String,
    required: false,
  },
  expiredOtp: {
    type: Date,
    required: false,
  },
  isProfileCreated: {
    type: Boolean,
    default: false
  },
  profile: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Profile" 
  },
});
module.exports = mongoose.model("gfausers", userSchema);
