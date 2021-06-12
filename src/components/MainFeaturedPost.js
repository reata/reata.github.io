import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box, CardActionArea, Grid, Paper, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  time: {
    paddingTop: 30
  },
}));


export default function MainFeaturedPost(props) {
  const classes = useStyles();

  const {post} = props;
  const imageUrl = post.image.childImageSharp.gatsbyImageData.images.fallback.src;

  return (
    <Paper className={classes.mainFeaturedPost} style={{backgroundImage: `url(${imageUrl})`}}>
      <div className={classes.overlay}/>
      <Grid container>
        <Grid item md={12}>
          <CardActionArea component="a" href={post.slug}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                <Box fontWeight="fontWeightBold">
                  {post.title}
                </Box>
              </Typography>
              <Typography variant="h6" color="inherit">
                {post.excerpt}
              </Typography>
              <Typography className={classes.time} variant="body1" color="inherit" paragraph>
                {post.date} · {post.readMinutes} min read
              </Typography>
            </div>
          </CardActionArea>
        </Grid>
      </Grid>
    </Paper>
  );
}
