import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Container, Grid, makeStyles} from "@material-ui/core";
import Header from "../components/Header";
import MainFeaturedPost from "../components/MainFeaturedPost";
import FeaturedPost from "../components/FeaturedPost";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {graphql} from "gatsby";


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const IndexPage = ({data}) => {
  const classes = useStyles();

  let posts = data.allMarkdownRemark.nodes.map(node => node.frontmatter).sort((a, b) => a.date < b.date ? 1: -1);
  let mainFeaturedPost = posts[0];
  let featuredPosts = posts.slice(1, 3);
  let otherPosts = posts.slice(3, posts.length);

  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="lg">
        <Header/>
        <main>
          <MainFeaturedPost post={mainFeaturedPost}/>
          <FeaturedPost posts={featuredPosts}/>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Post posts={otherPosts}/>
            <Sidebar/>
          </Grid>
        </main>
      </Container>
      <Footer/>
    </React.Fragment>
  )
}

export default IndexPage


export const query = graphql`
query IndexPostQuery {
  allMarkdownRemark {
    nodes {
      frontmatter {
        date
        excerpt
        image {
          childImageSharp {
            gatsbyImageData(
              width: 1600
            )
          }
        }
        title
        slug
      }
    }
  }
}
`
