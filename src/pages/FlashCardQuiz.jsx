import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlashCard from "../components/FlashCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase/firebase";
import { CircularProgress, Stack } from "@mui/material";
import { getAuth } from "firebase/auth";

export default function FlashCardQuiz() {
  const { language, flashCardSetName } = useParams();
  const [currentFlashCardSet, setCurrentFlashCardSet] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completion, setCompletion] = useState(0);
  const [specialCharacters, setSpecialCharacters] = useState([]);
  useEffect(() => {
    // i get auth here to stop the error that happens when reloading the quiz and auth needs to be confirmed before request is sent to firebase
    getAuth();
    /////////////////////////
    const languagesRef = collection(db, "languages");
    const languageQuery = query(languagesRef, where("name", "==", language));

    getDocs(languageQuery).then((languageSnapshot) => {
      // i used index [0] at the end to get rid of an outer array of map
      const flashCardSets = languageSnapshot.docs.map((doc) => {
        setSpecialCharacters((curr) => doc.data().specialCharacters);
        return doc.data().flashCardSets;
      })[0];

      const flashCardSet = flashCardSets.filter(
        (set) => set.name == flashCardSetName
      )[0].set;
      //populating the array of flashcards
      const startingSetLenght = flashCardSet.length;
      for (let i = 0; i < 100 - startingSetLenght; i++) {
        flashCardSet.push(flashCardSet[i]);
      }

      //randomizing flashcard array

      const randomizedFlashCardSet = flashCardSet
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      setCurrentFlashCardSet((curr) => randomizedFlashCardSet);
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
      specialCharacters={specialCharacters}
    />
  ) : (
    <Stack height="100vh" alignItems={"center"} justifyContent={"center"}>
      <CircularProgress disableShrink color="success" />
    </Stack>
  );
}
