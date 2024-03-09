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
  categories: {
    type: [String],
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
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
