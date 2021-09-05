import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Container, Grid, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import Section from "../components/Section";
import Footer from "../components/Footer";
import {graphql} from "gatsby";
import LinkIcon from "@material-ui/icons/Link";
import Typography from "@material-ui/core/Typography";
import Header from "../components/Header";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


const GistPage = ({data}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header/>
      <CssBaseline/>
      <Container maxWidth="lg">
        <Section/>
        <main>
          <Grid container justify="center" alignItems="center" className={classes.mainGrid}>
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
    </div>
  )
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
