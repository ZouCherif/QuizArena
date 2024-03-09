import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

function Lobby() {
  const { id } = useParams();
  const socket = io("http://localhost:3500");
  useEffect(() => {
    socket.emit("create session", { sessionId: id });

    socket.on("session created", (session) => {
      console.log("Session created:", session);
    });

    socket.on("player joined", ({ sessionId, playerName }) => {
      console.log(`${playerName} joined session ${sessionId}`);
    });

    socket.on("player left", ({ sessionId, playerName }) => {
      console.log(`${playerName} left session ${sessionId}`);
    });

    socket.on("errorEvent", ({ message }) => {
      console.log(`${message}`);
    });

    socket.on("answer submitted", ({ playerName, answer }) => {
      console.log(`${playerName} submitted answer: ${answer}`);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [id, socket]);

  const handleStartQuiz = () => {
    socket.emit("start quiz", { sessionId: id });
  };
  return (
    <div>
      Lobby
      <button
        className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 block text-xl"
        onClick={handleStartQuiz}
      >
        start
      </button>
    </div>
  );
}

export default Lobby;
