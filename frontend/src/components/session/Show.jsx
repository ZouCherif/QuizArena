import { useState, useEffect } from "react";
import PlayersLobby from "./PlayersLobby";
import QuestionsShow from "./QuestionsShow";
function Show({ socket, id }) {
  const [start, setStart] = useState(false);
  useEffect(() => {
    socket.on("quiz started", () => {
      setStart(true);
    });
  }, [socket]);
  return !start ? (
    <PlayersLobby socket={socket} />
  ) : (
    <QuestionsShow socket={socket} id={id} />
  );
}

export default Show;
