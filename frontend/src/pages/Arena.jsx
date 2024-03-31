import { useEffect } from "react";
import io from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import { Show } from "../components";

function Arena() {
  const { id } = useParams();
  const location = useLocation();
  const socket = io("http://localhost:3500");
  useEffect(() => {
    socket.emit("join session", {
      sessionId: id,
      playerName: location.state.playerName,
    });

    socket.on("invalid session", (message) => {
      console.log(`error: ${message}`);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [id, socket, location.state.playerName]);

  return <Show socket={socket} id={id} />;
}

export default Arena;
