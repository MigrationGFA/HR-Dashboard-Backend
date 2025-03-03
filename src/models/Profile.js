const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: { type: String, required: false },
  password: { type: String, required: false },
  dob: { type: Date, required: false },  // 🛠 Changed from String to Date
  department: { type: String, required: true },
  role: { type: String, required: true },
  contractType: { type: String, required: true },  // 🛠 Now required
  dateOfResumption: { type: Date, required: true },  // 🛠 Changed from String to Date
  nextOfKinName: { type: String, required: false },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  maritalStatus: { type: String, required: false },
  contractEndDate: { type: Date, required: true },  // 🛠 Changed from String to Date
  medicalStatus: { type: String, required: false },
  reportingOfficer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,  // 🛠 Now required
  },
  team: { type: String, required: true },
  imageUrl: { type: String, required: false },
  medicalDescription : {type: String, required: false}
});

module.exports = mongoose.model("gfaProfile", profileSchema);
