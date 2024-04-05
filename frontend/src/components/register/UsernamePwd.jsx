import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

function UsernamePwd({ email, onClose }) {
  const { registerUser } = useAuth();
  const [data, setData] = useState({
    password: "",
    username: "",
    country: "France",
  });
  const countries = [
    "France",
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "Algeria",
    "Japan",
    "India",
    "China",
  ];

  const [isPasswordValid, setPasswordValidity] = useState(true);
  const [pwdmatch, setPwdMatch] = useState(true);
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitDiabled, setSubmitDiabled] = useState(false);

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitDiabled(true);
    setError("");
    if (!data.password) {
      setSubmitDiabled(false);
      return;
    }
    if (data.password.length < 8) {
      setPasswordValidity(false);
      setSubmitDiabled(false);
      return;
    }
    setPasswordValidity(true);
    if (data.password !== password2) {
      setPwdMatch(false);
      setSubmitDiabled(false);
      return;
    }
    setPwdMatch(true);
    try {
      await registerUser({ ...data, email });
      onClose();
    } catch (err) {
      setSubmitDiabled(false);
      setError(err.response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username" className="text-sm">
        Username :
      </label>
      <br />
      <input
        type="text"
        id="username"
        name="username"
        className="w-full px-3 py-2 rounded bg-[#D9D9D9] opacity-50 text-black mb-2"
        placeholder="Username"
        value={data.username}
        onChange={handleInput}
        required
      />
      <label htmlFor="country" className="text-sm">
        Country :
      </label>
      <select
        id="country"
        name="country"
        className="w-full px-3 py-2 rounded bg-[#D9D9D9] opacity-50 text-black mb-2"
        value={data.country}
        onChange={handleInput}
        required
      >
        {countries.map((country) => (
          <option className="bg-[#1A1A2F]">{country}</option>
        ))}
      </select>
      <label htmlFor="password" className="text-sm">
        Mot de passe :
      </label>
      <br />
      <div className="flex w-full px-2 py-1 rounded bg-[#D9D9D9] opacity-50 text-black mb-2">
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
      <label htmlFor="password2" className="text-sm">
        Confirmer mot de passe :
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id="password2"
        name="password2"
        className="w-full p-2 rounded bg-[#D9D9D9] opacity-50 text-black mb-4"
        placeholder="•••••••••••••"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        required
        autoComplete="off"
      />
      {!pwdmatch && (
        <p className="text-red-500 text-xs text-center">
          Les deux mots de passe ne sont pas identiques.
        </p>
      )}
      {error && (
        <p className="text-red-500 text-xs text-center animate-shake">
          {error}
        </p>
      )}

      <button
        className="rounded-lg bg-[#6541F5] px-6 py-2 hover:bg-[#886df3] duration-300 block text-xl mx-auto"
        type="submit"
        disabled={submitDiabled}
      >
        Valider
      </button>
    </form>
  );
}

export default UsernamePwd;
