import { Stack, Typography } from "@mui/material";
import React from "react";

export default function Error({ error, message }) {
  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Typography
        variant="h1"
        align="center"
        sx={{ color: "text.primary", fontFamily: "Staatliches" }}
      >
        {!error && "Error 404"}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.primary",
          fontFamily: "Staatliches",
          fontSize: "2em",
        }}
      >
        {!message && "Page not found"}
      </Typography>
    </Stack>
  );
}
