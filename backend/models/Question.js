const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Facile", "Moyen", "Difficile"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correct_answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
