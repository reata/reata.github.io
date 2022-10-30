import React from 'react';
import {Box, Container, Grid, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
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
          <Grid container justifyContent="center" alignItems="center" sx={{marginTop: 3}}>
            <Typography variant="h4" gutterBottom={true}>
              代码拾遗 via Github Gist
            </Typography>
            <List>
              {data.site.siteMetadata.gists.map(gist => {
                return <ListItem button component="a" href={gist.link} target="_blank">
                  <ListItemIcon>
                    <LinkIcon/>
                  </ListItemIcon>
                  <ListItemText primary={gist.title}/>
                </ListItem>
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
