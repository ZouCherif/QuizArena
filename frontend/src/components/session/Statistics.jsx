import { useState, useEffect, useRef } from "react";
import QuestionStats from "./QuestionStats";

function Statistics({ socket, id }) {
  const [questionTime, setQuestionTime] = useState(20);
  const [timeColor, setTimeColor] = useState("white");
  const intervalRef = useRef(null);

  useEffect(() => {
    socket.on("question", (question) => {
      setQuestionTime(20);
      setTimeColor("white");
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
      setTimeout(() => {
        socket.emit("send results", { sessionId: id });
      }, 3000);
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
      <div className="bg-[#1A1A2F] mb-8">
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
      <QuestionStats socket={socket} />
    </div>
  );
}

export default Statistics;
