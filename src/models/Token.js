// models/CreatorToken.js
const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Reference to the User model
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", // Automatically delete tokens after 7 days
  },
  refreshTokenExpiration: {
    type: Date,
    default: Date.now
  },
  accessTokenExpiration: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Token", tokenSchema);