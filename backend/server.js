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

connectDB();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/register", require("./routes/auth/register"));
app.use("/login", require("./routes/auth/login"));
app.use("/logout", require("./routes/auth/logout"));
app.use("/getQuestions", require("./routes/quiz/quesions"));

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

const sessions = {};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("create session", ({ sessionId }) => {
    sessions[sessionId] = { id: sessionId, players: [] };
    console.log(`Session created: ${sessionId}`);
    io.emit("session created", sessions[sessionId]);
  });

  socket.on("join session", ({ sessionId, playerName }) => {
    if (!sessions[sessionId]) {
      socket.emit("invalid session", "Invalid session ID");
      return;
    }

    sessions[sessionId].players.push({ id: socket.id, name: playerName });

    socket.join(sessionId);
    console.log(`${playerName} joined session ${sessionId}`);

    io.to(sessionId).emit("player joined", { sessionId, playerName });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");

    for (const sessionId in sessions) {
      const session = sessions[sessionId];
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
