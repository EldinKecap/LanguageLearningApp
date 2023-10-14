import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";
import { collection, getDocs, query, where } from "firebase/firestore";
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

export default function FlashCardSetList() {
  const { language } = useParams();
  const [flashCardNames, setFlashCardNames] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const navigator = useNavigate();
  //When profiles are implemented retrive data here
  const [numberOfCompletedQuestions, setNumberOfCompletedQuestions] =
    useState(0);

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
        const flashCardNameArray = flashCardSets.map(
          (flashCardSet) => flashCardSet.name
        );
        setFlashCardNames(flashCardNameArray);
      }
      setShowLoading(false);
    });
  }, []);

  function onButtonClickHandler(relPath) {
    navigator(relPath);
  }

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
        ) : flashCardNames.length > 0 ? (
          flashCardNames.map((cardName) => {
            return (
              <Card
                key={cardName}
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
                      {cardName}
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sunt, quam!
                  </Typography>
                  <CardActions sx={{ justifyContent: "end", mt: "auto" }}>
                    <Button
                      variant="contained"
                      className="gradientButton buttonHover"
                      onClick={() => onButtonClickHandler(cardName)}
                      sx={{ fontFamily: "Staatliches" }}
                    >
                      Start
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            );
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
