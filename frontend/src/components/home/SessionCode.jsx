import { useState } from "react";
import { joinSession } from "../../utils/api";
import { useNavigate } from "react-router-dom";

function SessionCode() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    const sessionCode = parseInt(inputValue);
    if (isNaN(sessionCode) || sessionCode < 100000 || sessionCode > 999999) {
      console.log("Invalid session sessionCode");
      return;
    }
    try {
      const response = await joinSession(sessionCode);
      navigate(`/session/${response.sessionId}/join`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center mx-auto mt-6 p-1 bg-[#DADADA] w-1/3 rounded-md">
      <input
        type="text"
        className="bg-transparent py-1 px-2 flex-1 text-black text-xl font-semibold outline-none"
        placeholder="Entrer un code de session"
        maxLength={6}
        onChange={handleInput}
      />
      <button
        className="px-6 py-2 bg-[#1A1A2F] hover:bg-[#6541F5] duration-300 rounded-md"
        onClick={handleSubmit}
      >
        Joindre
      </button>
    </div>
  );
}

export default SessionCode;
