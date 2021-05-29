import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardActionArea, CardContent, CardMedia, Grid, Hidden, Link, Typography} from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();

  const {posts} = props;

  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item xs={12} md={6}>
          <CardActionArea component="a" href="#">
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {post.date}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {post.excerpt}
                  </Typography>
                  <Link variant="subtitle1" color="primary" href={post.slug}>
                    Continue reading...
                  </Link>
                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia className={classes.cardMedia}
                           image={post.image.childImageSharp.gatsbyImageData.images.fallback.src} title={post.title}/>
              </Hidden>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
}
