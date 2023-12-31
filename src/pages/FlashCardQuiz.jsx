import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlashCard from "../components/FlashCard";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from "../firebase/firebase";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import NavBar from "../components/NavBar";

export default function FlashCardQuiz() {
  const { language, flashCardSetName } = useParams();
  const [currentFlashCardSet, setCurrentFlashCardSet] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completion, setCompletion] = useState(0);
  const [specialCharacters, setSpecialCharacters] = useState([]);
  const [noQuestionsError, setNoQuestionsError] = useState(false);

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
        // console.log(doc.data().flashCardSets);
        return doc.data().flashCardSets;
      })[0];

      let flashCardSet = flashCardSets.filter(
        (set) => set.name == flashCardSetName
      )[0];

      if (flashCardSet.set && flashCardSet.set.length > 0) {
        flashCardSet = flashCardSet.set;
        //populating the array of flashcards
        const startingSetLenght = flashCardSet.length;
        ///////////////////!!!Change the 25 to 100!!!!!!!!!!!!!////////////
        for (let i = 0; i < 100 - startingSetLenght; i++) {
          flashCardSet.push(flashCardSet[i]);
        }

        //randomizing flashcard array

        const randomizedFlashCardSet = flashCardSet
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);

        setCurrentFlashCardSet((curr) => randomizedFlashCardSet);

        const user = JSON.parse(localStorage.getItem("user"));

        if (user[language][flashCardSetName].currentQuestion > 100) {
          user[language][flashCardSetName].currentQuestion = 0;
          localStorage.setItem("user", JSON.stringify(user));
        }

        if (
          user[language][flashCardSetName].currentQuestion &&
          user[language][flashCardSetName].currentQuestion > currentQuestion
        ) {
          setCurrentQuestion(
            (curr) => user[language][flashCardSetName].currentQuestion - 1
          );
        }

      } else {
        setNoQuestionsError(true);
        return;
      }
    });
  }, []);
  

  useEffect(() => {
    if (currentQuestion != 0) {
      setCompletion(
        (curr) => ((currentQuestion + 1) / currentFlashCardSet.length) * 100
      );
    }
    
  }, [currentQuestion]);

  return currentFlashCardSet.length > 0 ? (
    <FlashCard
      flashCardAnswer={currentFlashCardSet[currentQuestion].flashCardAnswer}
      flashCardQuestion={currentFlashCardSet[currentQuestion].flashCardQuestion}
      completion={completion}
      nextQuestion={() => {

        setCurrentQuestion((curr) =>
          curr != currentFlashCardSet.length - 1 ? curr + 1 : curr
        );
        
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(currentQuestion, "currQuestion");

        user[language][flashCardSetName].currentQuestion = currentQuestion + 2;
        if (user[language][flashCardSetName].currentQuestion >= currentFlashCardSet.length) {
          user[language][flashCardSetName].currentQuestion = 0;
          user[language][flashCardSetName].completed = true;
        }

        localStorage.setItem("user", JSON.stringify(user));

        setCompletion(
          (curr) => ((currentQuestion + 1) / currentFlashCardSet.length) * 100
        );
      }}
      numberOfQuestions={currentFlashCardSet.length}
      currentQuestionNumber={currentQuestion}
      specialCharacters={specialCharacters}
    />
  ) : (
    <Stack height="100vh" alignItems={"center"} justifyContent={"center"}>
      <NavBar />
      {noQuestionsError ? (
        <Typography
          variant="h2"
          fontFamily={"Staatliches"}
          color={"text.secondary"}
          align="center"
        >
          No Flash Cards retrieved
        </Typography>
      ) : (
        <CircularProgress disableShrink color="success" />
      )}
    </Stack>
  );
}
