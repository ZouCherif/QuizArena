const Session = require("../models/Session");
const joinSession = async (req, res) => {
  try {
    const { sessionCode } = req.params;

    if (sessionCode < 100000 || sessionCode > 999999) {
      return res.status(400).json({ error: "Invalid session sessionCode" });
    }

    const session = await Session.findOne({ sessionCode });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ sessionId: session._id });
  } catch (error) {
    console.error("Error joining session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSessionCode = async (req, res) => {
  try {
    const { id } = req.params;
    const sessionCode = await Session.findOne({ _id: id }).select(
      "sessionCode -_id"
    );

    if (!sessionCode) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(sessionCode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  joinSession,
  getSessionCode,
};
