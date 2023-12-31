import { createTheme } from "@mui/material";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LanguageList from "./pages/LanguageList";
import Layout from "./components/Layout";
import Error from "./components/Error";
import FlashCardSetList from "./pages/FlashCardSetList";
import FlashCardQuiz from "./pages/FlashCardQuiz";
import AdminPanel from "./pages/AdminPanel";
import AdminPanelAddSet from "./pages/AdminPanelAddSet";
import AdminPanelAddQuestion from "./pages/AdminPanelAddQuestion";
import AdminPanelAddSpecialChars from "./pages/AdminPanelAddSpecialChars";
import Login from "./pages/Login";
import { useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  
  console.log(user);
  /////////////////implement context for is admin
  if (isAdmin == false && user) {
    setIsAdmin(true);
  }
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login setIsAdmin={setIsAdmin}/>} />
            <Route path="/languagelist" element={<LanguageList />} />
            <Route
              path="/languagelist/:language"
              element={<FlashCardSetList />}
            />
            <Route
              path="/languagelist/:language/:flashCardSetName"
              element={<FlashCardQuiz />}
            />
            {isAdmin ? (
              <>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/admin/:language" element={<AdminPanelAddSet />} />
                <Route
                  path="/admin/:language/specialchars"
                  element={<AdminPanelAddSpecialChars />}
                />
                <Route
                  path="/admin/:language/:set"
                  element={<AdminPanelAddQuestion />}
                />
              </>
            ) : (
              <></>
            )}
            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
