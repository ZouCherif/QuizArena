import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  CreateQuiz,
  AddQuestions,
  QuestionsDisplay,
  ArenaAdmin,
  Arena,
  QuizValidation,
  Join,
  Ranking,
  Results,
} from "./pages";
import RequireAuth from "./components/RequireAuth";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { SharedLayout } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            >
              <SharedLayout />
            </GoogleOAuthProvider>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/Ranking" element={<Ranking />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/createQuiz" element={<CreateQuiz />} />
          <Route path="/addQuestions" element={<AddQuestions />} />
          <Route path="session">
            <Route path=":id/questions" element={<QuestionsDisplay />} />
            <Route path=":id/arenaAdmin" element={<ArenaAdmin />} />
            <Route path=":id/arena" element={<Arena />} />
            <Route path=":id/join" element={<Join />} />
            <Route path=":id/results" element={<Results />} />
          </Route>
          <Route path="/addQuestions" element={<AddQuestions />} />
          <Route path="/QuizValidation" element={<QuizValidation />} />
          <Route path="/questions" element={<QuestionsDisplay />} />
          <Route path="/addQuestions" element={<AddQuestions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
