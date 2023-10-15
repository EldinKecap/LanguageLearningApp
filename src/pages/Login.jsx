import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function Login() {
  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Card>
        <CardContent>
          <Stack alignItems={"center"} gap={3}>
            <Typography variant="h3" sx={{ fontFamily: "Staatliches" }}>
              Login
            </Typography>
            <TextField label="Email" color="success" />
            <TextField label="Password" color="success" />
          </Stack>
        </CardContent>
        <CardActions>
          <Stack alignItems={"center"} gap={3} width={"100%"}>
            <Button className="gradientButton" variant="contained">
              Sign in
            </Button>
            <Button color="success" sx={{ mb: "10px" }}>
              Create Account
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  );
}
