import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Chip, Toolbar} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
}));

const sections = [
  {title: 'Blog', url: '/'},
  {title: 'Notebook', url: '/notebook'},
  {title: 'Gist', url: '/gist'},
  {title: 'About', url: '/about'},
];

export default function Section() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Chip label={section.title} component="a" href={section.url} clickable/>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
