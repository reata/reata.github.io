import React from 'react';
import { Container, Divider, Grid } from "@mui/material";
import Section from "../components/Section";
import MainFeaturedPost from "../components/MainFeaturedPost";
import FeaturedPost from "../components/FeaturedPost";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {graphql} from "gatsby";
import readingTime from "../utils/readingTime";


const IndexPage = ({data}) => {

  let posts = data.allMarkdownRemark.nodes.map(node => {
    return {...{"readMinutes": readingTime(node.rawMarkdownBody)}, ...node.frontmatter}
  }).sort((a, b) => a.date < b.date ? 1 : -1);
  let mainFeaturedPost = posts[0];
  let featuredPosts = posts.slice(1, 3);
  let otherPosts = posts.slice(3, posts.length);

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Section/>
        <main>
          <MainFeaturedPost post={mainFeaturedPost}/>
          <FeaturedPost posts={featuredPosts}/>
          <Grid container spacing={5} sx={{marginTop: 3}}>
            <Post posts={otherPosts}/>
            <Divider orientation="vertical" flexItem style={{marginRight: "-1px"}}/>
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
      rawMarkdownBody
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
