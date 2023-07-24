import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase/firebase";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

export default function FlashCardSetList() {
  const { language } = useParams();
  const [flashCardNames, setFlashCardNames] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    const languagesRef = collection(db, "languages");
    const languageQuery = query(languagesRef, where("name", "==", language));

    getDocs(languageQuery).then((languageSnapshot) => {
      // i used index [0] at the end to get rid of an outer array of map
      const flashCardSets = languageSnapshot.docs.map(
        (doc) => doc.data().flashCardSets
      )[0];

      const flashCardNameArray = flashCardSets.map(
        (flashCardSet) => flashCardSet.name
      );
      console.log(flashCardNameArray);
      setFlashCardNames(flashCardNameArray);
    });
  }, []);

  function onButtonClickHandler(relPath) {
    console.log(relPath);
    navigator(relPath);
  }

  return (
    <>
      <Title title={language} />;
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
        {flashCardNames.map((cardName) => {
          return (
            <Card
              sx={{
                minWidth: "250px",
                maxWidth: "350px",
                maxHeight: "400px",
              }}
            >
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "Staatliches",
                    wordWrap: "break-word",
                  }}
                >
                  {cardName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "Staatliches", color: "text.secondary" }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Sunt, quam!
                </Typography>
                <CardActions sx={{ justifyContent: "end", mt: "auto" }}>
                  <Button
                    variant="contained"
                    className="gradientButton buttonHover"
                    onClick={() => onButtonClickHandler(cardName)}
                  >
                    Start
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </>
  );
}