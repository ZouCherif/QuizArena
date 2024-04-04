import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  CreateQuiz,
  AddQuestions,
  QuestionsDisplay,
  Lobby,
  GetReady,
  QuizValidation,
  Join,
  Ranking
} from "./pages";
import RequireAuth from "./components/RequireAuth";
import RankPage from "./components/RankPage";

import { GoogleOAuthProvider } from "@react-oauth/google";
import RankingPage from "./components/RankPage";

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
        {/* <Route element={<RequireAuth />}> */}
          <Route path="/createQuiz" element={<CreateQuiz />} />
          <Route path="/addQuestions" element={<AddQuestions />} />
          <Route path="/session" >
            <Route path=":id/questions" element={<QuestionsDisplay />} />
            <Route path=":id/lobby" element={<Lobby />} />
            <Route path=":id/getReady" element={<GetReady />} />
            <Route path=":id/join" element={<Join />} />
          </Route>
          <Route path="/addQuestions" element={<AddQuestions />} />
          <Route path="/QuizValidation" element={<QuizValidation />} />
          <Route path="/questions" element={<QuestionsDisplay />} />
          <Route path="/addQuestions" element={<AddQuestions />} />
          <Route element={<RankPage/>}>
            <Route path="/Ranking" element={<Ranking/>}/>
          </Route>
          

        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
