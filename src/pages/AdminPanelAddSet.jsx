import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import IconButtonWithLabel from "../components/IconButtonWithLabel";
import { Add } from "@mui/icons-material";



export default function AdminPanelAddSet() {
  const { language } = useParams();

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" , mt:10, fontFamily:"Staatliches", color:"white"}}>
        {language}
      </Typography>
      <IconButtonWithLabel icon={<Add/>} onClickHandler={()=>{}} label={"Add a set"}/>
      <List>
        
      </List>

    </>
  );
}
