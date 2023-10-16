import { Google } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React from "react";

export default function Login() {
  function onGoogleSignInClicked() {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    auth.useDeviceLanguage();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
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
            {/* <TextField label="Email" color="success" />
            <TextField label="Password" color="success" /> */}
          </Stack>
        </CardContent>
        <CardActions>
          <Stack
            alignItems={"center"}
            gap={3}
            width={"100%"}
            minWidth={"200px"}
            mb={2}
          >
            <Button
              variant="contained"
              startIcon={<Google />}
              onClick={onGoogleSignInClicked}
            >
              Sign in
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  );
}
