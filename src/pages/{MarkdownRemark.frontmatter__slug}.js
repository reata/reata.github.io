import React from "react"
import {graphql} from "gatsby"
import CssBaseline from "@material-ui/core/CssBaseline";
import {Box, Container, Grid, makeStyles, Paper} from "@material-ui/core";
import Section from "../components/Section";
import Footer from "../components/Footer";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import Header from "../components/Header";
import readingTime from "../utils/readingTime";

// A huge thanks for Project medium.css: https://github.com/lucagez/medium.css
const useStyles = makeStyles((theme) => ({
  blogPostHeader: {
    margin: 10,
  },
  blogInfo: {
    padding: theme.spacing(6, 6, 0, 0),
  },
  authorName: {
    fontFamily: "Lato",
    fontSize: 16,
    fontWeight: 400,
    marginTop: theme.spacing(2)
  },
  authorSub: {
    color: "rgba(0, 0, 0, 0.54)"
  },
  blogTitle: {
    fontFamily: "Playfair Display",
    fontSize: 48,
    textAlign: "left",
    marginBottom: 8,
  },
  blogExcerpt: {
    fontFamily: "Lato",
    fontSize: 21,
    color: "rgba(0, 0, 0, 0.54)",
  },
  blogPostContent: {
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
    },
  }
}));

export default function Template({data}) {
  const {markdownRemark} = data // data.markdownRemark holds your post data
  const {frontmatter, html, rawMarkdownBody} = markdownRemark
  const readMinutes = readingTime(rawMarkdownBody);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header/>
      <CssBaseline/>
      <Container maxWidth="lg">
        <Section/>
        <main>
          <Grid container spacing={1} className={classes.blogPostHeader}>
            <Grid item xs={6}>
              <Box className={classes.blogInfo}>
                <h1 className={classes.blogTitle}>{frontmatter.title}</h1>
                <subtitle className={classes.blogExcerpt}>{frontmatter.excerpt}</subtitle>
                <Box className={classes.authorName}><a href="https://reata.github.io/">Reata</a></Box>
                <Box className={classes.authorSub}>{frontmatter.date} <span className="median-divider">·</span> {readMinutes} min
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
          <Grid container justify="center" alignItems="center">
            <Box className={classes.blogPostContent} dangerouslySetInnerHTML={{__html: html}}/>
          </Grid>
        </main>
      </Container>
      <Footer/>
    </React.Fragment>
  )
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
