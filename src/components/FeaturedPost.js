import React from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, Grid, Hidden, Typography} from '@mui/material';


export default function FeaturedPost(props) {
  const {posts} = props;

  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item xs={12} md={6}>
          <CardActionArea component="a" href={post.slug}>
            <Card sx={{display: 'flex'}}>
              <Box sx={{flex: 1}}>
                <CardContent>
                  <Box sx={{minHeight: 90}}>
                    <Typography component="h2" variant="h5">
                      <Box fontWeight="fontWeightBold">
                        {post.title}
                      </Box>
                    </Typography>
                    <Typography color="textSecondary">
                      {post.excerpt}
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph color="textSecondary">
                    {post.date} · {post.readMinutes} min read
                  </Typography>
                </CardContent>
              </Box>
              <Hidden smDown>
                <CardMedia sx={{width: 160}}
                           image={post.image.childImageSharp.gatsbyImageData.images.fallback.src} title={post.title}/>
              </Hidden>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
}
