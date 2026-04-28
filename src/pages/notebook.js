import React from "react";
import { graphql } from "gatsby";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import Section from "../components/Section";
import Footer from "../components/Footer";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const NotebookPage = ({ data }) => {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Section />
        <main>
          <Grid
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Typography variant="h4" gutterBottom={true}>
              学习笔记 via Jupyter Notebook
            </Typography>
            {data.site.siteMetadata.notebooks.map((notebook) => {
              return (
                <Container>
                  <Divider />
                  <List
                    component="nav"
                    subheader={
                      <ListSubheader component="div">
                        {notebook.title}
                      </ListSubheader>
                    }
                  >
                    {notebook.children.map((child1) => {
                      if (child1.children !== null) {
                        return (
                          <Container>
                            <ListItem>
                              <ListItemText
                                primary={child1.title}
                                sx={{ color: "text.secondary" }}
                              />
                            </ListItem>
                            <List component="div" disablePadding>
                              {child1.children.map((child2) => {
                                return (
                                  <ListItemButton
                                    sx={{ paddingLeft: 4 }}
                                    component="a"
                                    href={child2.link}
                                    target="_blank"
                                  >
                                    <ListItemIcon>
                                      <LinkIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={child2.title} />
                                  </ListItemButton>
                                );
                              })}
                            </List>
                          </Container>
                        );
                      } else {
                        return (
                          <ListItemButton
                            sx={{ paddingLeft: 4 }}
                            component="a"
                            href={child1.link}
                            target="_blank"
                          >
                            <ListItemIcon>
                              <LinkIcon />
                            </ListItemIcon>
                            <ListItemText primary={child1.title} />
                          </ListItemButton>
                        );
                      }
                    })}
                  </List>
                </Container>
              );
            })}
          </Grid>
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default NotebookPage;

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
  }
`;
