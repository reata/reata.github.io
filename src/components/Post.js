import React from 'react';
import {Card, CardContent, Divider, Grid, Link, Typography} from '@material-ui/core';
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
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <Link href={post.slug}>{post.title}</Link>
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {post.date}
              </Typography>
              <Typography variant="body2" component="p">
                {post.excerpt}
              </Typography>
            </CardContent>
          </Card>)
      })}
    </Grid>
  );
}
