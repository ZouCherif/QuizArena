import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import GoogleOauth from "./GoogleOauth";
import { createUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SigninPopup({ onClose }) {
  const { setToken } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setEmailValidity] = useState(true);
  const [isPasswordValid, setPasswordValidity] = useState(true);
  const [pwdmatch, setPwdMatch] = useState(true);
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
    if (data.password !== password2) {
      setPwdMatch(false);
      return;
    }
    setPwdMatch(true);
    try {
      const response = await createUser(data);
      setToken(response.infoToken);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1A1A2F] rounded-lg z-20 sm:w-[500px] w-screen sm:h-[600px] h-screen">
      <IoMdClose
        size={30}
        onClick={onClose}
        className="mt-2 ml-2 hover:bg-gray-800 bg-opacity-5 rounded-full cursor-pointer"
      />
      <dir className="w-2/3 mx-auto">
        <h1 className="text-4xl text-center font-semibold">S'inscrire</h1>
        <form onSubmit={handleSubmit} className="mt-2">
          <label htmlFor="usernmae">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            className="w-full p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
            placeholder="Username"
            value={data.username}
            onChange={handleInput}
            required
          />
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
          <div className="flex w-full p-2 rounded bg-[#D9D9D9] opacity-50 text-black">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="bg-transparent flex-1 outline-none"
              placeholder="•••••••••••••"
              value={data.password}
              onChange={handleInput}
              required
              autoComplete="off"
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
            <p className="text-red-500 text-xs mb-1">
              Le mot de passe doit comporter 8 caracteres au minimum.
            </p>
          )}
          <label htmlFor="password2">Confirmer mot de passe:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password2"
            name="password2"
            className="w-full p-2 rounded bg-[#D9D9D9] opacity-50 text-black"
            placeholder="•••••••••••••"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            autoComplete="off"
          />
          {!pwdmatch && (
            <p className="text-red-500 text-xs">
              Les deux mots de passe ne sont pas identiques.
            </p>
          )}
          <p className="text-sm text-[#6541F5] hover:underline cursor-pointer w-fit mb-4">
            Mot de passe oublié?
          </p>
          {error && (
            <p className="text-red-500 text-xs text-center animate-shake">
              {error}
            </p>
          )}
          <button
            className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 block text-xl mx-auto"
            type="submit"
          >
            S'inscrire
          </button>
        </form>
        <div className="flex items-center my-1">
          <hr className="w-1/2 border border-gray-500" />
          <span className="mx-1 clear-start text-gray-500">OU</span>
          <hr className="w-1/2 border border-gray-500" />
        </div>
        <p className="mb-1 text-center">S'inscrire avec Google</p>
        <GoogleOauth />
      </dir>
    </div>
  );
}

export default SigninPopup;
