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
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import db from "../firebase/firebase";

export default function Login() {
  const navigator = useNavigate();

  function onGoogleSignInClicked() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    auth.useDeviceLanguage();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    setPersistence(auth, browserLocalPersistence)

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // console.log(user);
        localStorage.setItem(
          "user",
          JSON.stringify({
            accessToken: user.accessToken,
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
          })
        );

        const docRef = doc(db, "users", user.uid);
        getDoc(docRef)
          .then((docSnap) => {
            if (!docSnap.exists()) {
              setDoc(doc(db, "users", user.uid), {});
            }
          })
          .catch((err) => {
            console.log(err);
          });

        navigator("/");

      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
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
