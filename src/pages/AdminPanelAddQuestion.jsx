import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
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
import { Add, Delete, Edit, Upload } from "@mui/icons-material";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import db from "../firebase/firebase";
import DeleteDialog from "../components/DeleteDialog";

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

function QuestionCard({ question, language, set, questionNumber }) {
  const navigator = useNavigate();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const editQuestionRef = useRef();
  const editAnswerRef = useRef();
  const [formErrorState, dispatch] = useReducer(addQuestionFormReducer, {
    questionError: false,
    answerError: false,
  });

  function onEditQuestionHandler(event) {
    const questionToEdit = editQuestionRef.current.value.trim();
    const answerToEdit = editAnswerRef.current.value.trim();

    if (questionToEdit.length == 0) {
      dispatch({ type: "question_empty" });
    } else {
      dispatch({ type: "question_correct" });
    }

    if (
      editAnswerRef.current === document.activeElement ||
      event.type == "click"
    ) {
      // console.log("answer in focus");
      if (answerToEdit.length == 0) {
        dispatch({ type: "answer_empty" });
        return;
      } else {
        dispatch({ type: "answer_correct" });
      }
    }

    if (questionToEdit.length == 0) {
      return;
    }
    // console.log(questionToEdit);
    // console.log(answerToEdit);
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
            languageID = doc.id;
            languageSets = doc.data().flashCardSets;
          });
          //////////////////////STO OVO LOGGA VEC MODIFIKOVAN ARRAY
          // console.log(languageSets);
          languageSets.forEach((setInLanguageSets) => {
            if (setInLanguageSets.name == set) {
              ////////////// I OVO
              // console.log(setInLanguageSets);
              //////////OVO KOMENTARISAT ZA DEMONSTRACIJU
              setInLanguageSets.set.forEach((questionInSet, index) => {
                if (
                  questionInSet.flashCardQuestion == question.flashCardQuestion
                ) {
                  // console.log(questionInSet);
                  setInLanguageSets.set[index] = {
                    flashCardQuestion: questionToEdit,
                    flashCardAnswer: answerToEdit,
                  };
                }
              });
              //////////////////////
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

  function onDeleteHandler() {
    setOpenDeleteConfirmation(true);
  }

  function handleClose() {
    setOpenDeleteConfirmation(false);
  }

  function deleteFunction() {
    const q = query(collection(db, "languages"), where("name", "==", language));
    getDocs(q).then((querySnap) => {
      if (querySnap.size == 1) {
        let languageID = "";
        let languageSets = {};
        querySnap.forEach((doc) => {
          languageID = doc.id;
          languageSets = doc.data().flashCardSets;
        });
        languageSets.forEach((setInLanguageSets) => {
          if (setInLanguageSets.name == set) {
            setInLanguageSets.set = setInLanguageSets.set.filter((value) => {
              return value.flashCardQuestion != question.flashCardQuestion;
            });
          }
        });
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

  return (
    <Card
      sx={{
        minWidth: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        {showEditForm ? (
          <Stack gap={2}>
            <TextField
              inputRef={editQuestionRef}
              defaultValue={question.flashCardQuestion}
              label="Question"
              error={formErrorState.questionError}
              onKeyUp={onEditQuestionHandler}
            />
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Staatliches",
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              {formErrorState.questionErrorMessage
                ? formErrorState.questionErrorMessage
                : ""}
            </Typography>
            <TextField
              inputRef={editAnswerRef}
              defaultValue={question.flashCardAnswer}
              label="Answer"
              error={formErrorState.answerError}
              onKeyUp={onEditQuestionHandler}
            />
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Staatliches",
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              {formErrorState.answerErrorMessage
                ? formErrorState.answerErrorMessage
                : ""}
            </Typography>
            <Button
              className="gradientButton"
              variant="contained"
              sx={{ fontFamily: "Staatliches", fontSize: "1rem" }}
              onClick={onEditQuestionHandler}
            >
              Submit
            </Button>
          </Stack>
        ) : (
          <Stack sx={{ ml: 1 }}>
            <Typography
              sx={{
                fontFamily: "Staatliches",
                color: "text.secondary",
                fontSize: "1.1rem",
              }}
            >
              {"Question " + questionNumber + " : "}
            </Typography>
            <Typography fontSize={"1.3rem"}>
              {question.flashCardQuestion}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Staatliches",
                color: "text.secondary",
                fontSize: "1.1rem",
              }}
            >
              {"Answer: "}
            </Typography>
            <Typography fontSize={"1.3rem"}>
              {question.flashCardAnswer}
            </Typography>
          </Stack>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "center", alignItems: "end" }}>
        <IconButtonWithLabel
          label={"Edit"}
          icon={<Edit />}
          onClickHandler={() => {
            setShowEditForm((curr) => !curr);
          }}
        />
        <IconButtonWithLabel
          label={"Delete"}
          icon={<Delete />}
          onClickHandler={onDeleteHandler}
        />
        <DeleteDialog
          open={openDeleteConfirmation}
          contentText={
            "If you click on agree you will permanently delete this question and answer"
          }
          handleClose={handleClose}
          title={`Do you want to delete "${question.flashCardQuestion}" question and answer?`}
          deleteFunction={deleteFunction}
        />
      </CardActions>
    </Card>
  );
}

export default function AdminPanelAddQuestion() {
  const navigator = useNavigate();
  const { set, language } = useParams();
  // const [showAddQuestionForm, setShowAddQuestionForm] = useState(true);
  const [questions, setQuestions] = useState([]);

  const addQuestionRef = useRef();
  const addAnswerRef = useRef();
  const fileUploadInputRef = useRef();

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
        // console.log(languageWithSets);
        let setsWithQuestions = languageWithSets[0].flashCardSets;
        setsWithQuestions = setsWithQuestions.filter(
          (setWithQuestions) => setWithQuestions.name == set
        );

        setsWithQuestions[0].set = setsWithQuestions[0].set.reverse();
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
          // console.log(languageSets);

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
      {
        // showAddQuestionForm ? (
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
          <Button
            startIcon={<Upload />}
            component="label"
            variant="contained"
            sx={{ fontFamily: "Staatliches" }}
            className="gradientButton"
          >
            Upload excel file
            <input
              ref={fileUploadInputRef}
              type="file"
              style={{
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                left: 0,
                whiteSpace: "nowrap",
              }}
              onChange={(e) => {
                console.log(e);
                console.log(fileUploadInputRef.current.files);
              }}
            />
          </Button>
          {/* <Typography variant="body2"></Typography> */}
        </Stack>
        // ) : (
        //   <IconButtonWithLabel
        //     label={"Add Question"}
        //     onClickHandler={() => {
        //       setShowAddQuestionForm((curr) => true);
        //     }}
        //     icon={<Add />}
        //   />
        // )
      }
      <Stack
        direction={"row"}
        gap
        flexWrap={"wrap"}
        justifyContent={"center"}
        mt={3}
      >
        {questions && questions.length > 0 ? (
          questions.map((question, index) => {
            return (
              <QuestionCard
                key={index}
                questionNumber={questions.length - index}
                question={question}
                language={language}
                set={set}
              />
            );
          })
        ) : (
          <Typography
            sx={{
              fontFamily: "Staatliches",
              color: "text.secondary",
              fontSize: "1.5rem",
            }}
          >
            No questions
          </Typography>
        )}
      </Stack>
    </>
  );
}
