import React from "react";
import "./HeroSection.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigator = useNavigate()
  function onStartLearningButtonCLickHandler() {
    navigator('/mvc');
  }

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
        }}
        onClick={onStartLearningButtonCLickHandler}
      >Start learning</Button>
    </div>
  );
}
