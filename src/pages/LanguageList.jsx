import React from "react";
import {
  Button,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function LanguageList() {
  return (
    <Stack alignItems="center">
      <Typography
        variant="h1"
        mt={10}
        sx={{ color: "text.primary", fontFamily: "Staatliches" }}
      >
        Language List
      </Typography>
      <Stack width="90%">
        <List>
          <ListItem>
            <Paper sx={{ p: 2, width: "100%" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3" sx={{ fontWeight: 500 }}>
                  Romanian
                </Typography>

                <Button
                  variant="contained"
                  className="gradientButton buttonHover"
                >
                  Get started
                </Button>
              </Stack>
            </Paper>
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
}
