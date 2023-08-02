import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import db from "../firebase/firebase";
import { Add, AddCircle, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import IconButtonWithLabel from "../components/IconButtonWithLabel";
import DeleteDialog from "../components/DeleteDialog";


function LanguageListItem({ language }) {
  const [open, setOpen] = useState(false);
  const navigator = useNavigate()

  const handleClose = () => {
    setOpen(false);
  };

  function onAddSetClickHandler() {
    navigator(language);
  }

  function onDeleteLanguageIconClicked() {
    setOpen(true)
  }

  function deleteFunction() {
    const languageCollection = collection(db, "languages");
    console.log(language);
    const q = query(languageCollection, where("name", "==", language))
    getDocs(q).then((querySnap) => {
      querySnap.forEach((docSnap) => {
        console.log(docSnap.id, " => ", docSnap.data());
        deleteDoc(doc(db, "languages", docSnap.id)).then(() => {
          setOpen(false)
          navigator(0)
        });
      })
    });
  }

  return (
    <>
      <ListItem key={language}>
        <ListItemText
          disableTypography
          sx={{ color: "text.primary", fontSize: "2rem" }}
        >
          {language}
        </ListItemText>
        <IconButtonWithLabel label="Add a set" icon={<Add />} onClickHandler={onAddSetClickHandler} />
        <IconButtonWithLabel label="Edit" icon={<Edit />} />
        <IconButtonWithLabel label="Delete" icon={<Delete />} onClickHandler={onDeleteLanguageIconClicked} />
        <DeleteDialog open={open} contentText={"If you click on agree you will permanently delete this language and all of it's flash card sets"} handleClose={handleClose} title={`Do you want to delete ${language}?`} deleteFunction={deleteFunction} />
      </ListItem>
      <Divider />
    </>
  );
}

export default function AdminPanel() {
  const [languages, setLanguages] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [showErrorEmptyLang, setShowErrorEmptyLang] = useState(false);

  const inputLangRef = useRef()
  const navigator = useNavigate();

  useEffect(() => {
    if (inputLangRef.current) {
      inputLangRef.current.focus()
    }
  }, [showInput])

  function onAddLanguageIconClicked() {
    setShowInput(true);
  }

  function onLangSubmitHandler(event) {
    const languageName = inputLangRef.current.value
    console.log(languageName);

    if (languageName.trim() === "") {
      setShowErrorEmptyLang(true)
      return
    }
    setShowErrorEmptyLang(false)

    if (event.key == "Enter" || event.type == "click") {
      addDoc(collection(db, 'languages'), { name: languageName }).then((res) => {
        navigator(0)
      })
    }
  }

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
        variant="h5"
        sx={{
          fontFamily: "Staatliches",
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        Language List
      </Typography>
      {showInput ? <Stack gap={3} alignItems="center" mb={2}>
        <TextField inputRef={inputLangRef} label="Enter language" onKeyUp={onLangSubmitHandler} sx={{
          width: "fit-content",
          m: "auto",
          mt: 3,
          mb: 0,
        }}
          error={showErrorEmptyLang}
        />
        {showErrorEmptyLang ? <Typography variant="body2" sx={{
          fontFamily: "Staatliches",
          color: "text.secondary"
        }}>language must have a name</Typography> : <></>}
        <Button
          className="gradientButton buttonHover"
          sx={{ fontFamily: "Staatliches", color: "black" }}
          onClick={onLangSubmitHandler}
        >Submit</Button>
      </Stack>
        :
        <Stack>
          <IconButton size="large" sx={{
            width: "fit-content",
            m: "auto",
            mt: 3,
            mb: 0,
          }}
            onClick={onAddLanguageIconClicked}
          >
            <AddCircle fontSize="large" />
          </IconButton>
          <Typography variant="body2" sx={{
            fontFamily: "Staatliches",
            textAlign: "center",
            color: "text.secondary",
            mb: 1
          }}>add a language</Typography>
        </Stack>}
      <List>
        <Divider />
        {languages.map((lang) => {
          return <LanguageListItem key={lang.name} language={lang.name} />;
        })}
      </List>
    </Stack>
  );
}
