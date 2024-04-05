import { useEffect, useState } from "react";
import { getSession } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState({ questions: [], players: [] });
  useEffect(() => {
    const getS = async () => {
      try {
        const pastSession = await getSession(id);
        setResults(pastSession);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      getS();
    }, 2000);
  }, [id]);
  return (
    <div className="py-6 max-w-[1100px] mx-auto">
      <div className="xs:text-5xl text-center font-semibold xs:mb-5 mb-1 select-none text-3xl">
        <span className="xs:text-5xl text-center font-semi-bold mb-10 text-[#6541F5] font-bold text-3xl">
          Q
        </span>
        uiz
        <span className="xs:text-5xl text-center font-semi-bold mb-10 font-bold text-orange-500 text-3xl">
          A
        </span>
        rena
      </div>
      {results.questions.length === 0 ? (
        <ImSpinner9 size={30} className="animate-spin mx-auto mt-14" />
      ) : (
        <div>
          <hr className="mb-8" />
          {results.questions.map((result, index) => (
            <div className="mb-8" key={index}>
              <div className="mx-auto mb-8">
                <h1 className="text-lg text-center">
                  {index + 1}. {result.question}
                </h1>
              </div>
              <ul className="grid grid-cols-4 gap-8 mx-auto max-w-[1000px]">
                {result.options.map((option, index) => {
                  return (
                    <li
                      className="text-center p-2 bg-[#6541F5] border-2"
                      key={index}
                    >
                      {option}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <hr className="mb-8" />
          <div className="flex justify-around max-w-[900px] mx-auto">
            <span>Nom Joueur</span>
            <span className="flex-1 max-w-[900px] text-center">reponses</span>
            <span>Score</span>
          </div>
          <hr className="mb-4 max-w-[1000px] mx-auto" />
          <div className="mb-16">
            {results.players.map((player, i) => (
              <div className="flex justify-around mb-4" key={i}>
                <span className="w-20 truncate">
                  {i + 1}. {player.name}
                </span>
                <div className="max-w-[500px] flex-1 overflow-x-auto-auto">
                  {player.answers.map((answer, i) => (
                    <span
                      className={`rounded-full p-2 mr-1 ${
                        answer.correct ? "bg-green-700" : "bg-red-700"
                      }`}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
                <span>{player.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <button
          className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 text-base"
          onClick={() => navigate("/")}
        >
          Quitter
        </button>
      </div>
    </div>
  );
}

export default Results;
