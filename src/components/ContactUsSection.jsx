import { Copyright, Facebook, Instagram, Mail } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

export default function ContactUsSection() {
  return (
    <Box width={"100%"}>
      <Box sx={{ m: 2 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Staatliches",
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          Contact Us
        </Typography>
        <Stack direction={"row"} gap={4} justifyContent={"center"}>
          <IconButton>
            <Instagram />
          </IconButton>
          <IconButton>
            <Facebook />
          </IconButton>
          <IconButton>
            <Mail />
          </IconButton>
        </Stack>
      </Box>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        gap={1}
        p={1}
        sx={{ backgroundColor: "#212326", textAlign: "center" }}
      >
        <Copyright sx={{ color: "text.primary" }} />
        <Typography
          variant="body1"
          display={"inline"}
          sx={{
            fontFamily: "Staatliches",
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          Copyright 2023, LangLearn
        </Typography>
      </Stack>
    </Box>
  );
}
