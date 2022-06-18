import React from 'react';
import {Box, Card, CardContent, CardMedia, Divider, Grid, Hidden, Link, Typography} from '@mui/material';


export default function Post(props) {
  const {posts} = props;

  return (
    <Grid item xs={12} md={8} sx={{paddingRight: 2}}>
      <Typography variant="h6" gutterBottom>
        From the firehose
      </Typography>
      <Divider/>
      {posts.map(post => {
        return (
          <Card sx={{display: 'flex', marginTop: 4}}>
            <Box sx={{flex: 1}}>
              <CardContent>
                <Typography sx={{paddingTop: 2}} variant="h5" component="h2">
                  <Box fontWeight="fontWeightBold">
                    <Link href={post.slug} color="inherit" underline="none">{post.title}</Link>
                  </Box>
                </Typography>
                <Typography sx={{paddingTop: 1}} color="textSecondary">
                  {post.excerpt}
                </Typography>
                <Typography variant="body2" component="p" sx={{paddingTop: 2}} color="textSecondary">
                  {post.date} · {post.readMinutes} min read
                </Typography>
              </CardContent>
            </Box>
            <Hidden smDown>
              <CardMedia sx={{width: 200, height: 150}}
                         image={post.image.childImageSharp.gatsbyImageData.images.fallback.src} title={post.title}/>
            </Hidden>
          </Card>
        );
      })}
    </Grid>
  );
}
