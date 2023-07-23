import {
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Logo from "./Logo";

export default function FlashCard() {
  return (
    <Stack height="100vh">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Logo />
      </Stack>
      <LinearProgress variant="determinate" value={69} />
      <Stack
        display="row"
        alignItems="Baseline"
        justifyContent="center"
        gap={5}
        sx={{ width: "fit-content", m: "auto" }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Staatliches",
            color: "text.primary",
          }}
        >
          Auto
        </Typography>

        <TextField
          variant="standard"
          label="Enter answer"
          multiline
          sx={{
            width: "80vw",
            minWidth: "250px",
          }}
        />
        <Stack direction="row" justifyContent={"space-between"} width={"100%"}>
          <Button variant="outlined">Show answer</Button>
          <Button
            variant="contained"
            color="success"
            className="gradientButton buttonHover"
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
