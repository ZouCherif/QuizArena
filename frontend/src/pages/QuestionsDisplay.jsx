import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoRefreshSharp } from "react-icons/io5";
import { getQuestion, saveQuestions } from "../utils/api";
import { useState } from "react";

function QuestionsDisplay() {
  const location = useLocation();
  const [data, setData] = useState(location.state?.data || []);
  const [loadingStates, setLoadingStates] = useState(
    new Array(data.length).fill(false)
  );
  const { id } = useParams();
  const navigate = useNavigate();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const changeQuestion = async (index) => {
    try {
      setLoadingStates((prevLoadingStates) =>
        prevLoadingStates.map((prevState, i) =>
          i === index ? true : prevState
        )
      );
      const { difficulty, category, _id } = data[index];

      const response = await getQuestion({ difficulty, category, id: _id });
      const newData = [...data];
      newData[index] = response.question;
      setData(newData);
      await sleep(1000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStates((prevLoadingStates) =>
        prevLoadingStates.map((prevState, i) =>
          i === index ? false : prevState
        )
      );
    }
  };

  const OnValidate = async () => {
    try {
      const response = await saveQuestions({ data, id });
      console.log(response.message);
      navigate(`/session/${id}/lobby`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="max-w-[1200px] mx-auto px-2 py-6">
      <div className="xs:text-5xl text-center font-semibold mb-7 select-none text-3xl">
        <span className="xs:text-5xl text-center font-semi-bold text-[#6541F5] font-bold text-3xl">
          Q
        </span>
        uiz
        <span className="xs:text-5xl text-center font-semi-bold font-bold text-orange-500 text-3xl">
          A
        </span>
        rena
      </div>
      <div className="bg-[#1A1A2F] p-5 mb-5 select-none">
        <h1 className="text-3xl font-semibold">These are the questions</h1>
      </div>
      {data.map((element, index) => (
        <div key={index}>
          <div className="flex justify-end items-center mb-1">
            <p className="mr-2 text-sm">{element.category}</p>
            <p
              className={`mr-2 text-sm px-2 rounded-full ${
                element.difficulty === "Facile"
                  ? "bg-green-700"
                  : element.difficulty === "Moyen"
                  ? "bg-orange-600"
                  : "bg-red-800"
              }`}
            >
              {element.difficulty}
            </p>
            <IoRefreshSharp
              className="hover:bg-slate-700 duration-500 rounded-full cursor-pointer p-1 hover:rotate-180"
              size={30}
              onClick={() => changeQuestion(index)}
            />
          </div>
          <div className="bg-[#1A1A2F] p-5 mb-5 text-lg">
            {loadingStates[index] ? (
              <div className="flex">
                <div className="animate-pulse bg-slate-700 w-1/4 h-3 rounded-lg mr-2"></div>
                <div className="animate-pulse bg-slate-700 w-2/4 h-3 rounded-lg mr-2"></div>
                <div className="animate-pulse bg-slate-700 w-1/4 h-3 rounded-lg"></div>
              </div>
            ) : (
              <span>
                {index + 1}. {element.question}
              </span>
            )}
          </div>
          <ul className="ml-10 w-fit min-w-96">
            <li className="bg-[#1A1A2F] p-3 mb-3">
              {loadingStates[index] ? (
                <div className="animate-pulse bg-slate-700 w-fill h-3 rounded-lg my-1"></div>
              ) : (
                <span>1. {element.options[0]}</span>
              )}
            </li>
            <li className="bg-[#1A1A2F] p-3 mb-3">
              {loadingStates[index] ? (
                <div className="animate-pulse bg-slate-700 w-fill h-3 rounded-lg my-1"></div>
              ) : (
                <span>2. {element.options[1]}</span>
              )}
            </li>
            <li className="bg-[#1A1A2F] p-3 mb-3">
              {loadingStates[index] ? (
                <div className="animate-pulse bg-slate-700 w-fill h-3 rounded-lg my-1"></div>
              ) : (
                <span>3. {element.options[2]}</span>
              )}
            </li>
            <li className="bg-[#1A1A2F] p-3 mb-5">
              {loadingStates[index] ? (
                <div className="animate-pulse bg-slate-700 w-fill h-3 rounded-lg my-1"></div>
              ) : (
                <span>4. {element.options[3]}</span>
              )}
            </li>
          </ul>
        </div>
      ))}
      <hr className="mb-4 mx-4" />
      <div className="flex justify-between">
        <button
          className="py-2 px-8 hover:bg-gray-500 bg-gray-600 rounded-lg duration-300"
          onClick={() => navigate(-1, { replace: true })}
        >
          Retour
        </button>
        <div>
          <button className="py-2 px-8 hover:bg-green-600 bg-green-700 rounded-lg duration-300 mr-4">
            Sauvegarder
          </button>
          <button
            className="py-2 px-8 bg-[#6541F5] hover:bg-[#492bc3] rounded-lg duration-300"
            onClick={OnValidate}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionsDisplay;
