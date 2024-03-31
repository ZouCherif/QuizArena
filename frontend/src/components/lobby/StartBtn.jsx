import { useAuth } from "../../context/AuthContext";
function StartBtn({ socket, id }) {
  const { admin } = useAuth();
  const handleStartQuiz = () => {
    socket.emit("start quiz", { sessionId: id });
  };
  return admin ? (
    <button
      className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 text-base"
      onClick={handleStartQuiz}
    >
      Commencer <br /> maintenant
    </button>
  ) : null;
}

export default StartBtn;
