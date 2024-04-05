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

verificationCodeSchema.statics.createOrUpdate = async function (email, code) {
  try {
    let verificationCode = await this.findOne({ email });

    if (verificationCode) {
      verificationCode.code = code;
    } else {
      verificationCode = new this({ email, code });
    }

    await verificationCode.save();
    return verificationCode;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("verificationCode", verificationCodeSchema);
