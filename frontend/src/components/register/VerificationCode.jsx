import { useState } from "react";
import { verifyCode } from "../../utils/api";

function VerificationCode({ next,previous,email }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [submitDiabled, setSubmitDiabled] = useState(false);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitDiabled(true);
    setError("");
    if (!code) {
      setSubmitDiabled(false);
      return;
    }
    if (code.length < 5) {
      setError("Code Invalid");
      setSubmitDiabled(false);
      return;
    }
    try {
      await verifyCode({ code, email });
      next();
    } catch (err) {
      setSubmitDiabled(false);
      setError(err.response.data.message);
    }
  };
  const handleReturnClick = () => {
    previous(); // Revenir à l'étape précédente
  };
  return (
    <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 mt-28">
      <h1 className="text-xl  text-left font-semibold mb-4">
        Code de vérification : 
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full ">
          <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            className="w-2/3 p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-2"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />  
          <button
            className=" w-1/3 p-3  rounded-lg bg-[#6541F5]  hover:bg-[#886df3] duration-300 block text-xl ml-2 h-12"
            type="submit"
            disabled={submitDiabled}
          >
            Valider
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-xs mb-2 text-center animate-shake">
            Code Invalid
          </p>
        )}

      </form> 
         <button onClick={handleReturnClick} class="text-blue-500 hover:underline mt-3">Code non reçu ?</button>
    </div>
  );
}

export default VerificationCode;
