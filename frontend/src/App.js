import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  CreateQuiz,
  AddQuestions,
  QuestionsDisplay,
  Lobby,
  GetReady,
  QuizValidation,
} from "./pages";

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
        <Route path="/:id/questions" element={<QuestionsDisplay />} />
        <Route path="/addQuestions" element={<AddQuestions />} />
        <Route path="/:id/lobby" element={<Lobby />} />
        <Route path="/:id/getReady" element={<GetReady />} />
        <Route path="/addQuestions" element={<AddQuestions />} />
        <Route path="/QuizValidation" element={<QuizValidation />} />
        <Route path="/questions" element={<QuestionsDisplay />} />
        <Route path="/addQuestions" element={<AddQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;
