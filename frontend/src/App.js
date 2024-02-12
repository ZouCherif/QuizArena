import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, CreateQuiz, AddQuestions } from "./pages";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
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
        <Route path="/createQuiz" element={<CreateQuiz />} />
        <Route path="/addQuestions" element={<AddQuestions />}/>
      </Routes>
    </Router>
  );
}

export default App;
