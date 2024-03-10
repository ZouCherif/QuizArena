import { useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { Timer, DisplayPlayers } from "../components";
import { MdContentCopy } from "react-icons/md";

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
      <div className="bg-[#1A1A2F] mb-10">
        <nav className="flex justify-around py-4 items-center max-w-[1200px] mx-auto">
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
      </div>
      <div className="max-w-[1200px] mx-auto p-2">
        <div className="flex justify-around mb-4">
          <div className="mr-4 flex flex-col bg-[#1A1A2F] p-4 rounded-lg">
            <span className="select-none">Code Session:</span>
            <div className="flex items-center">
              <span className="text-6xl font-semibold mr-4">354 860</span>
              <MdContentCopy
                size={40}
                className="hover:bg-gray-600 rounded-lg p-1 cursor-pointer duration-300"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Joueurs en ligne</p>
          <p>7/30</p>
        </div>
        <hr className="mb-4" />
        <DisplayPlayers socket={socket} />
      </div>
    </>
  );
}

export default Lobby;
