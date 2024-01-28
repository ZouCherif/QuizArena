import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

function App() {
  const { accessToken, setToken } = useAuth();
  const saveStateToCookie = (accessToken) => {
    document.cookie = `accessToken=${accessToken}`;
  };

  const loadStateFromCookie = () => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "accessToken") {
        return value;
      }
    }
    return null;
  };

  useEffect(() => {
    const accessToken = loadStateFromCookie();
    if (accessToken) {
      setToken(accessToken);
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    const handleBeforeUnload = () => {
      saveStateToCookie(accessToken);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [accessToken, setToken]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            >
              <Home />
            </GoogleOAuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
