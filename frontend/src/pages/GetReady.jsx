import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

function GetReady() {
  const { id } = useParams();
  useEffect(() => {
    const socket = io("http://localhost:3500");
    socket.emit("join session", { sessionId: id, playerName: "cherif" });

    socket.on("invalid session", (message) => {
      console.log(`error: ${message}`);
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
  return <div>GetReady</div>;
}

export default GetReady;
