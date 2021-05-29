import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Container, Grid, Link, makeStyles} from "@material-ui/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


const AboutPage = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="lg">
        <Header/>
        <main>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Typography variant="h4" gutterBottom={true}>
              关于我
            </Typography>
            <Typography variant="h6" paragraph={true}>
              如果当年接受硕转博，我现在应该正埋首于无聊的政策计量研究。感谢舍恩伯格，带我来到
              <Link href="https://hbr.org/2012/10/data-scientist-the-sexiest-job-of-the-21st-century" target="_blank">
                性感
              </Link>的
              <Link href="https://book.douban.com/subject/20429677/" target="_blank">
                《大数据时代》
              </Link>。
              从自学Hello World起，我先后参与过APP后端开发、爬虫开发、基础设施中间件开发、数据仓库开发、大数据平台开发，算是在数据产生、流转、处理、应用的整条管道上都做过螺丝钉。
            </Typography>
            <Typography variant="h6" paragraph={true}>
              目前个人的主要技术领域集中在数据平台/数据应用，对于分布式任务调度系统、元数据管理/数据治理、ETL开发、数据质量、数据服务等模块有一线的系统设计、
              开发和推动上线经验。参与过机器学习算法平台、自助可视化报表平台的调研和设计。长期和数据仓库工程师、数据挖掘工程师合作，对于数仓建模理论、
              机器学习算法也都有一定程度的了解。在从事数据开发期间，也有过面向上千台机器的集群、数百TB～PB级别的数据处理和调优经历。
            </Typography>
            <Typography variant="h6" paragraph={true}>
              感谢访问我的博客，联系本人可点击首页邮箱。
            </Typography>
          </Grid>
        </main>
      </Container>
      <Footer/>
    </React.Fragment>
  )
}

export default AboutPage
