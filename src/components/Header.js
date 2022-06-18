import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";


const title = "Reata's Blog";


export default function Header() {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
