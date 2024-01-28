import { IoMdClose } from "react-icons/io";

function RegisterPopup({ onClose }) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1A1A2F] rounded-lg z-20 sm:w-[500px] w-screen sm:h-[500px] h-screen">
      <IoMdClose
        size={30}
        onClick={onClose}
        className="mt-2 ml-2 hover:bg-gray-800 bg-opacity-5 rounded-full cursor-pointer"
      />
      <dir className="w-2/3 mx-auto">
        <h1 className="text-4xl text-center mt-2 font-semibold">
          Se Connecter
        </h1>
        <form className="mt-8">
          <label htmlFor="">Email:</label>
          <br />
          <input
            type="text"
            className="w-full p-2 rounded bg-[#D9D9D9] opacity-50 text-black mb-4"
            placeholder="exemple@gmail.com"
          />
          <br />
          <label htmlFor="">Mot de passe:</label>
          <br />
          <input
            type="password"
            className="w-full p-2 rounded bg-[#D9D9D9] opacity-50 text-black mb-2"
            placeholder="•••••••••••••"
          />
          <p className="text-sm text-[#6541F5] hover:underline cursor-pointer w-fit mb-10">
            Mot de passe oublié?
          </p>
          <button className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 block text-xl mx-auto">
            Se connecter
          </button>
        </form>
      </dir>
    </div>
  );
}

export default RegisterPopup;
