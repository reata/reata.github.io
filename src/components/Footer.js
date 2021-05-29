import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Link, Typography} from '@material-ui/core';

const description = "Abstraction is good, but don't forget reality."

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://reata.github.io/">
        reata.github.io
      </Link>{' '}
      {new Date().getFullYear()}
      {', powered by GastbyJS & Material UI'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0),
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {description}
        </Typography>
        <Copyright/>
      </Container>
    </footer>
  );
}
