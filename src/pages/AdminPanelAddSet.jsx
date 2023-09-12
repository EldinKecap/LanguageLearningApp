import {
  Button,
  Divider,
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
import { Add } from "@mui/icons-material";
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

function SetListItem({ set }) {
  const [showEditTextField, setShowEditTextField] = useState(false);
  return (
    <>
      <ListItem key={set}>
        <ListItemText
          disableTypography
          sx={{ color: "text.primary", fontSize: "2rem" }}
        >
          {set}
        </ListItemText>
        {/* <IconButtonWithLabel
          label="Add a set"
          icon={<Add />}
          onClickHandler={() => {}}
        /> */}
      </ListItem>
      <Divider />
    </>
  );
}

export default function AdminPanelAddSet() {
  const { language } = useParams();
  const inputAddSet = useRef();
  const [sets, setSets] = useState([]);
  const navigator = useNavigate();
  const [showAddSetTextField, setShowAddSetTextField] = useState(false);
  const [showErrorEmptyAddSet, setShowErrorEmptyAddSet] = useState(false);

  useEffect(() => {
    const languagesCollection = collection(db, "languages");
    getDocs(languagesCollection).then((languagesSnapshot) => {
      const arrOfLanguages = languagesSnapshot.docs.map((doc) => doc.data());
      const languageWithSets = arrOfLanguages.filter(
        (val) => val.name == language
      );
      setSets((curr) => languageWithSets[0].flashCardSets);
      // setShowLoading(false);
    });
  }, []);
  console.log(sets);

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
      console.log(showErrorEmptyAddSet);
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
            return <SetListItem set={set.name} />;
          })
        ) : (
          <></>
        )}
      </List>
    </>
  );
}
