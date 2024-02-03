const mongoose = require("mongoose");

const verificationCodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // expires: 3600,
  },
});

module.exports = mongoose.model("verificationCode", verificationCodeSchema);
