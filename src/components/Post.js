import React from 'react';
import {Box, Card, CardContent, CardMedia, Divider, Grid, Hidden, Link, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    // fontSize: 14,
    paddingTop: 8
  },
  subtitle: {
    paddingTop: 4,
  },
  time: {
    paddingTop: 20
  },
  card: {
    display: 'flex',
    marginTop: 48,
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 200,
    height: 150,
  },
});

export default function Post(props) {
  const classes = useStyles();
  const {posts} = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        From the firehose
      </Typography>
      <Divider/>
      {posts.map(post => {
        return (
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography className={classes.title} variant="h5" component="h2">
                  <Box fontWeight="fontWeightBold">
                    <Link href={post.slug} color="inherit" underline="none">{post.title}</Link>
                  </Box>
                </Typography>
                <Typography className={classes.subtitle} color="textSecondary">
                  {post.excerpt}
                </Typography>
                <Typography variant="body2" component="p" className={classes.time} color="textSecondary">
                  {post.date} · {post.readMinutes} min read
                </Typography>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia className={classes.cardMedia}
                         image={post.image.childImageSharp.gatsbyImageData.images.fallback.src} title={post.title}/>
            </Hidden>
          </Card>
        )
      })}
    </Grid>
  );
}
