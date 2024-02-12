import { useState } from "react";
function AddQuestions() {
  let questionNum = 1;
  const [inputs, setInputs] = useState([]);

  const addResponse = () => {
    if (inputs.length < 4) { // Limiter le nombre d'inputs ajoutés
      setInputs([...inputs, '']); // Ajouter un nouvel élément vide à la fin du tableau
    }
  };
  const removeAddButton = inputs.length >= 4;
  return (
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
      <div className=" flex justify-between items-center bg-[#1A1A2F] px-5 py-5 rounded-xl mb-10">
        <p className="text-2xl">Ajouter des questions</p>
        <div>
        <label htmlFor="select" className=" text-xl mx-2">Difficulté</label>
        <select
        id="select"
          defaultValue={"Facile"}
          className="bg-[rgb(26,26,47)] border rounded-lg p-2"
        >
          <option value="Facile" className="text-sm">
            Facile
          </option>
          <option value="Moyen" className="text-sm">
            Moyen
          </option>
          <option value="Difficile" className="text-sm">
          Difficile
          </option>
        </select>
        </div>
      </div>
      <div>
        <div className=" bg-[#1A1A2F] p-2 flex mb-4 rounded-xl">
          <span className="mr-1">{questionNum}.</span>
          <textarea
            className="inline w-full outline-none rounded bg-transparent "

            placeholder="Tapez ici..."
            required
          ></textarea>
        </div>
        <div className="flex justify-center flex-col w-3/4 mx-auto ">
          {inputs.map((input, index) => (
            <div key={index} className="bg-[#1A1A2F] p-2 flex mb-4 rounded-xl px-4">
              <input
                className=" outline-none bg-transparent p-2 w-full h-full border-r-2 "
                placeholder="Tapez ici..."
                required
              />
              <span>
                <select
                  id="select"
                    defaultValue={"Facile"}
                    className="bg-[#1A1A2F] border rounded-lg p-2  ml-3"
                  >
                    <option value="Facile" className="text-sm text-green-500 ">
                      Correct
                    </option>
                    <option value="Moyen" className="text-sm text-red-600">
                      Incorrecte
                    </option>
                  </select>
              </span>
            </div>
          ))}
          {
            removeAddButton ?
            <button onClick={addResponse} className=" bg-[#52be31] py-2.5 text-center m-auto w-2/3  rounded-lg border-2   text-xl">Valider</button>
            :
            <button onClick={addResponse} className=" bg-[#9b9baf] py-2.5 text-center m-auto w-2/3 opacity-60 rounded-lg border-2 border-dashed border-gray-50 text-xl">Ajouter</button>
          }
        </div>
      </div>
    </div>
  )
}
export default AddQuestions;
