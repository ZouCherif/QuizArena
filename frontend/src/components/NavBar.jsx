import { FaSearch,FaTrophy  } from "react-icons/fa";
import { useState, useEffect } from "react";
import RegisterPopup from "./RegisterPopup";
import SigninPopup from "./SigninPopup";
import RankButton from "./RankButtonCom";
import { useAuth } from "../context/AuthContext";
import { IoMdAdd } from "react-icons/io";
import { useLocation } from "react-router-dom";


function NavBar() {
  const { user } = useAuth();
  const location = useLocation();
  const [ShowSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);


  
  useEffect(() =>{
    console.log("hello");
  },[location])

  return (
    <div className="bg-[#1A1A2F] lg:px-2 lg:py-3 py-2">
      <div
        className={`flex max-w-[1500px] m-auto lg:px-8 px-2 items-center justify-between ${
          showRegister || ShowSignIn ? "select-none" : ""
        }`}
      >
        <div className="flex items-center">
          <div className="lg:text-xl text-lg font-semibold lg:mr-8 md:mr-4 mr-2 select-none">
            <span className="lg:text-2xl text-xl text-[#6541F5] font-bold">
              Q
            </span>
            uiz
            <span className="lg:text-2xl text-xl font-bold text-orange-500">
              A
            </span>
            rena
          </div>
          <div className="flex flex-initial lg:w-96 w-60 rounded-full items-center bg-[#DADADA] py-1 md:px-4 px-2 lg:mr-4 mr-2">
            <input
              type="text"
              className="bg-transparent outline-none md:mr-2 flex-1 text-black lg:text-base md:text-sm text-xs"
              placeholder="Trouver un quiz"
            />
            <FaSearch size={16} className="*:text-gray-400" />
          </div>
          {user && (
            <button className="sm:flex items-center bg-orange-600 hover:bg-gray-700 duration-500 py-1 md:pr-4 md:pl-2 pl-1 pr-2 rounded-lg hidden whitespace-nowrap lg:text-base md:text-sm text-xs">
              <IoMdAdd className="md:mr-2" size={15} />
              Creer un quiz
            </button>
          )}
        </div>
        {!user ? (
          <div className="sm:flex hidden whitespace-nowrap">
            <button
              className="rounded-lg bg-gray-700 md:mr-4 mr-2 md:px-4 px-2 py-1 hover:bg-gray-500 duration-300 lg:text-base md:text-sm text-xs"
              onClick={() => setShowRegister(true)}
            >
              S'inscrire
            </button>
            <button
              className="rounded-lg bg-[#6541F5] md:px-4 px-2 py-1 hover:bg-[#886df3] duration-300 lg:text-base md:text-sm text-xs"
              onClick={() => setShowSignIn(true)}
            >
              Se connecter
            </button>
          </div>
        ) : (
          <div className="flex space-x-10">
            <RankButton/>
            <p className="text-xl">{user.username}</p>
          </div>
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
