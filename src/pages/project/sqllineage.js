import React, {useEffect} from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@material-ui/lab';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import GitHubIcon from "@material-ui/icons/GitHub";
import HotelIcon from '@material-ui/icons/Hotel';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import RepeatIcon from '@material-ui/icons/Repeat';
import {Area, AreaChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import Footer from "../../components/Footer";

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  paper: {
    padding: '6px 16px',
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
}));

const data = [
  {
    "time": "2019.6.16",
    "icon": HotelIcon,
    "title": "v0.0.1",
    "content": "初次发布",
    "color": "primary",
    "variant": "outlined"
  },
  {
    "time": "2019.7.26",
    "icon": LaptopMacIcon,
    "title": "v0.1.0",
    "content": "基本框架搭建完成",
    "color": "primary",
    "variant": "default"
  },
  {
    "time": "2020.4.11",
    "icon": LaptopMacIcon,
    "title": "v0.2.0",
    "content": "大量bug修复",
    "color": "primary",
    "variant": "default"
  },
  {
    "time": "2020.7.19",
    "icon": LaptopMacIcon,
    "title": "v0.3.0",
    "content": "支持语句粒度的血缘输出，生产可用",
    "color": "primary",
    "variant": "default"
  },
  {
    "time": "2020.8.6",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "首次收到用户邮件联络",
    "color": "secondary",
    "variant": "default"
  },
  {
    "time": "2020.8.29",
    "icon": LaptopMacIcon,
    "title": "v0.4.0",
    "content": "基于DAG的血缘表示及可视化",
    "color": "primary",
    "variant": "default"
  },
  {
    "time": "2020.9.27",
    "icon": LaptopMacIcon,
    "title": "v1.0.0",
    "content": "readthedocs托管文档，正式发布v1.0版本",
    "color": "primary",
    "variant": "default"
  },
  {
    "time": "2020.11.3",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "首次收到用户ISSUE",
    "color": "secondary",
    "variant": "default"
  },
  {
    "time": "2020.11.13",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "首次收到用户PR",
    "color": "secondary",
    "variant": "default"
  },
  {
    "time": "2021.1.17",
    "icon": LaptopMacIcon,
    "title": "v1.1.0",
    "content": "基于JavaScript的可视化方案",
    "color": "primary",
    "variant": "default"
  },
  {
    "time": "2021.4.18",
    "icon": LaptopMacIcon,
    "title": "v1.2.0",
    "content": "功能完备的前端界面",
    "color": "primary",
    "variant": "default"
  },
  {
    "time": "2021.10.20",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "GitHub Star数达到100",
    "color": "secondary",
    "variant": "default"
  },
  {
    "time": "2021.11.13",
    "icon": LaptopMacIcon,
    "title": "v1.3.0",
    "content": "字段级血缘解析",
    "color": "primary",
    "variant": "default"
  },
  {
    "time": "2021.12.01",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "SQLLineage入选PyCoder's Weekly邮件订阅，单日收获17个Star",
    "color": "secondary",
    "variant": "default"
  },
  {
    "time": "2021.12.10",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "单日下载1006次，首次突破1000+",
    "color": "secondary",
    "variant": "default"
  },
  {
    "time": "2021.5.17",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "单日下载8019次，首次突破5000+",
    "color": "secondary",
    "variant": "default"
  },
  {
    "time": "2021.6.3",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "GitHub Star数达到300",
    "color": "secondary",
    "variant": "default"
  },
]

const cards = [
  {
    title: "支持任意SQL方言",
    content: "SQLLineage底层的SQL解析库不对SQL方言做出任何限制，我们会尽力解析出您期待的结果",
    image: "https://images.unsplash.com/photo-1597008641621-cefdcf718025?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=937&q=80"

  },
  {
    title: "UI可视化",
    content: "SQLLineage通过cytoscapejs对血缘图进行可视化，前端React App可以独立部署",
    image: "https://images.unsplash.com/photo-1543946602-a0fce8117697?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    title: "API调用",
    content: "对于编程用户，SQLLineage也支持在命令行或在Python代码中直接调用",
    image: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
];


const SQLLineagePage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [download, setDownload] = React.useState(0);
  const [downloadDaily, setDownloadDaily] = React.useState(0);
  const [downloadWeekly, setDownloadWeekly] = React.useState(0);
  const [downloadTrend, setDownloadTrend] = React.useState([]);
  const [star, setStar] = React.useState(0);
  const [starTrend, setStarTrend] = React.useState([]);
  const [fork, setFork] = React.useState(0);
  const [openIssues, setOpenIssues] = React.useState(0);

  useEffect(() => {
    fetch("https://magpie-bridge.herokuapp.com/api/pypistats/api/packages/sqllineage/recent")
      .then(res => res.json())
      .then(
        (result) => {
          setDownload(result.data.last_month);
          setDownloadWeekly(result.data.last_week);
          setDownloadDaily(result.data.last_day)
        },
        (error) => {
          console.log(error)
        }
      )
    fetch("https://magpie-bridge.herokuapp.com/api/pypistats/api/packages/sqllineage/overall")
      .then(res => res.json())
      .then(
        (result) => {
          let date_cnt = result.data.length / 2;
          let trend = []
          for (let i = 0; i < date_cnt; i++) {
            trend.push({
              "name": result.data[i].date.slice(5, 10),
              "With_Mirrors": result.data[i].downloads,
              "Without_Mirrors": result.data[date_cnt + i].downloads
            })
          }
          setDownloadTrend(trend)
        },
        (error) => {
          console.log(error)
        }
      )
    fetch("https://magpie-bridge.herokuapp.com/api/github/repos/reata/sqllineage")
      .then(res => res.json())
      .then(
        (result) => {
          setStar(result.stargazers_count);
          setFork(result.forks_count);
          setOpenIssues(result.open_issues)
        },
        (error) => {
          console.log(error)
        }
      )
    fetch("https://magpie-bridge.herokuapp.com/api/starhistory/reata/sqllineage")
      .then(res => res.json())
      .then(
        (result) => {
          setStarTrend(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" noWrap>
              SQLLineage
            </Typography>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
              <Tab label="项目介绍" {...a11yProps(0)} />
              <Tab label="仪表盘" {...a11yProps(1)} />
              <Tab label="里程碑" {...a11yProps(2)} />
            </Tabs>
            <Link href="https://github.com/reata/sqllineage" color="inherit">
              <GitHubIcon/>
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              SQLLineage
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              SQLLineage是一个基于Python的SQL血缘分析工具。
              这个包可以方便地分析任意SQL的输入表、输出表，并提供UI可视化。免除你从头开始研究SQL解析的烦恼。
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary" href="https://sqllineage.herokuapp.com/">
                    Demo
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" href="https://pypi.org/project/sqllineage/">
                    安装
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.image}
                      title={card.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography>
                        {card.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>


      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          {[
            {
              title: "PyPI昨日下载量",
              data: downloadDaily
            },
            {
              title: "PyPI上周下载量",
              data: downloadWeekly
            },
            {
              title: "PyPI月下载量",
              data: download
            },
            {
              title: "GitHub Star",
              data: star
            },
            {
              title: "GitHub Fork",
              data: fork
            },
            {
              title: "GitHub Open Issues",
              data: openIssues
            }
          ].map(card => (
            <Grid item xs>
              <Card>
                <CardContent>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="h3">
                    {card.data}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container justify="center" className={classes.paper}>
          <Typography variant="h5">
            PyPI下载趋势
          </Typography>
          <LineChart
            width={1800}
            height={300}
            data={downloadTrend}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" minTickGap={20} />
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="With_Mirrors" stroke="#ea8f74" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="Without_Mirrors" stroke="#00516c"/>
          </LineChart>
        </Grid>

        <Grid container justify="center" className={classes.paper}>
          <Typography variant="h5">
            GitHub Star趋势
          </Typography>
          <AreaChart
            width={1800}
            height={300}
            data={starTrend}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date" minTickGap={50} />
            <YAxis/>
            <Area type="monotone" dataKey="star_cum_cnt" stroke="#00516c"/>
          </AreaChart>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Timeline align="alternate">
          {data.map(item => {
            return <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {item.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={item.color} variant={item.variant}>
                  <item.icon/>
                </TimelineDot>
                <TimelineConnector/>
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    {item.title}
                  </Typography>
                  <Typography>{item.content}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          })}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="inherit" variant="default">
                <FastfoodIcon/>
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  未完待续
                </Typography>
                <Typography>求知若饥，虚心若愚</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </TabPanel>
      <Footer/>
    </div>
  );
}

export default SQLLineagePage
