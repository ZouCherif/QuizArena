import { useState, useEffect, useRef } from "react";

function Statistics({ socket, id }) {
  const [qst, setQst] = useState();
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [questionTime, setQuestionTime] = useState(20);
  const [timeColor, setTimeColor] = useState("white");
  const intervalRef = useRef(null);
  useEffect(() => {
    socket.on("question", (question) => {
      setAnswered([]);
      setQuestionTime(20);
      setTimeColor("white");
      setQst(question.question);
      setOptions(question.options);
      intervalRef.current = setInterval(() => {
        setQuestionTime((prevTimer) => {
          if (prevTimer === 5) {
            setTimeColor("red");
          }
          return prevTimer - 1;
        });
      }, 1000);
    });

    socket.on("stop", () => {
      clearInterval(intervalRef.current);
      socket.emit("send results", { sessionId: id });
    });

    socket.on("answered", ({ playerName }) => {
      setAnswered((prevAnswered) => [...prevAnswered, playerName]);
    });
    return () => clearInterval(intervalRef.current);
  }, [socket, id]);

  useEffect(() => {
    if (questionTime <= 0) {
      clearInterval(intervalRef.current);
      setQuestionTime(0);
    }
  }, [questionTime]);

  const sendQuestion = () => {
    socket.emit("next question", { sessionId: id });
  };
  return (
    <div>
      <div className="bg-[#1A1A2F] mb-10">
        <nav className="flex justify-around py-4 items-center max-w-[1200px] mx-auto">
          <p
            className={`text-6xl text-center w-8 ${
              timeColor === "red" ? "text-red-700 animate-pulse" : ""
            } font-semibold`}
          >
            {questionTime}
            <span className="text-2xl">s</span>
          </p>
          <button
            className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 text-base"
            onClick={sendQuestion}
          >
            Suivant
          </button>
        </nav>
      </div>
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <div className="mx-auto mb-8">
            <h1 className="text-xl text-center">{qst}</h1>
          </div>
          <ul className="grid grid-cols-4 gap-8 mx-auto max-w-[1000px]">
            {options.map((option) => {
              return (
                <li className="text-center text-xl p-2 bg-[#6541F5] border-2">
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="mb-4" />
        <div className="grid grid-cols-6 gap-4">
          {answered.map((player) => (
            <div className="bg-[#1A1A2F] rounded-lg p-4 text-lg flex justify-between items-center">
              <span>{player}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
