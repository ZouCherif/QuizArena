import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Join() {
  const [playerName, setPlayerName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleJoinSession = () => {
    navigate(`/session/${id}/arena`, { state: { playerName } });
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-6 bg-[#1A1A2F] rounded-lg sm:w-[500px] w-screen sm:h-[500px] h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-4xl font-semibold mb-4">Title</h1>
        <input
          type="text"
          value={playerName}
          onChange={handleInputChange}
          placeholder="Enter your name"
          className="w-full p-2 rounded bg-[#D9D9D9] opacity-50 text-black mb-6"
        />
      </div>
      <div className="flex justify-between">
        <button className="rounded-lg bg-gray-500 px-6 py-2 hover:bg-[#886df3] duration-300 block text-xl">
          Retourner
        </button>
        <button
          className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 block text-xl "
          onClick={handleJoinSession}
        >
          rejoindre
        </button>
      </div>
    </div>
  );
}

export default Join;
