import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Grid, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Section from "../components/Section";
import Footer from "../components/Footer";
import {graphql} from "gatsby";
import LinkIcon from "@mui/icons-material/Link";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";


const GistPage = ({data}) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <Header/>
      <CssBaseline/>
      <Container maxWidth="lg">
        <Section/>
        <main>
          <Grid container justifyContent="center" alignItems="center" sx={{marginTop: 3}}>
            <Typography variant="h4" gutterBottom={true}>
              以Github Gist记录的心得体会
            </Typography>
            {data.site.siteMetadata.gists.map(gist => {
              return <ListItem button component="a" href={gist.link} target="_blank">
                <ListItemIcon>
                  <LinkIcon/>
                </ListItemIcon>
                <ListItemText primary={gist.title}/>
              </ListItem>
            })}
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
