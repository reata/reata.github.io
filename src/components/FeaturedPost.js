import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export default function FeaturedPost(props) {
  const { posts } = props;

  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid key={post.slug} size={{ xs: 12, md: 6 }}>
          <CardActionArea component="a" href={post.slug}>
            <Card sx={{ display: "flex" }}>
              <Box sx={{ flex: 1 }}>
                <CardContent>
                  <Box sx={{ minHeight: 90 }}>
                    <Typography component="h2" variant="h5">
                      <Box sx={{ fontWeight: "bold" }}>{post.title}</Box>
                    </Typography>
                    <Typography color="text.secondary">
                      {post.excerpt}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2 }}
                    color="text.secondary"
                  >
                    {post.date} · {post.readMinutes} min read
                  </Typography>
                </CardContent>
              </Box>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <CardMedia
                  sx={{ width: 160 }}
                  image={
                    post.image.childImageSharp.gatsbyImageData.images.fallback
                      .src
                  }
                  title={post.title}
                />
              </Box>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
}
