import { useState, useEffect } from "react";
import { GiBootKick } from "react-icons/gi";

function DisplayPlayers({ socket }) {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    socket.on("player joined", (playerName) => {
      setPlayers((prevPlayers) => [...prevPlayers, playerName]);
    });

    socket.on("player left", (playerName) => {});

    return () => {
      socket.off("player joined");
      socket.off("player left");
    };
  }, [socket]);
  return (
    <div className="grid grid-cols-5 gap-4">
      {players.map((player) => (
        <div className="bg-[#1A1A2F] rounded-lg p-4 text-lg flex justify-between items-center">
          <span>{player}</span>
          <GiBootKick
            size={35}
            className="hover:bg-gray-700 p-1 rounded-lg cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}

export default DisplayPlayers;
