import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { Email, VerificationCode, UsernamePwd } from "./register";

function RegisterPopup({ onClose }) {
  const [email, setEmail] = useState("");
  const [view, setView] = useState(1);
  const nextView = () => {
    setView(view + 1);
  };
  const previousView = () => setView(view - 1);
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1A1A2F] rounded-lg z-20 sm:w-[500px] w-screen sm:h-[500px] h-screen">
      <IoMdClose
        size={30}
        onClick={onClose}
        className="mt-2 ml-2 hover:bg-gray-800 bg-opacity-5 rounded-full cursor-pointer"
      />
      <div className="w-2/3 mx-auto">
      <div className="xs:text-5xl text-center font-semibold mb-3 select-none text-3xl">
            <span className="xs:text-5xl text-center font-semi-bold mb-10 text-[#6541F5] font-bold text-3xl">
              Q
            </span>
            uiz
            <span className="xs:text-5xl text-center font-semi-bold mb-10 font-bold text-orange-500 text-3xl">
              A
            </span>
            rena
      </div>
        <h1 className="xs:text-4xl text-center font-semibold mb-5 text-2xl">Inscription</h1>
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
    </div>
  );
}

export default RegisterPopup;
