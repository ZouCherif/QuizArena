const Question = require("../models/Question");
const Session = require("../models/Session");
const User = require('../models/User');
const getQuestions = async (req, res) => {
  try {
    const { name, type, nbP, nbQ, categories, lvl } = req.body;

    const totalCategories = categories.length;
    const totalLevels = lvl.length;

    const totalQuestionsPerCategoryPerLevel = Math.floor(
      nbQ / (totalCategories * totalLevels)
    );

    let remainingQuestions =
      nbQ - totalQuestionsPerCategoryPerLevel * totalCategories * totalLevels;

    const questionsConfig = [];
    for (const category of categories) {
      for (const level of lvl) {
        questionsConfig.push({
          category,
          level,
          count: totalQuestionsPerCategoryPerLevel,
        });
      }
    }
    questionsConfig.sort((a, b) => {
      const levelOrder = { facile: 0, moyen: 1, difficile: 2 };
      return (
        levelOrder[a.level.toLowerCase()] - levelOrder[b.level.toLowerCase()]
      );
    });

    while (remainingQuestions > 0) {
      for (let i = questionsConfig.length - 1; i >= 0; i--) {
        if (remainingQuestions > 0) {
          questionsConfig[i].count++;
          remainingQuestions--;
        }
        if (remainingQuestions === 0) {
          break;
        }
      }
    }

    const generateSessionCode = () =>
      Math.floor(100000 + Math.random() * 900000);
    let sessionCode;
    do {
      sessionCode = generateSessionCode();
    } while (await Session.exists({ sessionCode }));

    const session = new Session({
      sessionCode,
      name,
      type,
      difficulty: questionsConfig[questionsConfig.length - 1].level,
      nbP,
      nbQ,
      categories,
    });

    await session.save();

    const questions = [];
    for (const element of questionsConfig) {
      const fetchedQuestions = await Question.aggregate([
        { $match: { category: element.category, difficulty: element.level } },
        { $sample: { size: element.count } },
      ]);
      questions.push(...fetchedQuestions);
    }
    res.status(200).json({ id: session._id, questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getQuestion = async (req, res) => {
  try {
    const { difficulty, category, id } = req.body;

    const question = await Question.aggregate([
      { $match: { _id: { $ne: id }, difficulty, category } },
      { $sample: { size: 1 } },
    ]);
    if (!question || question.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ question: question[0] });
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const setQuizQuestions = async (req, res) => {
  try {
    const { data, id } = req.body;
    if (!data || !id)
      return res.status(404).json({ message: "data and id required" });
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "session not found" });
    session.questions = data;
    await session.save();
    res.status(200).json({ message: "questions saved successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getRanking = async (req, res) => {
  try {
    const users = await User.find({}).sort({ score: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  getQuestions,
  getQuestion,
  setQuizQuestions,
  getRanking
};
