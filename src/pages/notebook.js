import React from 'react';
import {graphql} from 'gatsby'
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles
} from "@material-ui/core";
import LinkIcon from '@material-ui/icons/Link';
import Section from "../components/Section";
import Footer from "../components/Footer";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Header from "../components/Header";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


const NotebookPage = ({data}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header/>
      <CssBaseline/>
      <Container maxWidth="lg">
        <Section/>
        <main>
          <Grid container justify="center" alignItems="center" className={classes.mainGrid}>
            <Typography variant="h4" gutterBottom={true}>
              以Jupyter Notebook记录的学习笔记
            </Typography>
            {data.site.siteMetadata.notebooks.map(notebook => {
              return <Container>
                <Divider/>
                <List
                  component="nav"
                  subheader={
                    <ListSubheader component="div">
                      {notebook.title}
                    </ListSubheader>
                  }
                  className={classes.root}
                >
                  {notebook.children.map((child1) => {
                    if (child1.children !== null) {
                      return <Container>
                        <ListItem>
                          <ListItemText primary={child1.title} className={classes.secondaryHeading}/>
                        </ListItem>
                        <List component="div" disablePadding>
                          {child1.children.map((child2) => {
                            return <ListItem className={classes.nested} button component="a" href={child2.link}
                                             target="_blank">
                              <ListItemIcon>
                                <LinkIcon/>
                              </ListItemIcon>
                              <ListItemText primary={child2.title}/>
                            </ListItem>
                          })}
                        </List>
                      </Container>
                    } else {
                      return <ListItem className={classes.nested} button component="a" href={child1.link}
                                       target="_blank">
                        <ListItemIcon>
                          <LinkIcon/>
                        </ListItemIcon>
                        <ListItemText primary={child1.title}/>
                      </ListItem>
                    }
                  })}
                </List>
              </Container>
            })}
          </Grid>
        </main>
      </Container>
      <Footer/>
    </React.Fragment>
  )
}

export default NotebookPage

export const query = graphql`
query NotebookPageQuery {
  site {
    siteMetadata {
      notebooks {
        title
        children {
          title
          link
          children {
            title
            link
          }
        }
      }
    }
  }
}`
