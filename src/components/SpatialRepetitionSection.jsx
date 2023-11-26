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
    </Box>
  );
}
