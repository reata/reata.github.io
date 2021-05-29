import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Container, Grid, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {graphql} from "gatsby";
import LinkIcon from "@material-ui/icons/Link";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


const GistPage = ({data}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="lg">
        <Header/>
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
    </React.Fragment>
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
