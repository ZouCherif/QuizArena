import { useLocation } from "react-router-dom";
import { IoRefreshSharp } from "react-icons/io5";
import { getQuestion } from "../utils/api";
import { useState } from "react";

function QuestionsDisplay() {
  const location = useLocation();
  const [data, setData] = useState(location.state?.data);

  const changeQuestion = async (index) => {
    try {
      const { difficulty, category, _id } = data[index];

      const response = await getQuestion({ difficulty, category, id: _id });
      const newData = [...data];
      newData[index] = response.question;
      setData(newData);
    } catch (err) {
      console.error(err);
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
            <p className="mr-2 text-sm">{element.difficulty}</p>
            <IoRefreshSharp
              className="hover:bg-slate-700 duration-500 rounded-full cursor-pointer p-1"
              size={30}
              onClick={() => changeQuestion(index)}
            />
          </div>
          <div className="bg-[#1A1A2F] p-5 mb-5 text-lg">
            {index + 1}. {element.question}
          </div>
          <ul className="ml-10 w-fit min-w-96">
            <li className="bg-[#1A1A2F] p-3 mb-3">1. {element.options[0]}</li>
            <li className="bg-[#1A1A2F] p-3 mb-3">2. {element.options[1]}</li>
            <li className="bg-[#1A1A2F] p-3 mb-3">3. {element.options[2]}</li>
            <li className="bg-[#1A1A2F] p-3 mb-5">4. {element.options[3]}</li>
          </ul>
        </div>
      ))}
      <hr className="mb-4 mx-4" />
      <div className="flex justify-between">
        <button className="py-2 px-8 hover:bg-gray-500 bg-gray-600 rounded-lg duration-300">
          Retour
        </button>
        <div>
          <button className="py-2 px-8 hover:bg-green-600 bg-green-700 rounded-lg duration-300 mr-4">
            Sauvegarder
          </button>
          <button className="py-2 px-8 bg-[#6541F5] hover:bg-[#492bc3] rounded-lg duration-300">
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionsDisplay;
