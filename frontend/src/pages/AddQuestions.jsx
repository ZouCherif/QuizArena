  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useLocation } from "react-router-dom";
  
  // import { v4 as uuidv4 } from 'uuid';
  function AddQuestions() {
    const navigate = useNavigate();
    const location = useLocation();
    const [questionNum, setQuestionNum] = useState(1);
    const [forms, setForms] = useState([{ id: questionNum, question: "", responses: ["", "", "", ""].map(() => ({ text: "", isCorrect: false }))}]);
    const [hiddenButtons, setHiddenButtons] = useState([]);
    const addQuestion = (e,formId) => {

      if(location.state?.forms!==null){
        setForms(location.state?.forms);
      }
      e.preventDefault();
      const lastForm = forms[forms.length - 1];
      const isLastFormValid = lastForm.question.trim() !== "" && lastForm.responses.every(response => response.text.trim() !== "");

      // Si tous les champs du dernier formulaire sont remplis, ajouter une nouvelle question
      if (isLastFormValid) {
        setQuestionNum(prevNum => prevNum + 1);
        setForms(prevForms => [
          ...prevForms,
          { id: questionNum + 1, question: "", responses: ["", "", "", ""].map(() => ({ text: "", isCorrect: false })) }
        ]);
        setHiddenButtons(prevHiddenButtons => [...prevHiddenButtons, formId]);
      } else {
        alert("Veuillez remplir tous les champs avant d'ajouter une nouvelle question.");
      }
      console.log(forms);
    };
    const handleGoBack = () => {
      navigate("/") 
    };
    const validateQuiz=(e)=>{
      e.preventDefault();
      navigate('/QuizValidation',{state:{forms:forms}});
    }
    const toggleResponseCorrectness = (e,formId, responseIndex) => {
      e.preventDefault();
      setForms(forms.map(form =>  {
        if (form.id === formId) {
          return {
            ...form,
            responses: form.responses.map((response, index) => {
              if (index === responseIndex) {
                return {
                  ...response,
                  isCorrect: !response.isCorrect // Inverser l'état de la réponse (true -> false, false -> true)
                };
              } else {
                return {
                  ...response,
                  isCorrect: false // Marquer toutes les autres réponses comme fausses
                };
              }
            })
          };
        }
        return form;
      }));
    };
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
        <div className="absolute top-8 left-5">
          <button onClick={handleGoBack} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Retour</button>
        </div>
        <div className=" flex justify-between items-center bg-[#1A1A2F] px-5 py-5 rounded-xl mb-5">
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
        {forms.map((form,questionIndex) => (
          <form key={form.id}   className="flex justify-center flex-col w-4/5 mx-auto relative">
            <div className=" bg-[#1A1A2F] p-2 flex mb-4 rounded-xl">
              <span className="mr-1">{form.id}.</span>
              <textarea
                className={`inline w-full outline-none rounded bg-transparent`}
                placeholder="Tapez ici..."
                name="question"
                onChange={(e)=>{
                  let updatedQuestion = form.question
                  updatedQuestion = e.target.value;
                  const updatedForms = forms.map(f => f.id === form.id ? { ...f, question: updatedQuestion } : f);
                  
                  setForms(updatedForms);
                }}
                required
              />
            </div>
            {form.responses.map((response, responseIndex) => (
              <div  className="flex items-center mb-2 w-full">
                <input
                  key={responseIndex}
                  type="text"
                  className={` ml-10 mb-2  bg-[#1A1A2F] p-5 w-5/6 `} 
                  placeholder={`Réponse ${responseIndex + 1}`}
                  name={`response${responseIndex + 1}`} 
                  value={response.text}
                  onChange={(e) => {
                    const updatedResponses = [...form.responses];
                    updatedResponses[responseIndex] = {
                      ...updatedResponses[responseIndex],
                      text: e.target.value,
                    };
                    const updatedForms = forms.map((f) =>
                      f.id === form.id ? { ...f, responses: updatedResponses } : f
                    );
                    setForms(updatedForms);
                  }}

                  required
                />
                <button
                  className={`w-1/6 h-8 rounded-full`}
                  onClick={(e) => toggleResponseCorrectness(e,form.id, responseIndex)}
                >
                  {form.responses[responseIndex].isCorrect   ? '✓' : '✕'}
                </button>
              </div>
            ))}
              {!hiddenButtons.includes(form.id) &&
                <div className="flex justify-center flex-col w-4/5 mx-auto">
                  <button onClick={(e)=>addQuestion(e,form.id)} className="  bg-[#9b9baf] py-5 mb-10 text-center m-auto w-full opacity-60 rounded-lg border-2 border-dashed border-gray-50 text-2xl">Ajouter une question</button>
                </div>
              }
          </form>
          
        ))}
        </div>
        {forms.length>=3&&
          (
            <div className="flex justify-center">
              <button onClick={(e)=>{validateQuiz(e)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded mt-4 text-xl">
                Valider le quiz
              </button>
            </div>
          )
        };
      </div>
    )
  }
  export default AddQuestions;
