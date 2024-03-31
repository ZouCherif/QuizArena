import { Timer, DisplayPlayers, DisplaySessionCode, StartBtn } from "../lobby";
import { MdContentCopy } from "react-icons/md";
function Lobby({ socket, id }) {
  return (
    <>
      <div className="bg-[#1A1A2F] mb-10">
        <nav className="flex justify-around py-4 items-center max-w-[1200px] mx-auto">
          <button className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 text-base">
            Quitter
          </button>
          <Timer />
          <StartBtn socket={socket} id={id} />
        </nav>
      </div>
      <div className="max-w-[1200px] mx-auto p-2">
        <div className="flex justify-around mb-4">
          <div className="mr-4 flex flex-col bg-[#1A1A2F] p-4 rounded-lg">
            <span className="select-none">Code Session:</span>
            <div className="flex items-center">
              <DisplaySessionCode id={id} />
              <MdContentCopy
                size={40}
                className="hover:bg-gray-600 rounded-lg p-1 cursor-pointer duration-300"
              />
            </div>
          </div>
        </div>
        <DisplayPlayers socket={socket} />
      </div>
    </>
  );
}

export default Lobby;
