import { useState } from "react";
import { sendCode } from "../../utils/api";

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
    <form
      onSubmit={handleSubmit}
      className="w-2/3 fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <label htmlFor="email">Email:</label>
      <br />
      <input
        type="text"
        id="email"
        name="email"
        className="w-full p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
        placeholder="exemple@gmail.com"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        required
      />
      {error && (
        <p className="text-red-500 text-xs text-center animate-shake">
          {error}
        </p>
      )}
      <button
        className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 block text-xl mx-auto mt-8"
        type="submit"
        disabled={submitDiabled}
      >
        S'inscrire
      </button>
    </form>
  );
}

export default Email;
