import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { Home, CreateQuiz, AddQuestions,QuizValidation} from "./pages";
=======
import { Home, CreateQuiz, AddQuestions, QuestionsDisplay } from "./pages";
>>>>>>> 045ce090a7206e3803cfbee5394cc16fd8a43f60
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
<<<<<<< HEAD
        <Route path="/addQuestions" element={<AddQuestions />}/>
        <Route path="/quizValidation" element={<QuizValidation />} />
=======
        <Route path="/questions" element={<QuestionsDisplay />} />
        <Route path="/addQuestions" element={<AddQuestions />} />
>>>>>>> 045ce090a7206e3803cfbee5394cc16fd8a43f60
      </Routes>
    </Router>
  );
}

export default App;
