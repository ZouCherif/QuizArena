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
    console.log("No more questions available for this session");
  }
};
function verifyAnswers(playerIndex, answer, timeTaken, sessionId) {
  console.log("verifying...");
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
  let timer;

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

    activeSessions[sessionId].players.push({
      id: socket.id,
      name: playerName,
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
    io.to(sessionId).emit("quiz started");
    setTimeout(() => sendQuestion(sessionId), 100);
    activeSessions[sessionId].startTime = Date.now();
    timer = setTimeout(() => {
      if (!activeSessions[sessionId].timeout) {
        activeSessions[sessionId].timeout = true;
        io.to(sessionId).emit("stop");
      }
    }, 20000);
  });

  socket.on("next question", ({ sessionId }) => {
    sendQuestion(sessionId);
    activeSessions[sessionId].startTime = Date.now();
    timer = setTimeout(() => {
      if (!activeSessions[sessionId].timeout) {
        activeSessions[sessionId].timeout = true;
        io.to(sessionId).emit("stop");
      }
    }, 20000);
  });

  socket.on("submit answer", ({ sessionId, answer }) => {
    const endTime = Date.now();
    const session = activeSessions[sessionId];
    if (!session) {
      console.log("No active session found");
      return;
    }

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

    activeSessions[sessionId].liveAnswered++;
    if (
      session.liveAnswered === session.players.length &&
      !activeSessions[sessionId].timeout
    ) {
      activeSessions[sessionId].timeout = true;
      clearTimeout(timer);
      io.to(sessionId).emit("stop");
    }

    const creator = activeSessions[sessionId].creator;
    if (!creator) {
      console.log("No creator");
      return;
    }
    const timeTaken = endTime - activeSessions[sessionId].startTime;
    verifyAnswers(playerIndex, answer, timeTaken, sessionId);

    io.to(creator).emit("answered", {
      playerName: activeSessions[sessionId].players[playerIndex].name,
    });
  });

  socket.on("send results", ({ sessionId }) => {});
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
