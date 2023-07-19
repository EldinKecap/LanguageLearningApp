import React from "react";
import "./HeroSection.css";
import { Button } from "@mui/material";

export default function HeroSection() {
  return (
    <div className="heroContainer">
      <h1 className="heroTitle">
        The best place to
        <div className="gradientLetters highlightedTitle">Master</div>language
      </h1>
      <Button
        variant="contained"
        size="large"
        className="gradientButton buttonHover"
        sx={{
          mt: 2,
          borderRadius: 50,
          fontFamily: "Staatliches",
          fontSize: "1.5rem"
        }}>Start learning</Button>
    </div>
  );
}
