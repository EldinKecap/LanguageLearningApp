import React, { useState } from "react";
import {
  AppBar,
  Button,
  ButtonBase,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  useMediaQuery,
} from "@mui/material";
import Logo from "./Logo";
import { Close, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function NavBar() {
  const mobile = useMediaQuery("(max-width:800px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigator = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showLoginButton, setShowLoginButton] = useState(true);
  const auth = getAuth();
  // auth.onAuthStateChanged((user) => {
  //   console.log(auth.currentUser);
  // });
  if (user && showLoginButton) {
    setShowLoginButton(false);
  }

  function onSignOutClicked() {
    signOut(auth).then((data) => {
      console.log(data);
      setShowLoginButton(true);
      localStorage.clear();
      navigator("/");
    });
  }

  const listItemButton = {
    fontFamily: "Staatliches",
    fontSize: "1.5em",
    p: 2,
    height: 70,
  };

  const listItem = {
    padding: 0,
    margin: 0,
    textAlign: "center",
    justifyContent: "center",
  };

  const listDrawerItemButton = { fontSize: "1.8rem", justifyContent: "end" };

  return mobile ? (
    <>
      <AppBar component="nav" p={0} m={0}>
        <Stack
          direction="row"
          alignItems="center"
          p={1}
          justifyContent="space-between"
        >
          <Logo />
          <Stack direction={"row"}>
            {showLoginButton ? (
              <Button
                sx={{
                  fontFamily: "Staatliches",
                  fontSize: "0.9rem",
                  mr: 2,
                }}
                className="gradientButton buttonHover"
                variant="contained"
                color="success"
                onClick={() => {
                  navigator("login");
                }}
              >
                Login
              </Button>
            ) : (
              <Button
                sx={{
                  fontFamily: "Staatliches",
                  fontSize: "0.9rem",
                  mr: 2,
                }}
                className="gradientButton buttonHover"
                variant="contained"
                color="success"
                onClick={() => {
                  onSignOutClicked();
                }}
              >
                Logout
              </Button>
            )}
            <IconButton
              onClick={() => {
                setDrawerOpen(true);
              }}
            >
              <Menu />
            </IconButton>
          </Stack>
        </Stack>
      </AppBar>
      <Drawer
        open={drawerOpen}
        anchor="right"
        onOpen={() => {
          setDrawerOpen(true);
        }}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <List disablePadding>
          <ListItemButton
            key={"hamburgerMenu"}
            sx={listDrawerItemButton}
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <Close />
            </ListItemIcon>
            Close
          </ListItemButton>
          <Divider />
          {showLoginButton ? (
            <ListItemButton key={"whyJoin"} sx={listDrawerItemButton}>
              Why Join
            </ListItemButton>
          ) : (
            <ListItemButton
              key={"courses"}
              sx={listDrawerItemButton}
              onClick={() => {
                navigator("/languagelist");
              }}
            >
              Courses
            </ListItemButton>
          )}
          <Divider />
          <ListItemButton key={"about"} sx={listDrawerItemButton}>
            About
          </ListItemButton>
          <Divider />
          <ListItemButton key={"contact"} sx={listDrawerItemButton}>
            Contact
          </ListItemButton>
          <Divider />
        </List>
      </Drawer>
    </>
  ) : (
    <AppBar component="nav" p={0} m={0}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <Logo />
        <Stack direction={"row"} pr={1} alignItems={"center"}>
          <List
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                minWidth: "350px",
              }}
            >
              <ListItem sx={listItem}>
                {showLoginButton ? (
                  <ButtonBase className="buttonHover" sx={listItemButton}>
                    Why join
                  </ButtonBase>
                ) : (
                  <ButtonBase
                    className="buttonHover"
                    sx={listItemButton}
                    onClick={() => {
                      navigator("/languagelist");
                    }}
                  >
                    Courses
                  </ButtonBase>
                )}
              </ListItem>
              <ListItem sx={listItem}>
                <ButtonBase className="buttonHover" sx={listItemButton}>
                  About
                </ButtonBase>
              </ListItem>
              <ListItem sx={listItem}>
                <ButtonBase className="buttonHover" sx={listItemButton}>
                  Contact
                </ButtonBase>
              </ListItem>
            </Stack>
          </List>
          {showLoginButton ? (
            <Button
              sx={{
                fontFamily: "Staatliches",
                fontSize: "1rem",
              }}
              className="gradientButton buttonHover"
              variant="contained"
              color="success"
              onClick={() => {
                navigator("login");
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              sx={{
                fontFamily: "Staatliches",
                fontSize: "1rem",
              }}
              className="gradientButton buttonHover"
              variant="contained"
              color="success"
              onClick={() => {
                onSignOutClicked();
              }}
            >
              Logout
            </Button>
          )}
        </Stack>
      </Stack>
    </AppBar>
  );
}
