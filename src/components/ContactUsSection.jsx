import { Box, Typography } from "@mui/material";
import React from "react";

export default function ContactUsSection() {
  return (
    <Box width={"100%"}>
      <Box sx={{m:2}}>
        <Typography
          variant="h2"
          sx={{ fontFamily: "Staatliches", color: "text.secondary" }}
        >
          Contact Us
        </Typography>
      </Box>
      
    </Box>
  );
}
