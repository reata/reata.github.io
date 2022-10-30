import React from 'react';
import {Chip, Toolbar, Typography} from '@mui/material';


const sections = [
  {title: 'Blog', url: '/'},
  {title: 'Gist', url: '/gist'},
  {title: 'Notebook', url: '/notebook'},
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
          <Chip label={<Typography variant="subtitle2" gutterBottom={true}>
            {section.title}
          </Typography>} component="a" href={section.url} clickable/>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
