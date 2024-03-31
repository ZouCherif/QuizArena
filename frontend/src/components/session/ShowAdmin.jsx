import Lobby from "./Lobby";
import Statistics from "./Statistics";
import { useState, useEffect } from "react";
function ShowAdmin({ socket, id }) {
  const [start, setStart] = useState(false);

  useEffect(() => {
    socket.on("quiz started", () => setStart(true));
  }, [socket]);
  return !start ? (
    <Lobby socket={socket} id={id} />
  ) : (
    <Statistics socket={socket} id={id} />
  );
}

export default ShowAdmin;
