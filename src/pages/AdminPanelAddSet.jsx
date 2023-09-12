import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import IconButtonWithLabel from "../components/IconButtonWithLabel";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
  const [sets, setSets] = useState([]);

  console.log(sets);
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
      <IconButtonWithLabel
        icon={<Add />}
        onClickHandler={() => {}}
        label={"Add a set"}
        sx={{ mt: 3, mb: 1 }}
      />
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
