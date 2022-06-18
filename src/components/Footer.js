import React from 'react';
import {Container, Link, Typography} from '@mui/material';

const description = "Abstraction is good, but don't forget reality."

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://reata.github.io/" underline="hover">
        reata.github.io
      </Link>{' '}
      {new Date().getFullYear()}
      {', powered by GastbyJS & Material UI'}
    </Typography>
  );
}

export default function Footer() {

  return (
    <footer style={{
      paddingTop: 2,
      marginTop: 'auto',
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    }}>
      <Container maxWidth="lg">
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {description}
        </Typography>
        <Copyright/>
      </Container>
    </footer>
  );
}
