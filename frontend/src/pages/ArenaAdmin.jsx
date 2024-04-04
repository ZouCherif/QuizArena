import { useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { ShowAdmin } from "../components";
import { useAuth } from "../context/AuthContext";

function ArenaAdmin() {
  const { id } = useParams();
  const { user } = useAuth();
  const socket = io("http://localhost:3500");

  useEffect(() => {
    socket.emit("create session", { sessionId: id, username: user.username });

    socket.on("errorEvent", ({ message }) => {
      console.log(`${message}`);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [id, socket]);

  return (
    <>
      <ShowAdmin socket={socket} id={id} />
    </>
  );
}

export default ArenaAdmin;
