import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import IconButtonWithLabel from "../components/IconButtonWithLabel";
import { Add } from "@mui/icons-material";

export default function AdminPanelAddQuestion() {
  const { set, language } = useParams();
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
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
          <Button variant="contained" className="gradientButton">
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
