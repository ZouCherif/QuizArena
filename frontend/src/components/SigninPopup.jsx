import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import GoogleOauth from "./GoogleOauth";
import { useAuth } from "../context/AuthContext";
import { ImSpinner9 } from "react-icons/im";

function SigninPopup({ onClose }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { loginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setEmailValidity] = useState(true);
  const [isPasswordValid, setPasswordValidity] = useState(true);
  const [error, setError] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(false);

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!data.email || !data.password) return;
    if (!validateEmail(data.email)) {
      setEmailValidity(false);
      return;
    }
    setEmailValidity(true);
    if (data.password.length < 8) {
      setPasswordValidity(false);
      return;
    }
    setPasswordValidity(true);
    setLoginDisabled(true);
    try {
      await loginUser(data);
      onClose();
    } catch (err) {
      setLoginDisabled(false);
      if (err.code === "ERR_NETWORK") {
        setError(err.message);
      } else {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1A1A2F] rounded-lg z-20 sm:w-[500px] w-screen sm:h-[550px] h-screen">
      <IoMdClose
        size={30}
        onClick={onClose}
        className="xs:mt-2 mt-1 ml-2 hover:bg-gray-800 bg-opacity-5 rounded-full cursor-pointer"
      />
      <dir className="w-2/3 mx-auto">
        <div className="xs:text-5xl text-center font-semibold xs:mb-2 mb-1 select-none text-3xl">
          <span className="xs:text-5xl text-center font-semi-bold text-[#6541F5] font-bold text-3xl">
            Q
          </span>
          uiz
          <span className="xs:text-5xl text-center font-semi-bold font-bold text-orange-500 text-3xl">
            A
          </span>
          rena
        </div>
        <h1 className="xs:text-4xl text-center mt-1 font-semibold text-2xl">
          Connexion
        </h1>
        <form onSubmit={handleSubmit} className="xs:mt-3 mt-1">
          <label htmlFor="email" className="text-sm">
            Email :
          </label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            className="w-full p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-3"
            placeholder="exemple@gmail.com"
            value={data.email}
            onChange={handleInput}
            required
          />
          {!isEmailValid && (
            <p className="text-red-500 text-xs mb-2">Entrez un email valide.</p>
          )}
          <label htmlFor="password" className="text-sm">
            Mot de passe :
          </label>
          <br />
          <div className="flex w-full p-2 rounded bg-[#D9D9D9] opacity-50 text-black mb-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="bg-transparent flex-1 outline-none"
              placeholder="•••••••••••••"
              value={data.password}
              onChange={handleInput}
              required
            />
            {showPassword ? (
              <AiOutlineEye
                size={30}
                className="p-1 cursor-pointer"
                onClick={() =>
                  setShowPassword((prevShowPasswords) => !prevShowPasswords)
                }
              />
            ) : (
              <AiOutlineEyeInvisible
                size={30}
                className="p-1 cursor-pointer"
                onClick={() =>
                  setShowPassword((prevShowPasswords) => !prevShowPasswords)
                }
              />
            )}
          </div>
          {!isPasswordValid && (
            <p className="text-red-500 text-xs mb-2">
              Le mot de passe doit comporter 8 caracteres au minimum.
            </p>
          )}
          <p className="text-sm text-[#6541F5] hover:underline cursor-pointer w-fit mb-3">
            Mot de passe oublié?
          </p>
          {error && (
            <p className="text-red-500 text-xs text-center animate-shake">
              {error}
            </p>
          )}
          <button
            className="rounded-lg bg-[#6541F5] w-44 h-12 hover:bg-[#886df3] duration-300 block text-xl mx-auto"
            type="submit"
          >
            {!loginDisabled ? (
              <span className="whitespace-nowrap">Se connecter</span>
            ) : (
              <ImSpinner9 size={20} className="animate-spin mx-auto" />
            )}
          </button>
        </form>
        <div className="flex items-center my-2">
          <hr className="w-1/2 border border-gray-500" />
          <span className="mx-1 clear-start text-gray-500">OU</span>
          <hr className="w-1/2 border border-gray-500" />
        </div>
        <p className="mb-2 text-center text-base xs:text-xl">
          Se connecter avec Google
        </p>
        <GoogleOauth />
      </dir>
    </div>
  );
}

export default SigninPopup;
