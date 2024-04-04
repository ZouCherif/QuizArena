require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const { logger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const socketIo = require("socket.io");
const http = require("http");
const Session = require("./models/Session");

connectDB();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/register", require("./routes/auth/register"));
app.use("/login", require("./routes/auth/login"));
app.use("/logout", require("./routes/auth/logout"));
app.use("/questions", require("./routes/questions/questions"));
app.use("/join", require("./routes/sessions/sessions"));
app.use("/ranking", require("./routes/ranking/rank"));


app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "404 Not Found" });
});

app.use(errorHandler);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const activeSessions = {};

const sendQuestion = (sessionId) => {
  activeSessions[sessionId].currentQuestion++;
  activeSessions[sessionId].timeout = false;
  const session = activeSessions[sessionId];
  if (!session) return;
  if (session.questions && session.currentQuestion < session.questions.length) {
    const questionToSend = session.questions[session.currentQuestion];
    io.to(sessionId).emit("question", questionToSend);
  } else {
    console.log(activeSessions[sessionId]);
    io.to(sessionId).emit("finish");
  }
};

function verifyAnswers(playerIndex, answer, timeTaken, sessionId) {
  if (
    answer ===
    activeSessions[sessionId].questions[
      activeSessions[sessionId].currentQuestion
    ].correct_answer
  ) {
    activeSessions[sessionId].players[playerIndex].answers.push({
      answer,
      timeTaken,
      correct: true,
    });
    const baseScore = 25000;
    let score = baseScore - timeTaken;
    score = Math.max(score, 0);
    activeSessions[sessionId].players[playerIndex].score += score;
  } else {
    activeSessions[sessionId].players[playerIndex].answers.push({
      answer,
      timeTaken,
      correct: false,
    });
  }
}

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("create session", async ({ sessionId }) => {
    try {
      const session = await Session.findById(sessionId).populate("questions");
      if (!session) {
        socket.emit("invalid session", "Invalid session ID");
        return;
      }
      activeSessions[sessionId] = {
        creator: socket.id,
        id: sessionId,
        players: [],
        nbP: session.nbP,
        currentQuestion: -1,
        liveAnswered: 0,
        timeout: false,
        started: false,
      };
      io.emit("session created", activeSessions[sessionId]);
      activeSessions[sessionId].questions = session.questions;
      socket.join(sessionId);
    } catch {
      socket.emit("errorEvent", { message: "An error occurred" });
    }
  });

  socket.on("join session", ({ sessionId, playerName }) => {
    if (!activeSessions[sessionId]) {
      socket.emit("invalid session", "Invalid session ID");
      return;
    }

    if (activeSessions[sessionId].started) {
      socket.emit("invalid session", "Sorry! you can not access this session");
    }

    activeSessions[sessionId].players.push({
      id: socket.id,
      name: playerName,
      score: 0,
      answers: [],
    });
    socket.join(sessionId);

    io.to(sessionId).emit("player joined", {
      players: activeSessions[sessionId].players,
    });
  });

  socket.on("start quiz", ({ sessionId }) => {
    if (!activeSessions[sessionId]) {
      socket.emit("invalid session", "Invalid session ID");
      return;
    }
    activeSessions[sessionId].started = true;
    io.to(sessionId).emit("quiz started");
    setTimeout(() => sendQuestion(sessionId), 100);
    activeSessions[sessionId].startTime = Date.now();
    activeSessions[sessionId].timerId = setTimeout(() => {
      if (!activeSessions[sessionId].timeout) {
        activeSessions[sessionId].timeout = true;
        io.to(sessionId).emit("stop");
      }
    }, 20000);
  });

  socket.on("next question", ({ sessionId }) => {
    sendQuestion(sessionId);
    activeSessions[sessionId].liveAnswered = 0;
    activeSessions[sessionId].startTime = Date.now();
    activeSessions[sessionId].timerId = setTimeout(() => {
      if (!activeSessions[sessionId].timeout) {
        activeSessions[sessionId].timeout = true;
        io.to(sessionId).emit("stop");
      }
    }, 20000);
  });

  socket.on("submit answer", ({ sessionId, answer }) => {
    const endTime = Date.now();

    const playerIndex = activeSessions[sessionId].players.findIndex(
      (player) => player.id === socket.id
    );
    if (playerIndex < 0) {
      console.log("player not found");
      return;
    }

    if (
      activeSessions[sessionId].players[playerIndex].answers.length ===
      activeSessions[sessionId].currentQuestion + 1
    )
      return;

    const timeTaken = endTime - activeSessions[sessionId].startTime;
    verifyAnswers(playerIndex, answer, timeTaken, sessionId);

    activeSessions[sessionId].liveAnswered++;
    if (
      activeSessions[sessionId].liveAnswered ===
        activeSessions[sessionId].players.length &&
      !activeSessions[sessionId].timeout
    ) {
      activeSessions[sessionId].timeout = true;
      clearTimeout(activeSessions[sessionId].timerId);
      io.to(sessionId).emit("stop");
    }

    const creator = activeSessions[sessionId].creator;
    if (!creator) {
      console.log("No creator");
      return;
    }

    io.to(creator).emit("answered", {
      playerName: activeSessions[sessionId].players[playerIndex].name,
      id: activeSessions[sessionId].players[playerIndex].id,
    });
  });

  socket.on("send results", ({ sessionId }) => {
    const players = activeSessions[sessionId].players;
    const currentQuestionIndex = activeSessions[sessionId].currentQuestion;
    const totalPlayers = players.length;
    for (const player of players) {
      if (player.answers[currentQuestionIndex]) {
        io.to(player.id).emit("result", {
          correct: player.answers[currentQuestionIndex].correct,
        });
      }
    }

    const answers = [
      {
        option:
          activeSessions[sessionId].questions[currentQuestionIndex].options[0],
        percentage: 0,
      },
      {
        option:
          activeSessions[sessionId].questions[currentQuestionIndex].options[1],
        percentage: 0,
      },
      {
        option:
          activeSessions[sessionId].questions[currentQuestionIndex].options[2],
        percentage: 0,
      },
      {
        option:
          activeSessions[sessionId].questions[currentQuestionIndex].options[3],
        percentage: 0,
      },
    ];
    players.forEach((player) => {
      const answer = player.answers[currentQuestionIndex].answer;
      switch (answer) {
        case answers[0].option:
          answers[0].percentage++;
          break;
        case answers[1].option:
          answers[1].percentage++;
          break;
        case answers[2].option:
          answers[2].percentage++;
          break;
        case answers[3].option:
          answers[3].percentage++;
          break;
        default:
          break;
      }
    });

    const result = answers.map((option) => {
      return {
        option: option.option,
        percentage: (option.percentage * 100) / totalPlayers,
      };
    });

    const ranking = players.map((player) => {
      return {
        name: player.name,
        id: player.id,
        score: player.score,
      };
    });

    ranking.sort((a, b) => b.score - a.score);

    io.to(activeSessions[sessionId].creator).emit("results", {
      result,
      ranking,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");

    for (const sessionId in activeSessions) {
      const session = activeSessions[sessionId];
      const { players } = session;

      const disconnectedPlayerIndex = players.findIndex(
        (player) => player.id === socket.id
      );
      if (disconnectedPlayerIndex !== -1) {
        const disconnectedPlayer = players[disconnectedPlayerIndex];

        players.splice(disconnectedPlayerIndex, 1);
        activeSessions[sessionId].players = players;
        socket
          .to(sessionId)
          .emit("player left", { players: activeSessions[sessionId].players });

        console.log(`${disconnectedPlayer.name} left session ${sessionId}`);
      }
    }
  });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
