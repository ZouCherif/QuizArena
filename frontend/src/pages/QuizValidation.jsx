import React from "react";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
function QuizValidation() {
  const location = useLocation();
  const {forms} = location.state;

  // Utilisez les données forms pour valider le quiz ou afficher les résultats, etc.

  return  (
    <div className="max-w-[1200px] mx-auto">
        <div className="xs:text-5xl text-center font-semibold my-7 select-none text-3xl">
                <span className="xs:text-5xl text-center font-semi-bold text-[#6541F5] font-bold text-3xl">
                  Q
                </span>
                uiz
                <span className="xs:text-5xl text-center font-semi-bold font-bold text-orange-500 text-3xl">
                  A
                </span>
                rena
        </div>
        <div className="absolute top-8 left-5">
          <button  className="bg-gray-500 text-white px-4 py-2 rounded-lg">Retour</button>
        </div>
      <div>
        {forms.map((form, index) => (
          <div key={index}>
            <h2 className=" bg-[#1A1A2F] p-5" >Question {index + 1}: {form.question}</h2>
            {form.responses.map((response, idx) => (
                <div className="p-3  flex justify-center" key={idx}>
                    <span  className="w-3/4">{idx+1    }. {response.text}</span>
                    <div className="inline "> {response.isCorrect ?"Correct":"Incorrect"} </div>
                </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizValidation;
