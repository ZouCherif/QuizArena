const express = require("express");
const router = express.Router();
const quizcontroller = require("../../controllers/quizController");

router.post("/", quizcontroller.getQuestions);
router.post("/single", quizcontroller.getQuestion);
router.post("/save", quizcontroller.setQuizQuestions);

module.exports = router;
