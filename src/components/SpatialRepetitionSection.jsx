import { Box, Typography } from "@mui/material";
import SpatialRepetitionImages from "../assets/spatial-repetition.png";
import React from "react";

export default function SpatialRepetitionSection() {
  return (
    <Box sx={{ py: 5 }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Staatliches",
          color: "text.primary",
          textAlign: "center",
        }}
      >
        Spatial Repetition
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: 5,
          // mb: 5,
        }}
      >
        {/* <img src={SpatialRepetitionImages} width={"300px"} /> */}
      </Box>
      <Typography
        variant="body1"
        sx={{
          fontFamily: "Staatliches",
          color: "text.secondary",
          textAlign: "center",
        }}
      >
        Spaced repetition is a memory technique that involves reviewing and
        recalling information at optimal spacing intervals until the information
        is learned at a high level.
      </Typography>
    </Box>
  );
}
