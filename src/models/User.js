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
    type: String,
    required: true,
  },
  dateOfResumption: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  verifyOtp: {
    type: String,
    required: false,
  },
  expiredOtp: {
    type: Date,
    required: false,
  },
});
module.exports = mongoose.model("gfausers", userSchema);
