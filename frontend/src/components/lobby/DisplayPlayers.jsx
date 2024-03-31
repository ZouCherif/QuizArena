import { useState, useEffect } from "react";
import { GiBootKick } from "react-icons/gi";
import { useAuth } from "../../context/AuthContext";

function DisplayPlayers({ socket }) {
  const [players, setPlayers] = useState([]);
  const { setSessionAdmin } = useAuth();
  const [nbP, setNbP] = useState(30);
  useEffect(() => {
    socket.on("session created", (session) => {
      setSessionAdmin(socket.id, session.creator);
      setNbP(session.nbP);
    });

    socket.on("player joined", ({ players }) => {
      setPlayers(players);
    });

    socket.on("player left", ({ players }) => {
      setPlayers(players);
    });

    return () => {
      socket.off("player joined");
      socket.off("player left");
    };
  }, [socket, players, setSessionAdmin]);
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
            <span>{player.name}</span>
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
