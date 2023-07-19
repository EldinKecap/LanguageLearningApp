import React from "react";
import { AppBar, Button, ButtonBase, IconButton, List, ListItem, Stack, useMediaQuery } from "@mui/material";
import Logo from "./Logo";
import { Menu } from "@mui/icons-material";


export default function NavBar() {
  const mobile = useMediaQuery("(max-width:800px)");
  console.log(mobile);

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
    mobile ?
      <AppBar component="nav" p={0} m={0}>
        <Stack direction="row" alignItems="center" pr={2} pl={2} justifyContent="space-between">
          <IconButton ><Menu /></IconButton>
          <Logo />
          <Button sx={{
            fontFamily: "Staatliches",
            fontSize: "1rem"
          }} className="gradientButton buttonHover" variant="contained" color="success">
            Register
          </Button>
        </Stack>
      </AppBar>
      : <AppBar component="nav" p={0} m={0}>
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
