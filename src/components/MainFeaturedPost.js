import React from 'react';
import {Box, CardActionArea, Grid, Paper, Typography} from '@mui/material';


export default function MainFeaturedPost(props) {
  const {post} = props;
  const imageUrl = post.image.childImageSharp.gatsbyImageData.images.fallback.src;

  return (
    <Paper sx={{
      position: 'relative',
      color: 'white',
      marginBottom: 4,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)'
      }}/>
      <Grid container>
        <Grid item md={12}>
          <CardActionArea component="a" href={post.slug}>
            <Box sx={{
              position: 'relative',
              padding: 3,
            }}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                <Box fontWeight="fontWeightBold">
                  {post.title}
                </Box>
              </Typography>
              <Typography variant="h6" color="inherit">
                {post.excerpt}
              </Typography>
              <Typography sx={{paddingTop: '30px'}} variant="body1" color="inherit" paragraph>
                {post.date} · {post.readMinutes} min read
              </Typography>
            </Box>
          </CardActionArea>
        </Grid>
      </Grid>
    </Paper>
  );
}
