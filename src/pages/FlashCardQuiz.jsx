import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlashCard from "../components/FlashCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase/firebase";
import { CircularProgress, Stack } from "@mui/material";

export default function FlashCardQuiz() {
  const { language, flashCardSetName } = useParams();
  const [currentFlashCardSet, setCurrentFlashCardSet] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const languagesRef = collection(db, "languages");
    const languageQuery = query(languagesRef, where("name", "==", language));

    getDocs(languageQuery).then((languageSnapshot) => {
      // i used index [0] at the end to get rid of an outer array of map
      const flashCardSets = languageSnapshot.docs.map(
        (doc) => doc.data().flashCardSets
      )[0];

      const flashCardSet = flashCardSets.filter(
        (set) => set.name == flashCardSetName
      )[0].set;

      console.log(flashCardSet);
      setCurrentFlashCardSet((curr) => flashCardSet);
    });
  }, []);

  return currentFlashCardSet.length > 0 ? (
    <FlashCard
      flashCardAnswer={currentFlashCardSet[currentQuestion].flashCardAnswer}
      flashCardQuestion={currentFlashCardSet[currentQuestion].flashCardQuestion}
      completion={completion}
      nextQuestion={() => {
        setCurrentQuestion((curr) =>
          curr != currentFlashCardSet.length - 1 ? curr + 1 : curr
        );

        setCompletion(
          ((currentQuestion + 1) / currentFlashCardSet.length) * 100
        );
      }}
      numberOfQuestions={currentFlashCardSet.length}
      currentQuestionNumber={currentQuestion}
    />
  ) : (
    <Stack height="100vh" alignItems={"center"} justifyContent={"center"}>
      <CircularProgress disableShrink color="success" />
    </Stack>
  );
}
