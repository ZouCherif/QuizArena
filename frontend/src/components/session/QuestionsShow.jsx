import { useState, useEffect, useRef } from "react";
import BarTimer from "./BarTimer";
import { useNavigate } from "react-router-dom";

function QuestionsShow({ socket, id }) {
  const [qst, setQst] = useState(
    "lrem ipsum hello world this is my awesome quiz app give me your opinion?"
  );
  const [options, setOptions] = useState(["1st", "2nd", "3rd", "4th"]);
  const [quizStopped, setQuizStopped] = useState(false);
  const answerSubmitted = useRef(false);
  const [correct, setCorrect] = useState(null);
  const [resultSent, setresultSent] = useState(false);
  const [timeout, setTimeout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("question", (question) => {
      setQst(question.question);
      setOptions(question.options);
      setQuizStopped(false);
      answerSubmitted.current = false;
      setCorrect(null);
      setTimeout(false);
      setresultSent(false);
    });

    socket.on("stop", () => {
      if (!answerSubmitted.current) {
        setQuizStopped(true);
        setTimeout(true);
        socket.emit("submit answer", { sessionId: id, answer: "" });
        answerSubmitted.current = true;
      }
    });

    socket.on("result", ({ correct }) => {
      setCorrect(correct);
      setresultSent(true);
    });

    socket.on("finish", () => {
      navigate(`/session/${id}/results`);
    });
  }, [socket, id, navigate]);

  const handleSubmitAnswer = (answer) => {
    if (!answerSubmitted.current) {
      setQuizStopped(true);
      socket.emit("submit answer", { sessionId: id, answer });
      answerSubmitted.current = true;
    }
  };
  return (
    <div className="max-w-[1100px] mx-auto flex flex-col items-center justify-center min-h-screen select-none">
      <div>
        <div className="mx-auto mb-20">
          <h1 className="text-4xl text-center">{qst}</h1>
        </div>
        <ul className="grid grid-cols-4 gap-8 mx-auto mb-8">
          {options.map((option) => {
            return (
              <li
                key={option}
                onClick={() => handleSubmitAnswer(option)}
                className={`cursor-pointer text-center text-2xl p-2 bg-[#6541F5] border-4 border-transparent hover:border-white duration-300 hover:shadow-sm hover:shadow-black flex justify-center items-center ${
                  quizStopped ? "pointer-events-none opacity-50" : ""
                }`}
                style={{ aspectRatio: "1/1" }}
              >
                {option}
              </li>
            );
          })}
        </ul>
        <BarTimer alert={qst} />
      </div>
      {answerSubmitted.current && (
        <div className="absolute h-screen w-screen z-10 bg-black bg-opacity-70 flex justify-center items-center">
          <p
            className={`text-8xl font-bold text-center bg-[#6541F5] w-full py-10`}
          >
            <span
              className={`${
                !resultSent
                  ? "animate-pulse text-6xl"
                  : correct
                  ? "text-green-900"
                  : " text-red-700 animate-shake"
              }`}
            >
              {!resultSent
                ? timeout
                  ? "le temps est fini"
                  : "attendant les autres joueurs..."
                : correct
                ? "Correct"
                : "Incorrect"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default QuestionsShow;
