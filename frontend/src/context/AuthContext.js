import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [infoToken, setAccessToken] = useState(null);

  const setToken = (token) => {
    setAccessToken(token);
  };

  return (
    <AuthContext.Provider value={{ infoToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
