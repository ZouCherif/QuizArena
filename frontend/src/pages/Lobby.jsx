import { useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { Timer, DisplayPlayers } from "../components";

function Lobby() {
  const { id } = useParams();
  const socket = io("http://localhost:3500");

  useEffect(() => {
    socket.emit("create session", { sessionId: id });

    socket.on("session created", (session) => {
      console.log("Session created:", session);
    });

    socket.on("errorEvent", ({ message }) => {
      console.log(`${message}`);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [id, socket]);

  const handleStartQuiz = () => {
    socket.emit("start quiz", { sessionId: id });
  };

  return (
    <>
      <nav className="flex justify-around bg-[#1A1A2F] py-4 items-center">
        <button className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 text-base">
          Quitter
        </button>
        <Timer />
        <button
          className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 text-base"
          onClick={handleStartQuiz}
        >
          Commencer <br /> maintenant
        </button>
      </nav>
      <DisplayPlayers socket={socket} />
    </>
  );
}

export default Lobby;
