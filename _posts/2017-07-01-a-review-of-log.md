---
title: "重新认识日志"
excerpt: "只是人类可读的DEBUG信息吗"
header:
  overlay_image: assets/images/log.png
  overlay_filter: 0.4
  caption: "图片引用自https://content.linkedin.com/content/dam/engineering/en-us/blog/migrated/log.png"
categories:
  - big-data
  - log
tags:
  - big data
  - event stream
  - real-time data
author: "胡俊伟"
date: "1 July 2017"
---

什么是日志？在非常长的一段时间内，日志对我来说，就是协助定位系统问题的一种手段。在开发阶段我打了非常多DEBUG级别的日志协助调试，到了线上，我们只保留INFO级别以上的日志。这样，在系统出现和我们预期不符的状况时，通过日志，我可以定位到异常发生时的一些信息。这就是日志所有的作用了。tailf几乎是我会对日志去做的唯一操作。

所以，当来到大数据领域，我听到人们都在说，我们需要一套日志系统，我一直很迷茫。[ELK](https://www.elastic.co/cn/products)可能是最容易搭建的日志系统。`Logstash`抽取硬盘上的日志文件，发送到`Elastic Search`，最后通过`Kibana`进行可视化。但我见过的`ELK`实践，依然没有改变那个最初的定位，我们还是在通过日志系统查询系统异常。这和大数据又有什么关系？

某种程度上，日志系统也成为了[Teenage Sex](https://whatsthebigdata.com/2013/06/03/big-data-quotes/)。所有人都在谈论它，可是没有太多人知道它究竟是什么。

直到有一天，我们读写分离的系统遭遇了严重的主从不同步问题，我好奇地想搜索一下MySQL的主从同步究竟是通过什么机制来实现的，我知道了MySQL的**binary log**这个东西，从此打开了新世界的大门。

具体的细节可以参见这篇[博客](https://www.percona.com/blog/2013/01/09/how-does-mysql-replication-really-work/)，但简单地说，主实例的所有INSERT和UPDATE操作事件，都会被发布到binlog中，而从实例只要同步这个日志并尽可能快地执行日志中的变更即可。主从同步延迟问题的排查也就变得容易入手，从实例或者无法及时同步，或者无法及时执行。反过来说，只要从实例严格执行了主实例发布的所有事件日志，主从一定处于同步状态。

binlog设计之初，就是供机器阅读的，它忠实记录了发生的事件和时间。把它看做一个数据结构，binlog只允许唯一一个操作，那就是**追加 append**。依次执行所有这些事件，就能来到最新的状态。就像只要知道所有的交易记录，我总能知道你的账户余额。

数据操作事件Log和数据库表Table，这两个概念在这里奇妙地合二为一。甚至Log比Table更棒，Table永远只有最新的状态，而通过Log，我可以来到任何中间状态。

### 日志系统才应该是数据的核心，而不是数据仓库

未完待续

### 参考阅读

1. [The Log: What every software engineer should know about real-time data's unifying abstraction](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying)（强烈推荐，必读）
2. [How does MySQL Replication really work?](https://www.percona.com/blog/2013/01/09/how-does-mysql-replication-really-work/)
