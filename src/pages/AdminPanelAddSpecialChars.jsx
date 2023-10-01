import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButtonWithLabel from "../components/IconButtonWithLabel";
import { Add, Delete, Lan } from "@mui/icons-material";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import db from "../firebase/firebase";

export default function AdminPanelAddSpecialChars() {
  const navigator = useNavigate();
  const { language } = useParams();
  const [specialCharacters, setSpecialCharacters] = useState([]);
  const [showAddSpecialCharForm, setShowAddSpecialCharForm] = useState(false);

  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const specialCharTextFieldRef = useRef();

  useEffect(() => {
    setShowLoading(true);
    const languagesCollection = collection(db, "languages");
    getDocs(languagesCollection).then((languagesSnapshot) => {
      const arrOfLanguages = languagesSnapshot.docs.map((doc) => doc.data());
      const languageWithSets = arrOfLanguages.filter(
        (val) => val.name == language
      );
      if (languageWithSets[0].specialCharacters != undefined) {
        setSpecialCharacters(languageWithSets[0].specialCharacters);
      }
      setShowLoading(false);
    });
  }, []);

  function onAddSpecialCharactersHandler(event) {
    const specialCharacter = specialCharTextFieldRef.current.value
      .trim()
      .toLowerCase();
    if (specialCharacter.length == 0) {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }

    if (event.key == "Enter" || event.type == "click") {
      const q = query(
        collection(db, "languages"),
        where("name", "==", language)
      );
      getDocs(q).then((querySnap) => {
        if (querySnap.size == 1) {
          let languageID = "";
          let languageData = {};
          querySnap.forEach((doc) => {
            console.log(doc.id, doc.data());
            languageID = doc.id;
            languageData = doc.data();
          });
          console.log(languageData);

          const languageDocRef = doc(db, "languages", languageID);
          if (languageData.specialCharacters == undefined) {
            setDoc(
              languageDocRef,
              {
                specialCharacters: [specialCharacter],
              },
              { merge: true }
            ).then(() => {
              navigator(0);
            });
          } else {
            setDoc(
              languageDocRef,
              {
                specialCharacters: [
                  ...languageData.specialCharacters,
                  specialCharacter,
                ],
              },
              { merge: true }
            ).then(() => {
              navigator(0);
            });
          }
        }
      });
    }
  }

  function onDeleteHandler(char) {
    const q = query(collection(db, "languages"), where("name", "==", language));
    getDocs(q).then((querySnap) => {
      if (querySnap.size == 1) {
        let languageID = "";
        let languageData = {};
        querySnap.forEach((doc) => {
          console.log(doc.id, doc.data());
          languageID = doc.id;
          languageData = doc.data();
        });
        let specialCharacters = languageData.specialCharacters.filter(
          (val) => val != char
        );
        console.log(specialCharacters);
        const languageDocRef = doc(db, "languages", languageID);
        setDoc(
          languageDocRef,
          {
            specialCharacters: specialCharacters,
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
        special characters
      </Typography>

      {showAddSpecialCharForm ? (
        <Stack alignItems={"center"} gap={2}>
          <TextField
            inputRef={specialCharTextFieldRef}
            label={"Enter character"}
            error={showError}
            onKeyUp={onAddSpecialCharactersHandler}
          />
          <Button
            className="gradientButton"
            variant="contained"
            onClick={onAddSpecialCharactersHandler}
          >
            Submit
          </Button>
        </Stack>
      ) : (
        <IconButtonWithLabel
          icon={<Add />}
          onClickHandler={() => {
            setShowAddSpecialCharForm((curr) => !curr);
          }}
          label={"Add Special character"}
        />
      )}
      <Stack justifyContent={"center"} mt={3} gap={1} direction={"row"}>
        {specialCharacters.length > 0 ? (
          specialCharacters.map((char) => {
            return (
              <Card key={char} sx={{ maxWidth: "200px", alignItems: "center" }}>
                <CardContent sx={{ justifyContent: "center" }}>
                  <Typography
                    variant="body1"
                    fontSize={"2rem"}
                    textAlign={"center"}
                    fontWeight={"500"}
                  >
                    {char}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <IconButtonWithLabel
                    icon={<Delete />}
                    label={"Delete character"}
                    onClickHandler={() => {
                      onDeleteHandler(char);
                    }}
                  />
                </CardActions>
              </Card>
            );
          })
        ) : showLoading ? (
          <CircularProgress color="success" />
        ) : (
          <Typography
            variant="body1"
            textAlign={"center"}
            color={"white"}
            sx={{
              fontFamily: "Staatliches",
              color: "text.secondary",
              mt: 2,
              fontSize: "1.3rem",
            }}
          >
            No special characters
          </Typography>
        )}
      </Stack>
    </>
  );
}
