import React, { useEffect, useState } from "react";
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
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

function FlashCardSetListItem({ setName }) {
  const navigator = useNavigate();
  const { language } = useParams();
  const [numberOfCompletedQuestions, setNumberOfCompletedQuestions] =
    useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userDocRef = doc(db, "users", user.uid);
    if (!user[language][setName]) {
      user[language][setName] = {};
    }
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));

    getDoc(userDocRef).then((docSnap) => {
      const userProgressData = docSnap.data();
      let numOfCurrentQuestionFromDb =
        userProgressData[language][setName] &&
        userProgressData[language][setName].currentQuestion;
      // console.log(numOfCurrentQuestionFromDb,setName);
      if (typeof numOfCurrentQuestionFromDb == "number") {
        if (
          numOfCurrentQuestionFromDb !=
            user[language][setName]["currentQuestion"] &&
          user[language][setName]["currentQuestion"] != undefined
        ) {
          setDoc(
            userDocRef,
            {
              [language]: {
                //I have to increase currentQuestion here because i used it as an index for the set array
                [setName]: {
                  currentQuestion: user[language][setName]["currentQuestion"],
                },
              },
            },
            { merge: true }
          );

          numOfCurrentQuestionFromDb =
            user[language][setName]["currentQuestion"];
        }
        // console.log(
        //   numOfCurrentQuestionFromDb,
        //   user[language][setName]["currentQuestion"]
        // );
        user[language][setName]["currentQuestion"] = numOfCurrentQuestionFromDb;
        localStorage.setItem("user", JSON.stringify(user));
      }

      let numOfCorrectQuestionsFromDb =
        userProgressData[language][setName] &&
        userProgressData[language][setName].correctQuestions;
      console.log(numOfCorrectQuestionsFromDb);
      if (typeof numOfCorrectQuestionsFromDb == "number") {
        if (typeof user[language][setName].correctQuestions == "number") {
          if (
            numOfCorrectQuestionsFromDb !=
            user[language][setName].correctQuestions
          ) {
            setDoc(
              userDocRef,
              {
                [language]: {
                  [setName]: {
                    correctQuestions:
                      user[language][setName]["correctQuestions"],
                  },
                },
              },
              { merge: true }
            );
          }
          
          setNumberOfCompletedQuestions(
            (curr) => user[language][setName].correctQuestions
          );
        }

        // setDoc(
        //   userDocRef,
        //   {
        //     [language]: {
        //       //I have to increase currentQuestion here because i used it as an index for the set array
        //       [setName]: {
        //         correctQuestions: user[language][setName]["correctQuestions"],
        //       },
        //     },
        //   },
        //   { merge: true }
        // );
      } else {
        if (typeof user[language][setName].correctQuestions == "number") {
          setDoc(
            userDocRef,
            {
              [language]: {
                [setName]: {
                  correctQuestions: user[language][setName]["correctQuestions"],
                },
              },
            },
            { merge: true }
          );
        }
      }

      if (numOfCurrentQuestionFromDb == 0) {
        setDoc(
          userDocRef,
          {
            [language]: {
              [setName]: {
                bestScore: user[language][setName]["correctQuestions"],
              },
            },
          },
          { merge: true }
        );
        user[language][setName]["correctQuestions"] = 0;
        localStorage.setItem("user", JSON.stringify(user));
      }
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
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Staatliches",
              wordWrap: "break-word",
            }}
          >
            {setName}
          </Typography>

          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              color="success"
              variant="determinate"
              size={50}
              value={numberOfCompletedQuestions}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                fontFamily={"Staatliches"}
              >
                {numberOfCompletedQuestions + `/100`}
              </Typography>
            </Box>
          </Box>
        </Stack>

        <Typography
          variant="body2"
          sx={{ fontFamily: "Staatliches", color: "text.secondary" }}
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
