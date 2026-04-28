import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

export default function Post(props) {
  const { posts } = props;

  return (
    <Grid
      size={{ xs: 12, md: 8 }}
      sx={{ paddingRight: 2, borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
    >
      <Typography variant="h6" gutterBottom>
        From the firehose
      </Typography>
      <Divider />
      {posts.map((post) => {
        return (
          <Card key={post.slug} sx={{ display: "flex", marginTop: 4 }}>
            <Box sx={{ flex: 1 }}>
              <CardContent>
                <Typography sx={{ paddingTop: 2 }} variant="h5" component="h2">
                  <Box sx={{ fontWeight: "bold" }}>
                    <Link href={post.slug} color="inherit" underline="none">
                      {post.title}
                    </Link>
                  </Box>
                </Typography>
                <Typography sx={{ paddingTop: 1 }} color="text.secondary">
                  {post.excerpt}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{ paddingTop: 2 }}
                  color="text.secondary"
                >
                  {post.date} · {post.readMinutes} min read
                </Typography>
              </CardContent>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <CardMedia
                sx={{ width: 200, height: 150 }}
                image={
                  post.image.childImageSharp.gatsbyImageData.images.fallback.src
                }
                title={post.title}
              />
            </Box>
          </Card>
        );
      })}
    </Grid>
  );
}
