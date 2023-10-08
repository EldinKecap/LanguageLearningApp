import {
  Box,
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

export default function FlashCard({
  flashCardQuestion,
  flashCardAnswer,
  completion,
  nextQuestion,
  numberOfQuestions,
  currentQuestionNumber,
  specialCharacters,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const answerRef = useRef();
  const navigator = useNavigate();
  console.log(specialCharacters);
  function onShowAnswerClickedHandler() {
    setShowAnswer((curr) => !curr);
  }
  console.log(numberOfQuestions, currentQuestionNumber);
  return (
    <Stack height="100vh">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Logo />
      </Stack>
      <LinearProgress variant="determinate" value={completion} />
      {completion != 100 ? (
        <Stack
          display="row"
          alignItems="Baseline"
          justifyContent="center"
          gap={5}
          sx={{ width: "fit-content", m: "auto" }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Staatliches",
              color: "text.primary",
            }}
          >
            {currentQuestionNumber + 1 + ". " + flashCardQuestion}
          </Typography>
          {showAnswer && (
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Staatliches",
                color: "text.secondary",
              }}
            >
              {flashCardAnswer}
            </Typography>
          )}
          <Stack direction={"row"} justifyContent={"end"} width={"100%"}>
            {specialCharacters ? (
              specialCharacters.map((char) => {
                return (
                  <Button
                    key={char}
                    variant="contained"
                    onClick={() => {
                      answerRef.current.focus();
                      answerRef.current.value += char;
                    }}
                    color="success"
                  >
                    {char}
                  </Button>
                );
              })
            ) : (
              <></>
            )}
          </Stack>
          <TextField
            inputRef={answerRef}
            variant="standard"
            label="Enter answer"
            multiline
            sx={{
              width: "80vw",
              minWidth: "250px",
            }}
          />
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"start"}
            width={"100%"}
          >
            <Stack gap={2}>
              <Button variant="outlined" onClick={onShowAnswerClickedHandler}>
                Show answer
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setShowAnswer(false);
                  nextQuestion();
                }}
              >
                Skip
              </Button>
            </Stack>
            <Button
              variant="contained"
              color="success"
              className="gradientButton buttonHover"
              onClick={() => {
                const answer = answerRef.current.value.trim().toLowerCase();
                if (answer == flashCardAnswer.toLowerCase()) {
                  nextQuestion();
                  setShowAnswer((curr) => false);
                  answerRef.current.value = "";
                } else {
                  setShowAnswer((curr) => true);
                }
              }}
              sx={{
                fontFamily: "Staatliches",
                fontSize: "1.2rem",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack m={"auto"} maxWidth={350} alignItems="center" gap={2}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Staatliches",
              color: "text.primary",
              textAlign: "center",
            }}
          >
            You have completed this set
          </Typography>
          <Button
            variant="contained"
            className="gradientButton buttonHover"
            sx={{ fontFamily: "Staatliches" }}
            onClick={() => {
              navigator(-1);
            }}
          >
            Choose a next set
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
