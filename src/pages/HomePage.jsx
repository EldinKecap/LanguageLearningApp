import React from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import InformationSection from "../components/InformationSection";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InformationSection />
      <Stack direction={"row"} width={"80%"} justifyContent={"end"} alignItems={"center"} px={6}>
        <Box>
          <Button variant="contained" size="large" className="gradientButton">
            Register
          </Button>
        </Box>
        <Box >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Staatliches",
              minWidth: "200px",
              pt: 3,
              textAlign: "right",
            }}
            color={"text.primary"}
          >
            Try for <br />
            <strong className="gradientLetters">Free</strong>!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Staatliches",
              minWidth: "200px",
              float:"right"
            }}
            color={"text.secondary"}
            width={"50%"}
          >
            For all new participants we offer a free first set in any language
            of their choosing.
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
