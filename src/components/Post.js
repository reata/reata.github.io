import React from 'react';
import {Card, CardContent, CardMedia, Divider, Grid, Hidden, Link, Typography} from '@material-ui/core';
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
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
                  <Typography variant="h5" component="h2">
                    <Link href={post.slug} color="inherit" underline="none">{post.title}</Link>
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {post.date}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {post.excerpt}
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
