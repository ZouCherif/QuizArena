import { useState, useEffect } from "react";
import { GiBootKick } from "react-icons/gi";

function DisplayPlayers({ socket }) {
  const [players, setPlayers] = useState([]);
  const [nbP, setNbP] = useState(30);
  useEffect(() => {
    socket.on("session created", (session) => {
      setNbP(session.nbP);
    });

    socket.on("player joined", (player) => {
      if (!players.find((p) => p.playerId === player.playerId)) {
        setPlayers((prevPlayers) => [...prevPlayers, player]);
      }
    });

    socket.on("player left", (playerId) => {
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.playerId !== playerId)
      );
    });

    return () => {
      socket.off("player joined");
      socket.off("player left");
    };
  }, [socket, players]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <p>Joueurs en ligne</p>
        <p>
          {players.length}/{nbP}
        </p>
      </div>
      <hr className="mb-4" />
      <div className="grid grid-cols-5 gap-4">
        {players.map((player) => (
          <div className="bg-[#1A1A2F] rounded-lg p-4 text-lg flex justify-between items-center">
            <span>{player.playerName}</span>
            <GiBootKick
              size={35}
              className="hover:bg-gray-700 p-1 rounded-lg cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayPlayers;
