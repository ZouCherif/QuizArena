const express = require("express");
const router = express.Router();
const quizcontroller = require("../../controllers/quizController");

router.post("/", quizcontroller.getQuestions);

module.exports = router;
