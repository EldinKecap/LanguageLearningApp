import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import db from "../firebase/firebase";
import { collection, getDocs, where } from "firebase/firestore";

function LanguageListItem({ title, path }) {
  let navigator = useNavigate();
  function onButtonClickHandler() {
    navigator(path);
  }

  return (
    <ListItem>
      <Paper sx={{ p: 2, width: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Staatliches",
              fontWeight: 500,
              fontSize: "2rem",
            }}
          >
            {title}
          </Typography>

          <Button
            variant="contained"
            className="gradientButton buttonHover"
            onClick={onButtonClickHandler}
          >
            Get started
          </Button>
        </Stack>
      </Paper>
    </ListItem>
  );
}

export default function LanguageList() {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const languagesCollection = collection(db, "languages");
    getDocs(languagesCollection).then((languagesSnapshot) => {
      const arrOfLanguages = languagesSnapshot.docs.map((doc) => doc.data());
      setLanguages(arrOfLanguages);
    });
  }, []);
  return (
    <Stack alignItems="center">
      <Title title="Language List" />
      <Stack width="90%">
        <List>
          {languages.map((language) => {
            return (
              <LanguageListItem
                title={language.name}
                path={language.name.toLowerCase()}
              />
            );
          })}
        </List>
      </Stack>
    </Stack>
  );
}
