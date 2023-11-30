import React from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TryForFreeSection() {
  const navigator = useNavigate();
  const mobile = useMediaQuery("(max-width:800px)");
  return (
    <Box sx={{ backgroundColor: "#212326" }}>
      <Stack
        direction={mobile ? "column-reverse" : "row"}
        m={"auto"}
        width={!mobile && "80%"}
        justifyContent={"space-around"}
        alignItems={"center"}
        gap={3}
        px={6}
        pb={2}
      >
        <Box>
          <Button
            variant="contained"
            size="large"
            className="gradientButton"
            sx={{
              fontFamily: "Staatliches",
              fontSize: "30px",
              borderRadius: "50px",
              borderColor: "transparent",
              px: "35px",
            }}
            color="success"
            onClick={() => {
              navigator("/login");
            }}
          >
            Register
          </Button>
        </Box>
        <Box
          sx={{
            minWidth: "200px",
            width: "50%",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Staatliches",
              pt: 3,
              textAlign: mobile ? "center" : "right",
            }}
            color={"text.primary"}
          >
            Try for <br />
            <strong className="movingGradientBackgroundLetters">Free</strong>!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Staatliches",
              float: "right",
              textAlign: mobile ? "center" : "initial",
            }}
            color={"text.secondary"}
          >
            For all new participants we offer a free first set in any language
            of their choosing.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
