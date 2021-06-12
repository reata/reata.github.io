import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Grid, Link, Paper, Typography} from '@material-ui/core';
import GitHubIcon from "@material-ui/icons/GitHub";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import bio_photo from "../images/bio-photo.jpg";


const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
}));


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
  const classes = useStyles();

  return (
    <Grid item xs={12} md={4}>
      <Paper className={classes.sidebarAboutBox}>
        <Avatar alt="Remy Sharp" src={bio_photo} className={classes.large}/>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
          Social
        </Typography>
        {social.map((network) => (
          <Link display="block" variant="body1" color="inherit" href={network.link} key={network} target="_blank">
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
