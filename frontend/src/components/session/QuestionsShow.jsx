import { useState, useEffect } from "react";

function QuestionsShow({ socket, id }) {
  const [qst, setQst] = useState(
    "lrem ipsum hello world this is my awesome quiz app give me your opinion?"
  );
  const [options, setOptions] = useState(["1st", "2nd", "3rd", "4th"]);

  useEffect(() => {
    socket.on("question", (question) => {
      setQst(question.question);
      setOptions(question.options);
    });
  }, [socket]);

  const handleSubmitAnswer = (answer) => {
    socket.emit("submit answer", { sessionId: id, answer });
  };
  return (
    <div className="max-w-[1100px] mx-auto flex flex-col items-center justify-center min-h-screen">
      <div>
        <div className="mx-auto mb-20">
          <h1 className="text-4xl text-center">{qst}</h1>
        </div>
        <ul className="grid grid-cols-4 gap-8 mx-auto">
          {options.map((option) => {
            return (
              <li
                onClick={() => handleSubmitAnswer(option)}
                className="cursor-pointer text-center text-2xl p-2 bg-[#6541F5] border-4 border-transparent hover:border-white duration-300 hover:shadow-sm hover:shadow-black flex justify-center items-center"
                style={{ aspectRatio: "1/1" }}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default QuestionsShow;
