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
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@mui/lab';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import GitHubIcon from "@mui/icons-material/GitHub";
import HotelIcon from '@mui/icons-material/Hotel';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import RepeatIcon from '@mui/icons-material/Repeat';
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
        <Box sx={{p: 3}}>
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
    "variant": "filled"
  },
  {
    "time": "2020.4.11",
    "icon": LaptopMacIcon,
    "title": "v0.2.0",
    "content": "大量bug修复",
    "color": "primary",
    "variant": "filled"
  },
  {
    "time": "2020.7.19",
    "icon": LaptopMacIcon,
    "title": "v0.3.0",
    "content": "支持语句粒度的血缘输出，生产可用",
    "color": "primary",
    "variant": "filled"
  },
  {
    "time": "2020.8.6",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "首次收到用户邮件联络",
    "color": "secondary",
    "variant": "filled"
  },
  {
    "time": "2020.8.29",
    "icon": LaptopMacIcon,
    "title": "v0.4.0",
    "content": "基于DAG的血缘表示及可视化",
    "color": "primary",
    "variant": "filled"
  },
  {
    "time": "2020.9.27",
    "icon": LaptopMacIcon,
    "title": "v1.0.0",
    "content": "readthedocs托管文档，正式发布v1.0版本",
    "color": "primary",
    "variant": "filled"
  },
  {
    "time": "2020.11.3",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "首次收到用户ISSUE",
    "color": "secondary",
    "variant": "filled"
  },
  {
    "time": "2020.11.13",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "首次收到用户PR",
    "color": "secondary",
    "variant": "filled"
  },
  {
    "time": "2021.1.17",
    "icon": LaptopMacIcon,
    "title": "v1.1.0",
    "content": "基于JavaScript的可视化方案",
    "color": "primary",
    "variant": "filled"
  },
  {
    "time": "2021.4.18",
    "icon": LaptopMacIcon,
    "title": "v1.2.0",
    "content": "功能完备的前端界面",
    "color": "primary",
    "variant": "filled"
  },
  {
    "time": "2021.10.20",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "GitHub Star数达到100",
    "color": "secondary",
    "variant": "filled"
  },
  {
    "time": "2021.11.13",
    "icon": LaptopMacIcon,
    "title": "v1.3.0",
    "content": "字段级血缘解析",
    "color": "primary",
    "variant": "filled"
  },
  {
    "time": "2021.12.01",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "SQLLineage入选PyCoder's Weekly邮件订阅，单日收获17个Star",
    "color": "secondary",
    "variant": "filled"
  },
  {
    "time": "2021.12.10",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "单日下载1006次，首次突破1000+",
    "color": "secondary",
    "variant": "filled"
  },
  {
    "time": "2022.5.17",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "单日下载8019次，首次突破5000+",
    "color": "secondary",
    "variant": "filled"
  },
  {
    "time": "2022.6.3",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "GitHub Star数达到300",
    "color": "secondary",
    "variant": "filled"
  },
  {
    "time": "2022.9.1",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "SQLLineage入选PyPI critical project",
    "color": "secondary",
    "variant": "filled"
  },
  {
    "time": "2022.10.25",
    "icon": RepeatIcon,
    "title": "社区动态",
    "content": "单日下载10065次，首次突破10000+",
    "color": "secondary",
    "variant": "filled"
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

const backend_api = "https://sqllineage.azurewebsites.net"


const SQLLineagePage = () => {
  const [value, setValue] = React.useState(0);
  const [download, setDownload] = React.useState(0);
  const [downloadDaily, setDownloadDaily] = React.useState(0);
  const [downloadWeekly, setDownloadWeekly] = React.useState(0);
  const [downloadTrend, setDownloadTrend] = React.useState([]);
  const [dimensionAttribute, setDimensionAttribute] = React.useState({});
  const [dimension, setDimension] = React.useState("overall");
  const [star, setStar] = React.useState(0);
  const [starTrend, setStarTrend] = React.useState([]);
  const [fork, setFork] = React.useState(0);
  const [openIssues, setOpenIssues] = React.useState(0);

  useEffect(() => {
    fetch(`${backend_api}/api/pypistats/api/packages/sqllineage/recent`)
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
    fetch(`${backend_api}/api/github/repos/reata/sqllineage`)
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
    fetch(`${backend_api}/api/starhistory/reata/sqllineage`)
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

  useEffect(() => {
    fetch(`${backend_api}/api/pypistats/api/packages/sqllineage/${dimension}`)
      .then(res => res.json())
      .then(
        (result) => {
          let categories = {};
          let date_to_cnt = {};
          for (let i = 0; i < result.data.length; i++) {
            let data = result.data[i];
            categories[data.category] = false;
            let date = data.date.slice(5, 10);
            if (!date_to_cnt.hasOwnProperty(date)) {
              date_to_cnt[date] = {}
            }
            date_to_cnt[date][data.category] = data.downloads
          }
          let trend = []
          for (const key of Object.keys(date_to_cnt).sort()) {
            let value = date_to_cnt[key]
            value["name"] = key;
            trend.push(value)
          }
          setDimensionAttribute(categories)
          setDownloadTrend(trend)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [dimension])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelect = (event) => {
    setDimension(event.target.value);
  };

  const selectCategory = (event) => {
    let category = {...dimensionAttribute};
    category[event.value] = !category[event.value]
    setDimensionAttribute(category)
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
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
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
              textColor="default"
              indicatorColor="secondary"
            >
              <Tab label="项目介绍" {...a11yProps(0)} />
              <Tab label="仪表盘" {...a11yProps(1)} />
              <Tab label="里程碑" {...a11yProps(2)} />
            </Tabs>
            <Link
              href="https://github.com/reata/sqllineage"
              color="inherit"
              underline="hover">
              <GitHubIcon/>
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box sx={{paddingTop: 8, paddingBottom: 6}}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              SQLLineage
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              SQLLineage是一个基于Python的SQL血缘分析工具。
              这个包可以方便地分析任意SQL的输入表、输出表，并提供UI可视化。免除你从头开始研究SQL解析的烦恼。
            </Typography>
            <Box sx={{marginTop: 2}}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary" href="https://reata.github.io/sqllineage/">
                    Demo
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" href="https://pypi.org/project/sqllineage/">
                    安装
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Container sx={{paddingTop: 6}} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      sx={{paddingTop: '56.25%'}} // 16:9
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
        </Box>


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
        <Grid container justifyContent="center" sx={{paddingTop: 2, paddingBottom: 1}}>
          <Grid container justifyContent="space-between">
            <Grid item xs={1}>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                PyPI下载趋势
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <FormControl fullWidth>
                <InputLabel>分类</InputLabel>
                <Select
                  value={dimension}
                  label="Compare By"
                  onChange={handleSelect}
                >
                  <MenuItem value={"overall"}>总体趋势</MenuItem>
                  <MenuItem value={"python_minor"}>Python版本</MenuItem>
                  <MenuItem value={"system"}>操作系统</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

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
            <XAxis dataKey="name" minTickGap={20}/>
            <YAxis/>
            <Tooltip/>
            <Legend
              onClick={selectCategory}
            />
            {Object.entries(dimensionAttribute).map((category) => {
              let stroke = {
                with_mirrors: "#ea8f74",
                without_mirrors: "#00516c",
                "2.7": "#0497a0",
                "3.5": "#32c1d2",
                "3.6": "#f05a40",
                "3.7": "#ea8f74",
                "3.8": "#00516c",
                "3.9": "#993f4e",
                "3.10": "#076ea0",
                "3.11": "#e0b163",
                Linux: "#00516c",
                Darwin: "#ea8f74",
                Windows: "#993f4e",
                null: "#a6a8aa",
              }
              return <Line type="monotone" dataKey={category[0]} stroke={stroke[category[0]]} hide={category[1]}/>
            })}
          </LineChart>
        </Grid>

        <Grid container justifyContent="center">
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
            <XAxis dataKey="date" minTickGap={50}/>
            <YAxis/>
            <Area type="monotone" dataKey="star_cum_cnt" stroke="#00516c"/>
          </AreaChart>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Timeline position="alternate">
          {data.map(item => {
            return <TimelineItem
              align="right"
              variant="body2"
              color="text.secondary"
            >
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
                <Typography variant="h5" component="span">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1">{item.content}</Typography>
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
              <Typography variant="h5" component="span">
                未完待续
              </Typography>
              <Typography>求知若饥，虚心若愚</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </TabPanel>
      <Footer/>
    </Box>
  );
}

export default SQLLineagePage
