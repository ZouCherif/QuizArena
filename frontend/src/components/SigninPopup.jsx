import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {login} from "../utils/api";
import GoogleOauth from "./GoogleOauth";
import {useNavigate} from "react-router-dom";

function SigninPopup({ onClose }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setEmailValidity] = useState(true);
  const [isPasswordValid, setPasswordValidity] = useState(true);
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
    try {
      const response = await login(data);
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1A1A2F] rounded-lg z-20 sm:w-[500px] w-screen sm:h-[550px] h-screen">
      <IoMdClose
        size={30}
        onClick={onClose}
        className="mt-2 ml-2 hover:bg-gray-800 bg-opacity-5 rounded-full cursor-pointer"
      />
      <dir className="w-2/3 mx-auto">
        <h1 className="text-4xl text-center mt-2 font-semibold">
          Se Connecter
        </h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            className="w-full p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
            placeholder="exemple@gmail.com"
            value={data.email}
            onChange={handleInput}
            required
          />
          {!isEmailValid && (
            <p className="text-red-500 text-xs mb-2">Entrez un email valide.</p>
          )}
          <label htmlFor="password">Mot de passe:</label>
          <br />
          <div className="flex w-full p-2 rounded bg-[#D9D9D9] opacity-50 text-black mb-2">
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
          <p className="text-sm text-[#6541F5] hover:underline cursor-pointer w-fit mb-10">
            Mot de passe oublié?
          </p>
          <button
            className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 block text-xl mx-auto"
            type="submit"
          >
            Se connecter
          </button>
        </form>
        <div className="flex items-center my-2">
          <hr className="w-1/2 border border-gray-500" />
          <span className="mx-1 clear-start text-gray-500">OU</span>
          <hr className="w-1/2 border border-gray-500" />
        </div>
        <p className="mb-2 text-center">Se connecter avec Google</p>
        <GoogleOauth />
      </dir>
    </div>
  );
}

export default SigninPopup;
