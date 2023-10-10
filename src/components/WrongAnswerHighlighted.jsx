import { Typography } from "@mui/material";
import React from "react";

export default function WrongAnswerHighlighted({ answer, userInput }) {
  const answerSplitInCharacters = answer.split('');
  const userInputSplitInCharacters = userInput.split('');

  return (
    <>
      {answerSplitInCharacters.map((char, index) => {
        console.log(index, char,userInputSplitInCharacters[index]);
        if (userInputSplitInCharacters[index] == char) {
          return (
            <Typography variant="body1" sx={{ color: "green" , fontWeight:600}}>
              {char}
            </Typography>
          );
        } else {
          return (
            <Typography variant="body1" sx={{ color: "red", fontWeight:600 }}>
              {char}
            </Typography>
          );
        }
      })}
    </>
  );
}
