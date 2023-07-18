import { createTheme } from "@mui/material";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <HeroSection/>
    </ThemeProvider>
  );
}

export default App;
