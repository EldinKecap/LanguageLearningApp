import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

export default function AdminPanelAddSet() {
  const { language } = useParams();
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" , mt:10, fontFamily:"Staatliches", color:"white"}}>
        {language}
      </Typography>
    </>
  );
}
