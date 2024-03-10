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
app.use("/questions", require("./routes/questions/quesions"));
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

function sendQuestion(sessionId, question) {
  io.to(sessionId).emit("question", question);
}
function verifyAnswers(sessionId) {
  console.log("verifying...");
}

io.on("connection", (socket) => {
  console.log("a user connected");
  let answerTimeout;

  socket.on("create session", ({ sessionId }) => {
    activeSessions[sessionId] = { id: sessionId, players: [] };
    console.log(`Session created: ${sessionId}`);
    socket.join(sessionId);
    io.emit("session created", activeSessions[sessionId]);
  });

  socket.on("join session", ({ sessionId, playerName }) => {
    if (!activeSessions[sessionId]) {
      socket.emit("invalid session", "Invalid session ID");
      return;
    }

    activeSessions[sessionId].players.push({ id: socket.id, name: playerName });

    socket.join(sessionId);
    console.log(`${playerName} joined session ${sessionId}`);

    io.to(sessionId).emit("player joined", playerName);
  });

  socket.on("start quiz", async ({ sessionId }) => {
    try {
      if (!activeSessions[sessionId]) {
        socket.emit("invalid session", "Invalid session ID");
        return;
      }

      const session = await Session.findById(sessionId).populate("questions");
      const questions = session.questions;
      sendQuestion(sessionId, questions.shift());

      answerTimeout = setInterval(() => {
        verifyAnswers(sessionId);
        const nextQuestion = questions.shift();
        if (nextQuestion) {
          sendQuestion(sessionId, nextQuestion);
        } else {
          clearInterval(answerTimeout);
          console.log("Quiz ended");
        }
      }, 20000);
    } catch (e) {
      socket.emit("errorEvent", { message: "An error occurred" });
    }
  });

  socket.on("submit answer", (answer) => {
    console.log(answer);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // clearTimeout(answerTimeout);

    for (const sessionId in activeSessions) {
      const session = activeSessions[sessionId];
      const playerIndex = session.players.findIndex(
        (player) => player.id === socket.id
      );
      if (playerIndex !== -1) {
        const playerName = session.players[playerIndex].name;
        session.players.splice(playerIndex, 1);
        io.to(sessionId).emit("player left", { sessionId, playerName });
      }
    }
  });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
