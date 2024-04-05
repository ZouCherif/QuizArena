import { useState } from "react";
import { sendCode } from "../../utils/api";
import GoogleOauth from "../GoogleOauth";

function Email({ setEmail, next }) {
  const [mail, setMail] = useState("");
  const [error, setError] = useState("");
  const [submitDiabled, setSubmitDiabled] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!mail) {
      return;
    }
    setSubmitDiabled(true);
    if (!validateEmail(mail)) {
      setError("Email invalide");
      setSubmitDiabled(false);
      return;
    }
    setError("");
    try {
      await sendCode(mail);
      setEmail(mail);
      next();
    } catch (e) {
      setSubmitDiabled(false);
      setError(e.response.data.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email :</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          className="w-full p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1 mt-1 "
          placeholder="exemple@gmail.com"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
        {error && (
          <p className="text-red-500 text-xs text-center animate-shake truncate">
            {error}
          </p>
        )}
        <button
          className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 block xs:text-xl mx-auto xs:mt-6 mt-4 text-lg"
          type="submit"
          disabled={submitDiabled}
        >
          S'inscrire
        </button>
      </form>
      <div>
        <div className="flex items-center xs:mt-8 mt-6">
          <hr className="w-1/2 border border-gray-500" />
          <span className="mx-1 clear-start text-gray-500">OU</span>
          <hr className="w-1/2 border border-gray-500" />
        </div>
        <p className="mb-5 text-center text-base xs:text-xl">
          S'inscrire avec Google
        </p>
        <GoogleOauth />
      </div>
    </>
  );
}

export default Email;
