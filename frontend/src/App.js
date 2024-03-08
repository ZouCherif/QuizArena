import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import {
  Home,
  CreateQuiz,
  AddQuestions,
  QuestionsDisplay,
  Lobby,
  GetReady,
} from "./pages";
=======

import { Home, CreateQuiz, AddQuestions, QuestionsDisplay ,QuizValidation} from "./pages";

>>>>>>> 37581abbf14dd41be657c475d40c1b2633666b26
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
        <Route path="/:id/questions" element={<QuestionsDisplay />} />
        <Route path="/addQuestions" element={<AddQuestions />} />
        <Route path="/:id/lobby" element={<Lobby />} />
        <Route path="/:id/getReady" element={<GetReady />} />
=======
        <Route path="/addQuestions" element={<AddQuestions />}/>
        <Route path="/QuizValidation" element={<QuizValidation />} />
        <Route path="/questions" element={<QuestionsDisplay />} />
        <Route path="/addQuestions" element={<AddQuestions />} />

>>>>>>> 37581abbf14dd41be657c475d40c1b2633666b26
      </Routes>
    </Router>
  );
}

export default App;
