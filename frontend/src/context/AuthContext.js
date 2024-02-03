import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [infoToken, setAccessToken] = useState(null);

  const setToken = useCallback((token) => {
    setAccessToken(token);
  }, []);
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

  useEffect(() => {
    if (!infoToken) {
      const savedToken = getCookieValue();
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, [infoToken, setToken]);

  return (
    <AuthContext.Provider value={{ infoToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
