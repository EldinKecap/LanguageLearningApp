import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import IconButtonWithLabel from "../components/IconButtonWithLabel";
import { Add } from "@mui/icons-material";

function addQuestionFormReducer(state, action) {}

export default function AdminPanelAddQuestion() {
  const { set, language } = useParams();
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const [errorState, dispatch] = useReducer(first, {
    questionError: false,
    answerError: false,
  });

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
          <TextField placeholder="Question" />
          <TextField placeholder="Answer" />
          <Button
            variant="contained"
            sx={{ fontFamily: "Staatliches" }}
            className="gradientButton"
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
