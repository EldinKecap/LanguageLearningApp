import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

export default function AdminPanelAddQuestion() {
  const { set } = useParams();

  return (
    <Typography
      variant="h2"
      textAlign={"center"}
      color={"white"}
      sx={{ mt: 10, fontFamily: "Staatliches" }}
    >
      {set}
    </Typography>
  );
}
