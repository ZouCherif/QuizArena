import { createContext, useState, useContext, useEffect } from "react";
import { login, logout, createUser } from "../utils/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  const getCookieValue = () => {
    const cookieName = "infoToken=";
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.startsWith(cookieName)) {
        return trimmedCookie.substring(cookieName.length);
      }
    }
    return null;
  };

  const registerUser = async (data) => {
    console.log(data);
    const response = await createUser(data);
    setUser(jwtDecode(response.infoToken).UserInfo);
  };

  const loginUser = async (data) => {
    const response = await login(data);
    setUser(jwtDecode(response.infoToken).UserInfo);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    document.cookie = `infoToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };

  useEffect(() => {
    if (loading && !user) {
      const savedToken = getCookieValue();
      if (savedToken) {
        setUser(jwtDecode(savedToken).UserInfo);
      }
      setLoading(false);
    }
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
