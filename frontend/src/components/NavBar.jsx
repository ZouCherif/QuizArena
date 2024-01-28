import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import RegisterPopup from "./RegisterPopup";
import SigninPopup from "./SigninPopup";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { accessToken } = useAuth();
  const [ShowSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="bg-[#1A1A2F] px-2 py-3">
      <div className="flex max-w-[1500px] m-auto px-8 items-center justify-between">
        <div className="flex items-center">
          <div className="text-xl font-semibold mr-8">LOGO</div>
          <div className="flex flex-initial w-96 rounded-full items-center bg-[#DADADA] py-1 px-4 ">
            <input
              type="text"
              className="bg-transparent outline-none mr-2 flex-1 text-black"
              placeholder="Trouver un quiz"
            />
            <FaSearch size={20} className="*:text-gray-400" />
          </div>
        </div>
        {!accessToken ? (
          <div>
            <button
              className="rounded-lg bg-gray-700 mr-4 px-4 py-1 hover:bg-gray-500 duration-300"
              onClick={() => setShowRegister(true)}
            >
              S'inscrire
            </button>
            <button
              className="rounded-lg bg-[#6541F5] px-4 py-1 hover:bg-[#886df3] duration-300"
              onClick={() => setShowSignIn(true)}
            >
              Se connecter
            </button>
          </div>
        ) : (
          <p>connected</p>
        )}
      </div>
      {/* Sign-in Modal */}
      {ShowSignIn && <SigninPopup onClose={() => setShowSignIn(false)} />}

      {/* Create Account Modal */}
      {showRegister && <RegisterPopup onClose={() => setShowRegister(false)} />}

      {/* Overlay */}
      {(ShowSignIn || showRegister) && (
        <div className="fixed inset-0 bg-[#D9D9D9] opacity-20 z-10"></div>
      )}
    </div>
  );
}

export default NavBar;
