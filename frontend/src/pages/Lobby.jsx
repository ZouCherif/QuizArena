import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

function Lobby() {
  const { id } = useParams();
  useEffect(() => {
    const socket = io("http://localhost:3500");
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

    socket.on("answer submitted", ({ playerName, answer }) => {
      console.log(`${playerName} submitted answer: ${answer}`);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);
  return <div>Lobby</div>;
}

export default Lobby;
