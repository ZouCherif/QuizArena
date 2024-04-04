const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  answer: String,
  timeTaken: Number,
  correct: Boolean,
});

const QuestionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: String,
  difficulty: String,
  question: String,
  options: [String],
  correct_answer: String,
});

const PlayerSchema = new mongoose.Schema({
  id: String,
  name: String,
  score: Number,
  answers: [AnswerSchema],
});

const PastSessionSchema = new mongoose.Schema({
  sessionId: String,
  creator: String,
  players: [PlayerSchema],
  questions: [QuestionSchema],
});

module.exports = mongoose.model("PastSession", PastSessionSchema);
