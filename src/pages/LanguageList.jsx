import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import db from "../firebase/firebase";
import { collection, getDocs, where } from "firebase/firestore";

function LanguageListItem({ title, path }) {
  const mobile = useMediaQuery("(max-width:800px)");
  const navigator = useNavigate();
  function onButtonClickHandler() {
    navigator(path);
  }

  return (
    <ListItem key={title}>
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
              fontSize: mobile ? "1.5rem" : "2rem",
            }}
          >
            {title}
          </Typography>

          <Button
            variant="contained"
            className="gradientButton buttonHover"
            onClick={onButtonClickHandler}
            sx={{ fontFamily: "Staatliches" }}
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
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    setShowLoading(true)
    const languagesCollection = collection(db, "languages");
    getDocs(languagesCollection).then((languagesSnapshot) => {
      const arrOfLanguages = languagesSnapshot.docs.map((doc) => doc.data());
      setLanguages(arrOfLanguages);
      setShowLoading(false)
    });
  }, []);

  return (<>
    <Title title="Language List" />
    <Typography
      variant="body1"
      align="center"
      sx={{ fontFamily: "Staatliches", color: "text.secondary" }}
    >
      Pick a language
    </Typography>
    <Stack alignItems="center" >
      {showLoading ? <CircularProgress color="success" disableShrink sx={{m:2}}/> :
        <Stack width="90%">
          <List>
            {languages.map((language) => {
              return (
                <LanguageListItem key={language.name}
                  title={language.name}
                  path={language.name.toLowerCase()}
                />
              );
            })}
          </List>
        </Stack>}
    </Stack>
  </>
  );
}
