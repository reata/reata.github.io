import React from 'react';
import {Chip, Toolbar} from '@mui/material';


const sections = [
  {title: 'Blog', url: '/'},
  {title: 'Notebook', url: '/notebook'},
  {title: 'Gist', url: '/gist'},
  {title: 'About', url: '/about'},
];

export default function Section() {

  return (
    <React.Fragment>
      <Toolbar component="nav" variant="dense" sx={{
        justifyContent: 'space-between',
        overflowX: 'auto',
      }}>
        {sections.map((section) => (
          <Chip label={section.title} component="a" href={section.url} clickable/>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
