import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase/firebase";
import { Add, AddCircle } from "@mui/icons-material";

function LanguageListItem({ language }) {
  return (
    <>
      <ListItemButton key={language}>
        <ListItemText
          disableTypography
          sx={{ color: "text.primary", fontSize: "2rem" }}
        >
          {language}
        </ListItemText>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
      </ListItemButton>
      <Divider />
    </>
  );
}

export default function AdminPanel() {
  const [languages, setLanguages] = useState([]);
  const [showLoading, setShowLoading] = useState([]);

  useEffect(() => {
    setShowLoading(true);
    const languagesCollection = collection(db, "languages");
    getDocs(languagesCollection).then((languagesSnapshot) => {
      const arrOfLanguages = languagesSnapshot.docs.map((doc) => doc.data());
      setLanguages(arrOfLanguages);
      setShowLoading(false);
    });
  }, []);

  return (
    <Stack mt={10}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Staatliches",
          color: "text.primary",
          textAlign: "center",
        }}
      >
        Admin Panel
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: "Staatliches",
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        Language List
      </Typography>
      <List>
        {languages.map((lang) => {
          return <LanguageListItem key={lang.name} language={lang.name} />;
        })}
      </List>
      <IconButton size="large" sx={{ width: "fit-content", m: "auto" }}>
        <AddCircle fontSize="large" />
      </IconButton>
    </Stack>
  );
}
