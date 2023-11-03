import { Button, Stack, Typography } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import db from "../firebase/firebase";

export default function FlashCardCompletedScreen({
  language,
  setName,
  numberOfQuestions,
}) {
  const navigator = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const userDocRef = doc(db, "users", user.uid);
    //SAVING USER PROGRESS TO DB

    setDoc(
      userDocRef,
      { [language]: { [setName]: user[language][setName] } },
      { merge: true }
    );
  }, []);

  return (
    <Stack m={"auto"} maxWidth={350} alignItems="center" gap={2}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Staatliches",
          color: "text.primary",
          textAlign: "center",
        }}
      >
        You have completed {setName} set with score
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Staatliches",
          color: "text.primary",
          textAlign: "center",
        }}
      >
        {user[language][setName].correctQuestions + "/" + numberOfQuestions}
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
  );
}
