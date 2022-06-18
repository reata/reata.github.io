import React from 'react';
import {Avatar, Grid, Link, Paper, Typography} from '@mui/material';
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import bio_photo from "../images/bio-photo.jpg";


const title = '胡俊伟';
const description = "Data Engineer";
const social = [
  {
    name: '上海 Shanghai, China',
    icon: LocationOnIcon,
    link: "https://www.google.com.hk/maps/place/%E4%B8%AD%E5%9B%BD%E4%B8%8A%E6%B5%B7%E5%B8%82"
  },
  {name: 'Email', icon: MailIcon, link: "mailto:reddevil.hjw@gmail.com"},
  {name: 'GitHub', icon: GitHubIcon, link: "https://github.com/reata"},
];

export default function Sidebar() {

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{padding: 2, backgroundColor: 'rgba(0,0,0,.03)'}}>
        <Avatar alt="Remy Sharp" src={bio_photo} sx={{
          width: 80,
          height: 80,
          marginBottom: 2
        }}/>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Typography variant="body1" gutterBottom sx={{marginTop: 3}}>
          Social
        </Typography>
        {social.map((network) => (
          <Link
            display="block"
            variant="body1"
            color="inherit"
            href={network.link}
            key={network}
            target="_blank"
            underline="hover">
            <Grid container direction="row" spacing={1} alignItems="center">
              <Grid item>
                <network.icon/>
              </Grid>
              <Grid item>{network.name}</Grid>
            </Grid>
          </Link>
        ))}
      </Paper>
    </Grid>
  );
}
