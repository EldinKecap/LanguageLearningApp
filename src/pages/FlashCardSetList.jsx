import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import db from "../firebase/firebase";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ProgressWithLabel from "../components/ProgressWithLabel";

function FlashCardSetListItem({ setName }) {
  const navigator = useNavigate();
  const { language } = useParams();
  const [numberOfCurrentQuestion, setNumberOfCurrentQuestion] = useState(0);
  const [numberOfCorrectQuestions, setNumberOfCorrectQuestions] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userDocRef = doc(db, "users", user.uid);
    // SETTING LOCAL SET TRACKING VALUE
    if (!user[language][setName]) {
      user[language][setName] = {
        currentQuestion: 0,
        correctQuestions: 0,
        bestScore: 0,
        completed: false,
      };
    }

    localStorage.setItem("user", JSON.stringify(user));

    getDoc(userDocRef).then((docSnap) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userProgressData = docSnap.data();
      // console.log(userProgressData);

      // CHECKING TO SEE IF PROGRESS DATA IS SAVED IN FB
      // BY SEEING IF THE LANGUAGE HAS THAT PROPERTY

      const progressDataSaved = Object.keys(
        userProgressData[language]
      ).includes(setName);

      if (!progressDataSaved) {
        setDoc(
          userDocRef,
          {
            [language]: {
              [setName]: user[language][setName],
            },
          },
          { merge: true }
        );
      }

      //CHEKING IF THE DATA IS THE SAME IN THE LANGUAGE LOCALLY AND IN FB

      const languageProgressDataFromDb = userProgressData[language][setName];
      const languageProgressDataLocal = user[language][setName];

      // CHEKING THE CURRENT QUESTION TRACKING

      if (
        languageProgressDataLocal.currentQuestion >
          languageProgressDataFromDb.currentQuestion &&
        !languageProgressDataLocal.completed
      ) {
        userProgressData[language][setName].currentQuestion =
          languageProgressDataLocal.currentQuestion;
      } else {
        userProgressData[language][setName].currentQuestion = 0;
      }

      //DISPLAYING THE CURRENT QUESTION NUMBER

      setNumberOfCurrentQuestion(
        (curr) => languageProgressDataLocal.currentQuestion
      );

      // CHECKING THE CORRECT QUESTIONS TRACKING

      if (
        languageProgressDataLocal.correctQuestions >
          languageProgressDataFromDb.correctQuestions &&
        !languageProgressDataLocal.completed
      ) {
        userProgressData[language][setName].correctQuestions =
          languageProgressDataLocal.correctQuestions;
      }

      // DISPLAYING THE CORRECT QUESTIONS NUMBER

      setNumberOfCorrectQuestions(
        (curr) => languageProgressDataLocal.correctQuestions
      );

      // CHECKING BEST SCORE AND RESETING VALUES
      if (languageProgressDataLocal.completed) {
        if (
          languageProgressDataLocal.correctQuestions >
          languageProgressDataLocal.bestScore
        ) {
          languageProgressDataLocal.bestScore =
            languageProgressDataLocal.correctQuestions;
        }

        userProgressData[language][setName].bestScore =
          languageProgressDataLocal.bestScore;

        languageProgressDataLocal.currentQuestion = 0;
        languageProgressDataLocal.correctQuestions = 0;
        userProgressData[language][setName].currentQuestion = 0;
        userProgressData[language][setName].correctQuestions = 0;

        user[language][setName].completed = false;

        // console.log(languageProgressDataLocal);
      }

      // SETTING BEST SCORE
      console.log(user[language], setName);
      setBestScore((curr) => languageProgressDataLocal.bestScore);

      localStorage.setItem("user", JSON.stringify(user));
      // console.log(userProgressData, user);
      setDoc(userDocRef, userProgressData, { merge: true });
    });
  }, []);

  function onButtonClickHandler(relPath) {
    const user = JSON.parse(localStorage.getItem("user"));
    const userDocRef = doc(db, "users", user.uid);

    getDoc(userDocRef).then((docSnap) => {
      const userProgressData = docSnap.data();
      console.log(userProgressData);
      const userProgressLanguage = userProgressData[language];
      if (Object.keys(userProgressLanguage).includes(setName)) {
        navigator(relPath);
      } else {
        setDoc(
          userDocRef,
          {
            [language]: { [setName]: {} },
          },
          { merge: true }
        );
        navigator(relPath);
      }
    });
  }

  return (
    <Card
      key={setName}
      sx={{
        minWidth: "250px",
        maxWidth: "350px",
        maxHeight: "400px",
      }}
    >
      <CardContent>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={1}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Staatliches",
              wordWrap: "break-word",
            }}
          >
            {setName}
          </Typography>
          <Stack direction={"row"}>
            <ProgressWithLabel
              progressValue={numberOfCorrectQuestions}
              label={"correct"}
              color={"success"}
            />
            <ProgressWithLabel
              progressValue={numberOfCurrentQuestion}
              label={"current"}
              color={"info"}
            />
            <ProgressWithLabel
              progressValue={bestScore}
              label={"best"}
              color={"warning"}
            />
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          sx={{ fontFamily: "Staatliches", color: "text.secondary", mt: 3 }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, quam!
        </Typography>
        <CardActions sx={{ justifyContent: "end", mt: "auto" }}>
          <Button
            variant="contained"
            className="gradientButton buttonHover"
            onClick={() => onButtonClickHandler(setName)}
            sx={{ fontFamily: "Staatliches" }}
          >
            Start
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default function FlashCardSetList() {
  const { language } = useParams();
  const [flashCardSetNames, setFlashCardSetNames] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    const languagesRef = collection(db, "languages");
    const languageQuery = query(languagesRef, where("name", "==", language));

    getDocs(languageQuery).then((languageSnapshot) => {
      // i used index [0] at the end to get rid of an outer array of map
      const flashCardSets = languageSnapshot.docs.map(
        (doc) => doc.data().flashCardSets
      )[0];
      if (flashCardSets) {
        const flashCardSetNamesArray = flashCardSets.map(
          (flashCardSet) => flashCardSet.name
        );
        setFlashCardSetNames(flashCardSetNamesArray);
      }

      setShowLoading(false);
    });
  }, []);

  return (
    <>
      <Title title={language} />
      <Typography
        variant="body1"
        align="center"
        sx={{ fontFamily: "Staatliches", color: "text.secondary" }}
      >
        Pick a flash card set
      </Typography>
      <Stack
        gap={3}
        p={2}
        direction="row"
        flexWrap="wrap"
        justifyContent={"center"}
      >
        {showLoading ? (
          <CircularProgress color="success" disableShrink />
        ) : flashCardSetNames.length > 0 ? (
          flashCardSetNames.map((setName) => {
            return <FlashCardSetListItem key={setName} setName={setName} />;
          })
        ) : (
          <Typography
            variant="h3"
            sx={{ color: "GrayText", fontFamily: "Staatliches" }}
          >
            No Flash Card Sets
          </Typography>
        )}
      </Stack>
    </>
  );
}
