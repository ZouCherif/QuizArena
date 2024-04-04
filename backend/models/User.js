const mongoose = require("mongoose");
const { CountryList } = require('country-list-js');

// const countryList = new CountryList();

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    country: {
      type: String,
    },
    score:{
      type: Number,
      default: 0
    },
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
