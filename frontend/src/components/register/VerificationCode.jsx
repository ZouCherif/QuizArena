import { useState } from "react";
import { verifyCode } from "../../utils/api";

function VerificationCode({ next, email }) {
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
  return (
    <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3">
      <h1 className="text-xl text-center font-semibold mb-4">
        Entrez le code que vous avez recu sur votre boite mail
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="verificationCode"
          name="verificationCode"
          className="w-full p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-10"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        {error && (
          <p className="text-red-500 text-xs mb-2 text-center animate-shake">
            Code Invalid
          </p>
        )}
        <button
          className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 block text-xl mx-auto"
          type="submit"
          disabled={submitDiabled}
        >
          Valider
        </button>
      </form>
    </div>
  );
}

export default VerificationCode;
