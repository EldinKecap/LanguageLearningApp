import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButtonWithLabel from "../components/IconButtonWithLabel";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import db from "../firebase/firebase";

function addQuestionFormReducer(state, action) {
  // console.log(state, action);
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

function QuestionCard({ question }) {
  return (
    <Card sx={{ minWidth: 250 }}>
      <CardContent>
        <Stack>
          <Typography
            sx={{
              fontFamily: "Staatliches",
              color: "text.secondary",
              fontSize: "1rem",
            }}
          >
            {"Question: "}{" "}
            <Typography fontSize={"1.3rem"}>
              {question.flashCardQuestion}
            </Typography>
          </Typography>
          <Typography
            sx={{
              fontFamily: "Staatliches",
              color: "text.secondary",
              fontSize: "1rem",
            }}
          >
            {"Answer: "}
            <Typography fontSize={"1.3rem"}>
              {question.flashCardAnswer}
            </Typography>
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <IconButtonWithLabel label={"Edit"} icon={<Edit />} />
        <IconButtonWithLabel label={"Delete"} icon={<Delete />} />
      </CardActions>
    </Card>
  );
}

export default function AdminPanelAddQuestion() {
  const navigator = useNavigate();
  const { set, language } = useParams();
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const [questions, setQuestions] = useState([]);

  const addQuestionRef = useRef();
  const addAnswerRef = useRef();

  const [formErrorState, dispatch] = useReducer(addQuestionFormReducer, {
    questionError: false,
    answerError: false,
  });

  useEffect(() => {
    const languagesCollection = collection(db, "languages");
    getDocs(languagesCollection).then((languagesSnapshot) => {
      const arrOfLanguages = languagesSnapshot.docs.map((doc) => doc.data());
      const languageWithSets = arrOfLanguages.filter(
        (val) => val.name == language
      );
      if (languageWithSets[0].flashCardSets) {
        console.log(languageWithSets);
        let setsWithQuestions = languageWithSets[0].flashCardSets;
        setsWithQuestions = setsWithQuestions.filter(
          (setWithQuestions) => setWithQuestions.name == set
        );
        console.log(setsWithQuestions);
        setQuestions(setsWithQuestions[0].set);
      }
    });
  }, []);

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
      // console.log("answer in focus");
      if (answer.length == 0) {
        dispatch({ type: "answer_empty" });
        return;
      } else {
        dispatch({ type: "answer_correct" });
      }
    }

    if (question.length == 0) {
      return;
    }

    if (event.key == "Enter" || event.type == "click") {
      const q = query(
        collection(db, "languages"),
        where("name", "==", language)
      );
      getDocs(q).then((querySnap) => {
        if (querySnap.size == 1) {
          let languageID = "";
          let languageSets = {};
          querySnap.forEach((doc) => {
            console.log(doc.id, doc.data());
            languageID = doc.id;
            languageSets = doc.data().flashCardSets;
          });
          languageSets.forEach((setInLanguageSets) => {
            console.log(setInLanguageSets.name, set);
            if (setInLanguageSets.name == set) {
              if (setInLanguageSets.set == undefined) {
                setInLanguageSets.set = [
                  {
                    flashCardQuestion: question,
                    flashCardAnswer: answer,
                  },
                ];
              } else {
                setInLanguageSets.set.push({
                  flashCardQuestion: question,
                  flashCardAnswer: answer,
                });
              }
            }
          });
          console.log(languageSets);

          const languageDocRef = doc(db, "languages", languageID);
          console.log(languageSets);
          setDoc(
            languageDocRef,
            {
              flashCardSets: languageSets,
            },
            { merge: true }
          ).then(() => {
            navigator(0);
          });
        }
      });
    }
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
        sx={{ fontFamily: "Staatliches", color: "text.secondary", mb: 3 }}
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
      <Stack
        direction={"row"}
        gap
        flexWrap={"wrap"}
        justifyContent={"center"}
        mt={3}
      >
        {questions && questions.length > 0 ? (
          questions.map((question) => {
            return <QuestionCard question={question} />;
          })
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
}
