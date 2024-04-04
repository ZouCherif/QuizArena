import { useEffect, useState } from "react";

function NextQuestionButton({ socket, id }) {
  const [disabled, setDisabled] = useState(true);
  const sendQuestion = () => {
    if (!disabled) {
      socket.emit("next question", { sessionId: id });
    }
  };

  useEffect(() => {
    socket.on("question", () => {
      setDisabled(true);
    });

    socket.on("stop", () => {
      setDisabled(false);
    });
  });
  return (
    <button
      className={`rounded-lg ${
        disabled ? "bg-gray-500 pointer-events-none" : "bg-[#6541F5]"
      } px-6 py-2 hover:bg-[#886df3] duration-300 text-base`}
      onClick={sendQuestion}
      disabled={disabled}
    >
      Suivant
    </button>
  );
}

export default NextQuestionButton;
