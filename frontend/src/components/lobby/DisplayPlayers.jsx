import { useState, useEffect } from "react";

function DisplayPlayers({ socket }) {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    socket.on("player joined", (playerName) => {
      setPlayers((prevPlayers) => [...prevPlayers, playerName]);
    });

    socket.on("player left", (playerName) => {});
  }, [socket]);
  return (
    <div>
      {players.map((player) => (
        <p>{player} a rejoint</p>
      ))}
    </div>
  );
}

export default DisplayPlayers;
