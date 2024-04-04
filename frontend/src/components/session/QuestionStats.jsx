import BarChart from "./BarChart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function QuestionStats({ socket, id }) {
  const [qst, setQst] = useState();
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [ranking, setRanking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("question", (question) => {
      setAnswered([]);
      setRanking([]);
      setQst(question.question);
      setOptions(question.options);
      setShowResults(false);
      setResults([]);
    });

    socket.on("results", ({ result, ranking }) => {
      setResults(result);
      setRanking(ranking);
      setShowResults(true);
    });
    socket.on("answered", ({ playerName, id }) => {
      const isPlayerAnswered = answered.some((player) => player.id === id);
      if (!isPlayerAnswered) {
        setAnswered((prevAnswered) => [...prevAnswered, { playerName, id }]);
      }
    });

    socket.on("finish", () => {
      socket.emit("storeIT", { sessionId: id });
      navigate(`/session/${id}/results`);
      // navigate(`/session/${id}/results`, { state: { id } });
    });
  }, [socket, id, navigate]);
  return (
    <div className="max-w-[1200px] mx-auto">
      <div>
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
        <hr className="mb-8" />
        <div className="grid grid-cols-6 gap-4 mb-4">
          {answered.map((player) => (
            <div
              key={player.playerName}
              className="bg-[#1A1A2F] rounded-lg p-4 text-lg flex justify-between items-center"
            >
              <span>{player.playerName}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        {showResults && (
          <div className="p-8">
            <div className="border p-4">
              <BarChart results={results} />
              <div className="w-1/2 mx-auto max-h-[700px] overflow-auto">
                <div className="mb-4">
                  <div className="flex py-2 px-2">
                    <span className="mr-4">rang</span>{" "}
                    <div className="flex justify-between flex-grow">
                      <span>Nom Joueur</span>
                      <span>Score</span>
                    </div>
                  </div>
                  <hr />
                </div>
                {ranking.map((player, index) => (
                  <div className="py-2 px-6 rounded-lg bg-[#1A1A2F] flex text-lg mb-4">
                    <span className="mr-6">{index + 1}.</span>
                    <div className="flex justify-between flex-grow">
                      <span>{player.name}</span>
                      <span>{player.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionStats;
