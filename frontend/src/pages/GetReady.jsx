import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";

function GetReady() {
  const { id } = useParams();
  const location = useLocation();
  const [qst, setQst] = useState(null);
  const [options, setOptions] = useState([]);
  const socket = io("http://localhost:3500");
  useEffect(() => {
    socket.emit("join session", {
      sessionId: id,
      playerName: location.state.playerName,
    });

    socket.on("invalid session", (message) => {
      console.log(`error: ${message}`);
    });

    socket.on("player joined", (playerName) => {
      console.log(`${playerName} joined`);
    });

    socket.on("player left", (playerName) => {
      console.log(`${playerName} left`);
    });

    socket.on("question", (question) => {
      setQst(question.question);
      setOptions(question.options);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [id, socket]);

  const handleSubmitAnswer = (answer) => {
    socket.emit("submit answer", answer);
  };
  return (
    <div>
      <h1 className="text-3xl text-center">{qst}</h1>
      <ul className="flex justify-around">
        {options.map((option) => {
          return (
            <li
              onClick={() => handleSubmitAnswer(option)}
              className="cursor-pointer"
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GetReady;
