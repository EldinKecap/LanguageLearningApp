import React from "react";
import { AppBar, Button, List, ListItem, Stack } from "@mui/material";
import Logo from "./Logo";


export default function NavBar() {
  return (
    <AppBar component="nav">
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Logo />
        <Stack direction={"row"} pr={1} alignItems={"center"}>
          <List
            sx={{
              fontFamily: "Staatliches",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                minWidth: "350px",
              }}
            >
              <ListItem>Why join</ListItem>
              <ListItem>About</ListItem>
              <ListItem>Contact</ListItem>
            </Stack>
          </List>
          <Button variant="contained" color="success">
            {" "}
            Register{" "}
          </Button>
        </Stack>
      </Stack>
    </AppBar>
  );
}
