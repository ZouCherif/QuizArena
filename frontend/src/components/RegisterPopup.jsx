import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import Email from "./register/Email";
import VerificationCode from "./register/VerificationCode";
import UsernamePwd from "./register/UsernamePwd";

function RegisterPopup({ onClose }) {
  const [email, setEmail] = useState("");
  const [view, setView] = useState(1);
  const nextView = () => {
    setView(view + 1);
  };
  const previousView = () => setView(view - 1);
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1A1A2F] rounded-lg z-20 sm:w-[500px] w-screen sm:h-[600px] h-screen">
      <IoMdClose
        size={30}
        onClick={onClose}
        className="mt-2 ml-2 hover:bg-gray-800 bg-opacity-5 rounded-full cursor-pointer"
      />
      <h1 className="text-4xl text-center font-semibold">S'inscrire</h1>
      {view === 1 && <Email setEmail={setEmail} next={nextView} />}
      {view === 2 && (
        <VerificationCode
          next={nextView}
          previous={previousView}
          email={email}
        />
      )}
      {view === 3 && <UsernamePwd onClose={onClose} email={email} />}
    </div>
  );
}

export default RegisterPopup;
