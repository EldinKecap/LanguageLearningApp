import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButtonWithLabel from "../components/IconButtonWithLabel";
import {
  Add,
  AddBox,
  Close,
  Delete,
  Edit,
  QuestionAnswer,
  QuestionMark,
} from "@mui/icons-material";
import { useState } from "react";
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

function SetListItem({ setNameProp, sets, description = "" }) {
  const { language } = useParams();
  const navigator = useNavigate();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [showEditTextField, setShowEditTextField] = useState(false);
  const [showEditError, setShowEditError] = useState(false);
  const [showAddDescription, setShowAddDescription] = useState(false);
  const editTextFieldRef = useRef();
  const addDescriptionRef = useRef();

  function onAddQuestionHandler() {
    navigator(setNameProp);
  }

  function editTextFieldHandler(event) {
    const editedSetName = editTextFieldRef.current.value.trim().toLowerCase();
    let setExists = false;
    if (editedSetName.trim() === "") {
      setShowEditError(true);
      return;
    }
    //Here i check if there is a set with the same name in sets array thats not this set
    sets.forEach((set) => {
      console.log(editedSetName != set.name);
      console.log(set, editedSetName);
      if (set.name == editedSetName && editedSetName != setNameProp) {
        setExists = true;
      }
    });

    if (setExists) {
      setShowEditError(true);
      // console.log(showEditError);
      return;
    }

    setShowEditError(false);

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
          // console.log(languageSets);
          languageSets.forEach((setInLanguageSets) => {
            if (setInLanguageSets.name == setNameProp) {
              setInLanguageSets.name = editedSetName;
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
  }

  function onAddDescriptionHandler(event) {
    console.log(addDescriptionRef.current.value);
    let description = addDescriptionRef.current.value;
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
          languageSets.forEach((setInLanguageSets) => {
            if (setInLanguageSets.name == setNameProp) {
              console.log(setInLanguageSets);
              setInLanguageSets['description'] = description;
            }
          });
          const languageDocRef = doc(db, "languages", languageID);
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
          console.log(doc.id, doc.data());
          languageID = doc.id;
          languageSets = doc.data().flashCardSets;
        });
        console.log(languageSets);
        languageSets = languageSets.filter(
          (value) => value.name != setNameProp
        );
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
    <>
      <ListItem key={setNameProp}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          {showEditTextField ? (
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <TextField
                inputRef={editTextFieldRef}
                defaultValue={setNameProp}
                error={showEditError}
                onKeyUp={editTextFieldHandler}
              />
              <Button
                variant="contained"
                color="success"
                onClick={editTextFieldHandler}
              >
                submit
              </Button>
            </Stack>
          ) : (
            <ListItemText
              disableTypography
              sx={{
                color: "text.primary",
                fontSize: "2rem",
                minWidth: "fit-content",
              }}
            >
              {setNameProp}
            </ListItemText>
          )}
          <Stack
            direction={"row"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            width={"50%"}
          >
            <IconButtonWithLabel
              label="Add Description"
              icon={<AddBox />}
              onClickHandler={() => {
                setShowAddDescription((curr) => !curr);
              }}
            />
            <IconButtonWithLabel
              label="Add Question"
              icon={<Add />}
              onClickHandler={onAddQuestionHandler}
            />
            <IconButtonWithLabel
              label="Edit name"
              icon={<Edit />}
              onClickHandler={() => {
                setShowEditTextField((curr) => !curr);
              }}
            />
            <IconButtonWithLabel
              label="Delete set"
              icon={<Delete />}
              onClickHandler={onDeleteHandler}
            />
            <DeleteDialog
              open={openDeleteConfirmation}
              contentText={
                "If you click on agree you will permanently delete this set and all its questions"
              }
              handleClose={handleClose}
              title={`Do you want to delete "${setNameProp}" set?`}
              deleteFunction={deleteFunction}
            />
            <Dialog
              open={showAddDescription}
              onClose={() => {
                setShowAddDescription((curr) => !curr);
              }}
            >
              <DialogTitle>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    sx={{ fontFamily: "Staatliches", fontSize: "22px" }}
                  >
                    Enter description
                  </Typography>
                </Stack>
              </DialogTitle>
              <DialogContent>
                <TextField
                  defaultValue={description}
                  label="Description"
                  multiline
                  rows={4}
                  sx={{ mt: 1 }}
                  inputRef={addDescriptionRef}
                />
              </DialogContent>
              <DialogActions>
                <Stack
                  width={"100%"}
                  direction={"row"}
                  px={2}
                  pb={1}
                  justifyContent={"space-between"}
                >
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      setShowAddDescription((curr) => !curr);
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    className="gradientButton"
                    color="success"
                    onClick={onAddDescriptionHandler}
                  >
                    Submit
                  </Button>
                </Stack>
              </DialogActions>
            </Dialog>
          </Stack>
        </Stack>
      </ListItem>
      <Divider />
    </>
  );
}

export default function AdminPanelAddSet() {
  const { language } = useParams();
  const navigator = useNavigate();
  const inputAddSet = useRef();
  const [sets, setSets] = useState([]);
  const [showAddSetTextField, setShowAddSetTextField] = useState(false);
  const [showErrorEmptyAddSet, setShowErrorEmptyAddSet] = useState(false);

  useEffect(() => {
    const languagesCollection = collection(db, "languages");
    getDocs(languagesCollection).then((languagesSnapshot) => {
      const arrOfLanguages = languagesSnapshot.docs.map((doc) => doc.data());
      const languageWithSets = arrOfLanguages.filter(
        (val) => val.name == language
      );
      if (languageWithSets[0].flashCardSets) {
        languageWithSets[0].flashCardSets.reverse();
        setSets((curr) => languageWithSets[0].flashCardSets);
      }
      // setShowLoading(false);
    });
  }, []);
  // console.log("setsarr", sets);

  function onAddSetSubmitHandler(event) {
    const setName = inputAddSet.current.value.trim();
    let setExists = false;
    if (setName.trim() === "") {
      setShowErrorEmptyAddSet(true);
      return;
    }

    sets.forEach((set) => {
      console.log(setName);
      if (set.name == setName) {
        setExists = true;
      }
    });

    if (setExists) {
      setShowErrorEmptyAddSet(true);
      // console.log(showErrorEmptyAddSet);
      return;
    }

    setShowErrorEmptyAddSet(false);

    if (event.key == "Enter" || event.type == "click") {
      const q = query(
        collection(db, "languages"),
        where("name", "==", language)
      );
      getDocs(q).then((querySnap) => {
        if (querySnap.size == 1) {
          let languageID = "";
          querySnap.forEach((doc) => {
            console.log(doc.id, doc.data());
            languageID = doc.id;
          });

          const languageDocRef = doc(db, "languages", languageID);

          setDoc(
            languageDocRef,
            {
              flashCardSets: [...sets, { name: setName }],
            },
            { merge: true }
          ).then(() => {
            navigator(0);
          });
        }
      });
      // const setRef = doc(db, "languages");
      // addDoc(collection(db, "languages"), { name: setName }).then((res) => {
      //   navigator(0);
      // });
    }
  }

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mt: 10,
          fontFamily: "Staatliches",
          color: "white",
        }}
      >
        {language}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontFamily: "Staatliches",
          color: "text.secondary",
        }}
      >
        Set List
      </Typography>
      {showAddSetTextField ? (
        <Stack gap={3} alignItems="center" mb={2}>
          <TextField
            inputRef={inputAddSet}
            label="Enter set name"
            onKeyUp={onAddSetSubmitHandler}
            sx={{
              width: "fit-content",
              m: "auto",
              mt: 3,
              mb: 0,
            }}
            error={showErrorEmptyAddSet}
          />
          {showErrorEmptyAddSet ? (
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Staatliches",
                color: "text.secondary",
              }}
            >
              set must have a name and not be on the list
            </Typography>
          ) : (
            <></>
          )}
          <Button
            className="gradientButton buttonHover"
            sx={{ fontFamily: "Staatliches", color: "black" }}
            onClick={onAddSetSubmitHandler}
          >
            Submit
          </Button>
        </Stack>
      ) : (
        <IconButtonWithLabel
          icon={<Add />}
          onClickHandler={() => {
            setShowAddSetTextField((curr) => true);
          }}
          label={"Add a set"}
          sx={{ mt: 3, mb: 1 }}
        />
      )}
      <List>
        <Divider />
        {sets.length > 0 ? (
          sets.map((set) => {
            return (
              <SetListItem key={set.name} setNameProp={set.name} sets={sets} description={set.description} />
            );
          })
        ) : (
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Staatliches",
              textAlign: "center",
              color: "text.primary",
            }}
          >
            No sets
          </Typography>
        )}
      </List>
    </>
  );
}
