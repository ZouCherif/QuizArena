const Question = require("../models/Question");

const getQuestions = async (req, res) => {
  try {
    const { name, type, nbP, nbQ, categories, lvl } = req.body;

    //filter the categories
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

    const questions = [];
    for (const element of questionsConfig) {
      const fetchedQuestions = await Question.aggregate([
        { $match: { category: element.category, difficulty: element.level } },
        { $sample: { size: element.count } },
      ]);
      questions.push(...fetchedQuestions);
    }
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getQuestions,
};
