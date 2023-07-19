import React from "react";
import { AppBar, Button, ButtonBase, List, ListItem, Stack } from "@mui/material";
import Logo from "./Logo";


export default function NavBar() {
  const listItemButton = {
    fontFamily: "Staatliches",
    fontSize: "1.5em",
    p: 2,
    height: 70
  }

  const listItem = {
    padding: 0,
    margin: 0,
    textAlign: "center",
    justifyContent: "center"

  }

  return (
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
              <ListItem sx={
                listItem
              }><ButtonBase className="buttonHover" sx={listItemButton}>Why join</ButtonBase></ListItem>
              <ListItem sx={
                listItem
              }><ButtonBase className="buttonHover" sx={listItemButton}>About</ButtonBase></ListItem>
              <ListItem sx={
                listItem
              }><ButtonBase className="buttonHover" sx={listItemButton}>Contact</ButtonBase></ListItem>
            </Stack>
          </List>
          <Button sx={{
            fontFamily: "Staatliches",
            fontSize: "1rem"
          }} className="gradientButton buttonHover" variant="contained" color="success">
            Register
          </Button>
        </Stack>
      </Stack>
    </AppBar>
  );
}
