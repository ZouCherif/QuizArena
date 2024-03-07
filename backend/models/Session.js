const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionCode: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    enum: ["publique", "privée"],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Facile", "Moyen", "Difficile"],
    required: true,
  },
  nbP: {
    type: Number,
    required: true,
  },
  nbQ: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

sessionSchema.pre("save", async function (next) {
  const generateSessionCode = () => Math.floor(100000 + Math.random() * 900000);

  if (
    !this.sessionCode ||
    isNaN(this.sessionCode) ||
    (await this.constructor.exists({ sessionCode: this.sessionCode }))
  ) {
    let code;
    do {
      code = generateSessionCode();
    } while (await this.constructor.exists({ sessionCode: code }));
    this.sessionCode = code;
  }

  next();
});

module.exports = mongoose.model("Session", sessionSchema);
