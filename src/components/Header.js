import React from "react";
import {AppBar, makeStyles, Toolbar, Typography} from "@material-ui/core";

const title = "Reata's Blog";

const useStyles = makeStyles((theme) => ({
  toolbarTitle: {
    flex: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
