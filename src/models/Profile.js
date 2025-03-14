const mongoose = require("mongoose");
const User = require("./User");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: { type: String, required: false },
  dob: { type: Date, required: false },  // 🛠 Changed from String to Date
  nextOfKinName: { type: String, required: false },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  maritalStatus: { type: String, required: false }, // 🛠 Changed from String to Date
  medicalStatus: { type: String, required: false },
  reportingOfficer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,  // 🛠 Now required
  },
  
  imageUrl: { type: String, required: false },
  medicalDescription : {type: String, required: false},
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("gfaProfile", profileSchema);
