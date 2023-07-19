import { createTheme } from "@mui/material";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import InformationSection from "./components/InformationSection";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <HeroSection />
      <InformationSection/>
    </ThemeProvider>
  );
}

export default App;
