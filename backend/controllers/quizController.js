const Question = require("../models/Question");

const getQuestions = async (req, res) => {
  try {
    const { name, type, nbP, nbQ, categories, lvl } = req.body;

    const questionsPerCategoryPerLevel = Math.floor(
      nbQ / (categories.length * lvl.length)
    );

    const questions = [];
    for (const category of categories) {
      for (const level of lvl) {
        const fetchedQuestions = await Question.aggregate([
          { $match: { category, level } },
          { $sample: { size: questionsPerCategoryPerLevel } },
        ]);
        questions.push(...fetchedQuestions);
      }
    }
    console.log(questions);
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getQuestions,
};
