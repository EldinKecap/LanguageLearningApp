import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import IconButtonWithLabel from "../components/IconButtonWithLabel";
import { Add } from "@mui/icons-material";

function addQuestionFormReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "question_empty": {
      return {
        ...state,
        answerError: state.answerError,
        questionError: true,
        questionErrorMessage: "Question must not be empty",
      };
    }
    case "answer_empty": {
      return {
        ...state,
        questionError: state.questionError,
        answerError: true,
        answerErrorMessage: "Answer must not be empty",
      };
    }
    case "question_correct": {
      return {
        ...state,
        answerError: state.answerError,
        questionError: false,
        questionErrorMessage: "",
      };
    }
    case "answer_correct": {
      return {
        ...state,
        questionError: state.questionError,
        answerError: false,
        answerErrorMessage: "",
      };
    }
  }
}

export default function AdminPanelAddQuestion() {
  const { set, language } = useParams();
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const addQuestionRef = useRef();
  const addAnswerRef = useRef();

  const [formErrorState, dispatch] = useReducer(addQuestionFormReducer, {
    questionError: false,
    answerError: false,
  });

  function onAddQuestionHandler(event) {
    const question = addQuestionRef.current.value.trim();
    const answer = addAnswerRef.current.value.trim();

    if (question.length == 0) {
      dispatch({ type: "question_empty" });
    } else {
      dispatch({ type: "question_correct" });
    }
    if (
      addAnswerRef.current === document.activeElement ||
      event.type == "click"
    ) {
      console.log("answer in focus");
      if (answer.length == 0) {
        dispatch({ type: "answer_empty" });
      } else {
        dispatch({ type: "answer_correct" });
      }
    }
    console.log(event.type);
  }

  return (
    <>
      <Typography
        variant="h2"
        textAlign={"center"}
        color={"white"}
        sx={{ mt: 10, fontFamily: "Staatliches" }}
      >
        {language}
      </Typography>
      <Typography
        variant="h5"
        textAlign={"center"}
        color={"white"}
        sx={{ fontFamily: "Staatliches", color: "text.secondary" }}
      >
        {set}
      </Typography>
      {showAddQuestionForm ? (
        <Stack alignItems={"center"} gap={2} mt={2}>
          <TextField
            label="Enter Question"
            inputRef={addQuestionRef}
            error={formErrorState.questionError}
            onKeyUp={onAddQuestionHandler}
          />
          <Typography
            variant="body2"
            sx={{ fontFamily: "Staatliches", color: "text.secondary" }}
          >
            {formErrorState.questionErrorMessage
              ? formErrorState.questionErrorMessage
              : ""}
          </Typography>
          <TextField
            label="Enter Answer"
            inputRef={addAnswerRef}
            error={formErrorState.answerError}
            onKeyUp={onAddQuestionHandler}
          />
          <Typography
            variant="body2"
            sx={{ fontFamily: "Staatliches", color: "text.secondary" }}
          >
            {formErrorState.answerErrorMessage
              ? formErrorState.answerErrorMessage
              : ""}
          </Typography>
          <Button
            variant="contained"
            sx={{ fontFamily: "Staatliches" }}
            className="gradientButton"
            onClick={onAddQuestionHandler}
          >
            Submit
          </Button>
        </Stack>
      ) : (
        <IconButtonWithLabel
          label={"Add Question"}
          onClickHandler={() => {
            setShowAddQuestionForm((curr) => true);
          }}
          icon={<Add />}
        />
      )}
    </>
  );
}
