  import { useState } from "react";
  // import { v4 as uuidv4 } from 'uuid';
  function AddQuestions() {
    const [questionNum, setQuestionNum] = useState(1);
    const [forms, setForms] = useState([{ id: questionNum, question: "", responses: ["", "", "", ""] }]);
    const [validatedData, setValidatedData] = useState([]);
    const [validatedForms, setValidatedForms] = useState([]);
    // const [showAddAnswersButton,setShowAddAnswersButton] = useState(true);
    

    const addQuestion = () => {
      setQuestionNum(prevNum => prevNum + 1);
      setForms(prevForms => [
        ...prevForms,
        { id: questionNum + 1, question: "", responses: ["", "", "", ""] }
      ]);
      console.log(forms);
    };
    const handleSubmit = (e, id) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const question = formData.get("question");
      const responses = Array.from({ length: 4 }, (_, i) => formData.get(`response${i + 1}`));
      const updatedForms = forms.map(form => (form.id === id ? { ...form, question, responses } : form));
      setForms(updatedForms);
      console.log("forms apres valider",forms);
      const validatedFormData = { id,question, responses };
      // console.log("Validated Form Data:", validatedFormData);
      setValidatedData(prevData => [...prevData, validatedFormData]);
      setValidatedForms(prevForms => [...prevForms, validatedFormData]);
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
        {forms.map((form) => (
          <form key={form.id} onSubmit={(e) => {handleSubmit(e, form.id)}} className="flex justify-center flex-col w-4/5 mx-auto relative pb-16">
            <div className=" bg-[#1A1A2F] p-2 flex mb-4 rounded-xl">
              <span className="mr-1">{form.id}.</span>
              <textarea
                className={`inline w-full outline-none rounded bg-transparent ${validatedForms.some(validatedForm => validatedForm.id === form.id) ? 'opacity-60 pointer-events-none' : ''}`}
                placeholder="Tapez ici..."
                name="question"
                onChange={(e)=>{
                  let updatedQuestion = form.question
                  updatedQuestion = e.target.value;
                  const updatedForms = forms.map(f => f.id === form.id ? { ...f, question: updatedQuestion } : f);
                  setForms(updatedForms);
                }}
                disabled={validatedForms.some(validatedForm => validatedForm.id === form.id)}
                required
              />
            </div>
            {form.responses.map((response, responseIndex) => (
              <input
                key={responseIndex}
                type="text"
                className={`mx-20 mb-2  bg-[#1A1A2F] p-5 ${validatedForms.some(validatedForm => validatedForm.id === form.id) ? 'opacity-60 pointer-events-none' : ''}`} 
                placeholder={`Réponse ${responseIndex + 1}`}
                name={`response${responseIndex + 1}`}
                value={response}
                onChange={(e) => {
                  const updatedResponses = [...form.responses];
                  updatedResponses[responseIndex] = e.target.value;
                  const updatedForms = forms.map(f => f.id === form.id ? { ...f, responses: updatedResponses } : f);
                  setForms(updatedForms);
                }}
                disabled={validatedForms.some(validatedForm => validatedForm.id === form.id)}
                required
              />
            ))}
            {form.responses.length === 4 && (
              <button type="submit" className={`rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 block text-xl mx-auto mb-4 absolute bottom-0 right-20 ${validatedForms.some(validatedForm => validatedForm.id === form.id) ? 'opacity-60 pointer-events-none' : ''}`} disabled={validatedForms.some(validatedForm => validatedForm.id === form.id)}>
                Valider les réponses
              </button>
            )}
          </form>
        ))}
          <div className="flex justify-center flex-col w-4/5 mx-auto">
            <button onClick={addQuestion} className="  bg-[#9b9baf] py-5 text-center m-auto w-4/5 opacity-60 rounded-lg border-2 border-dashed border-gray-50 text-2xl">Ajouter une question</button>
          </div>

        </div>
      </div>
    )
  }
  export default AddQuestions;
