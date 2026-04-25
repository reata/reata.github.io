import React from 'react';
import {Box, Container, Grid, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Section from "../components/Section";
import Footer from "../components/Footer";
import {graphql} from "gatsby";
import LinkIcon from "@mui/icons-material/Link";
import Typography from "@mui/material/Typography";


const GistPage = ({data}) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <Container maxWidth="lg">
        <Section/>
        <main>
          <Grid container sx={{ justifyContent: "center", alignItems: "center", marginTop: 3}}>
            <Typography variant="h4" gutterBottom={true}>
              代码拾遗 via Github Gist
            </Typography>
            <List>
              {data.site.siteMetadata.gists.map(gist => {
                return <ListItemButton component="a" href={gist.link} target="_blank">
                  <ListItemIcon>
                    <LinkIcon/>
                  </ListItemIcon>
                  <ListItemText primary={gist.title}/>
                </ListItemButton>
              })}
            </List>
          </Grid>
        </main>
      </Container>
      <Footer/>
    </Box>
  );
}

export default GistPage;

export const query = graphql`
query GistPageQuery {
  site {
    siteMetadata {
      gists {
        title
        link
      }
    }
  }
}`
