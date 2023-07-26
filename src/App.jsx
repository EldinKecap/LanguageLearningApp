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

let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/languagelist" element={<LanguageList />} />
            <Route
              path="/languagelist/:language"
              element={<FlashCardSetList />}
            />
            <Route
              path="/languagelist/:language/:flashCardSetName"
              element={<FlashCardQuiz />}
            />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
