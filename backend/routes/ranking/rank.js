const express = require("express");
const router = express.Router();
const quizcontroller = require("../../controllers/quizController");

router.get("/",quizcontroller.getRanking);
module.exports = router;
