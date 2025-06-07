import React from "react"
import {graphql} from "gatsby"
import { Box, Container, Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import Section from "../components/Section";
import Footer from "../components/Footer";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import readingTime from "../utils/readingTime";
import Giscus from "@giscus/react";

// A huge thanks for Project medium.css: https://github.com/lucagez/medium.css
const BlogContent = styled('div')(() => ({
  width: 740,
  "& h2": {
    fontFamily: "Lato",
    fontSize: 26,
    fontWeight: 700,
    padding: 0,
    margin: "56px 0 -13px -1.883px",
    textAlign: "left",
    lineHeight: "34.5px",
    letterSpacing: -0.45,
  },
  "& p": {
    marginTop: 21,
    fontFamily: "Lora",
    fontSize: 21,
    letterSpacing: -0.03,
    lineHeight: 1.58,
  },
  "& li": {
    fontFamily: "Lora",
    fontSize: 21,
    letterSpacing: -0.03,
    lineHeight: 1.58,
  },
  "& pre": {
    overflowX: "auto",
    fontFamily: "Solaris",
    fontStyle: "italic",
    letterSpacing: -0.36,
    margin: "45px 0 23px 0",
    color: "rgba(0, 0, 0, 0.68)",
    backgroundColor: "rgba(240,240,240,0.68)"
  }
}));

export default function Template({data}) {
  const {markdownRemark} = data // data.markdownRemark holds your post data
  const {frontmatter, html, rawMarkdownBody} = markdownRemark
  const readMinutes = readingTime(rawMarkdownBody);

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Section/>
        <main>
          <Grid container spacing={1} sx={{marginTop: 5, marginBottom: 5}}>
            <Grid item xs={6}>
              <Box sx={{padding: '6 6 0 0'}}>
                <h1 style={{
                  fontFamily: "Playfair Display",
                  fontSize: 48,
                  textAlign: "left",
                  marginBottom: 8
                }}>{frontmatter.title}</h1>
                <subtitle style={{
                  fontFamily: "Lato",
                  fontSize: 21,
                  color: "rgba(0, 0, 0, 0.54)",
                }}>
                  {frontmatter.excerpt}
                </subtitle>
                <Box sx={{
                  fontFamily: "Lato",
                  fontSize: 16,
                  fontWeight: 400,
                  marginTop: 2
                }}>
                  <a href="https://reata.github.io/">Reata</a>
                </Box>
                <Box sx={{color: "rgba(0, 0, 0, 0.54)"}}>
                  {frontmatter.date} <span className="median-divider">·</span> {readMinutes} min
                  read
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <GatsbyImage alt="" image={getImage(frontmatter.image)}/>
              </Paper>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <BlogContent>
              <Box dangerouslySetInnerHTML={{__html: html}}/>
            </BlogContent>
          </Grid>
          <Grid>
            <Giscus
                id="comment"
                repo="reata/reata.github.io"
                repoId="MDEwOlJlcG9zaXRvcnk3ODg0OTA1MQ=="
                category="Announcements"
                categoryId="DIC_kwDOBLMkG84Cq411"
                mapping="pathname"
                strict="0"
                reactionsEnabled="0"
                emitMetadata="0"
                inputPosition="top"
                theme="light"
                lang="zh-CN"
                loading="lazy"
                async>
            </Giscus>
          </Grid>
        </main>
      </Container>
      <Footer/>
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        excerpt
        image {
          childImageSharp {
            gatsbyImageData(
              height: 1600
            )
          }
        }
      }
    }
  }
`
