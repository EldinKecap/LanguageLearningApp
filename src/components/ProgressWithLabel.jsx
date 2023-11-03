import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

export default function ProgressWithLabel({ progressValue, label, color }) {
  return (
    <Stack>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          color={color}
          variant="determinate"
          size={50}
          value={progressValue}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            fontFamily={"Staatliches"}
          >
            {progressValue + `/100`}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="caption"
        color={color + ".main"}
        fontFamily={"Staatliches"}
        align="center"
      >
        {label}
      </Typography>
    </Stack>
  );
}
