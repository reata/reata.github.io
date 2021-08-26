import React from 'react';
import {
  AppBar,
  Box,
  Card,
  CardContent,
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

const useStyles = makeStyles({
  paper: {
    padding: '6px 16px',
  },
});

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
]

const SQLLineagePage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
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
        SQLLineage是一个基于Python的SQL血缘分析工具。
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  PyPI Monthly Download
                </Typography>
                <Typography variant="h3">
                  14,573
                </Typography>
                <Typography variant="subtitle1">
                  As of 08/26/2021
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  GitHub Star
                </Typography>
                <Typography variant="h3">
                  75
                </Typography>
                <Typography variant="subtitle1">
                  As of 08/26/2021
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Demo App Montly PV
                </Typography>
                <Typography variant="h3">
                  67854
                </Typography>
                <Typography variant="subtitle1">
                  As of 08/26/2021
                </Typography>
              </CardContent>
            </Card>
          </Grid>
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
    </div>
  );
}

export default SQLLineagePage
