import { Box, Typography } from "@mui/material";
import React from "react";

export default function SpatialRepetitionSection() {
  return (
    <Box sx={{ backgroundColor: "#212326" }}>
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
