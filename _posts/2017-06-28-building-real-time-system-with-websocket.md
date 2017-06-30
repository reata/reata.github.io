---
title: "从Websocket说起，实时数据系统演进"
excerpt: "拥抱事件驱动"
header:
  overlay_image: assets/images/websocket.png
  overlay_filter: 0.4
  caption: ""
categories:
  - web
  - realtime
tags:
  - web development
  - websocket
  - event-driven
  - real-time system
  - tornado
author: "胡俊伟"
date: "28 June 2017"
---

实时数据大概可以算是数据开发人员所面临的最常见的伪需求。实时的Dashboard老实说并不会带来如想象中那么多的数据洞见，但其带来的心理感受足以安抚一大片非技术人员的。看着当天的数字不断地在跳动，公司的投入毕竟没有白费。

于是工程师们一言不合地搭建起实时数据管道，一番工作后，一切就绪，打开浏览器，竟愕然发现，浏览器在不断地刷新！所以说，实时数据都是刷新出来的！公司有没有新的订单，完完全全取决于浏览器它刷新不刷新？！不刷新，我们就没有新订单，这也太反直觉了吧！于是兼职前端的Web开发终于放弃了上古时代的技术，用Ajax做了数据异步加载，刷新的过程用户变得无法感知。但仍然，这不是一个真正意义上的实时系统。

真正意义的实时系统，我们希望用户在下单这个动作发生时，更准确地说，通常是在支付成功时，后台的数据系统里可以及时看到今日订单数据变化。所谓及时，就是说除去必不可少的系统损耗外，数据流向的整条链路上是不应该存在轮询动作的，整个流程都应该由支付这个事件驱动。更不必说，轮询还意味着资源的浪费。

HTTP1.1及之前的协议，都建立在请求-响应模型之上，所有的通信需要客户端（也就是浏览器）主动发起。服务端即便感知到支付事件，也没有机制可以通过HTTP协议将消息推送到浏览器。而**Websocket**协议实现了服务端和浏览器的双向通信，本篇博文将以Websocket为起点，从前端逐步往后端地打造整个基于事件驱动的实时数据系统。示例使用`Tornado`框架，代码可以在这个[仓库](https://github.com/reata/real-time-dashboard-example)中找到.

<div style="text-align:center" markdown="1">
![websocket]({{ site.url }}{{ site.baseurl }}/assets/images/websocket.png)
</div>

### 洪荒时代，Monolithic架构

代码参见`feature/v0.1_monolithic`分支。简单设计两个接口：

订单模块的`ApiHandler`用来处理第三方支付平台的支付成功回调信息。在整个请求-响应过程中，通过DB操作，更新订单信息。HTTP请求结束之后，查询当前的订单信息，将该消息发送到报表模块所有的Websocket客户端：

``` python
class ApiHandler(web.RequestHandler):
    """订单模块支付宝支付成功回调接口"""

    @web.asynchronous
    def get(self, *args):
        # 回调逻辑，数据库写入
        order_id = int(self.get_argument("id"))
        order_amount = int(self.get_argument("amount"))

        new_order_flag = False
        if session.query(Order.id).filter_by(id=order_id).scalar():
            # 支付成功重复回调的情况，严谨起见还应该处理回调信息不一致的情况
            print("重复回调")
            pass
        else:
            # 增加订单记录；现实世界中，这里通常是改变订单的状态
            session.add(Order(id=order_id, amount=order_amount))
            session.commit()
            new_order_flag = True
        self.finish()
        # 请求完成后，异步通过ws发送消息到客户端
        if new_order_flag:
            data = {"cnt": session.query(Order).count(), "amount": session.query(func.sum(Order.amount)).scalar()}
            data = json.dumps(data)
            for c in rpt_ws_cl:
                c.write_message(data)
```

报表模块的`SocketHandler`接受浏览器发出的Websocket连接请求，将发起连接的用户加入到`rpt_ws_cl`变量中，并查询订单模块的数据库获取当前数据作为初始值，发送给客户端。

```python                
class SocketHandler(websocket.WebSocketHandler):
    """报表模块websocket连接"""

    def check_origin(self, origin):
        return True

    def open(self):
        # 查询今日订单
        if self not in rpt_ws_cl:
            rpt_ws_cl.append(self)
            self.write_message(json.dumps({"cnt": session.query(Order).count(),
                                           "amount": session.query(func.sum(Order.amount)).scalar()}))

    def on_close(self):
        if self in rpt_ws_cl:
            rpt_ws_cl.remove(self)
```

这个阶段的架构图如下所示：

<img src="https://raw.githubusercontent.com/reata/real-time-dashboard-example/feature/v0.1_monolithic/architecture.png" width="100%" height="100%">

这里尽管我们区分了报表模块和订单模块，但实际上他们属于同一个Tornado应用。并且，模块之间的界限也很模糊。订单模块在收到支付回调请求，完成自身逻辑后，直接访问了报表模块的Websocket客户端列表。而报表模块在收到客户端连接请求时，为了获取初始数据，也直接访问了订单模块的数据库。而它们本不应该这样交互。在这样的交互逻辑下，我们认为，所谓报表模块只是订单模块所提供的一个管理后台也无不可。

但事实不是这样，可以想见，当业务量扩大之后，报表模块会需要来自更多模块的数据，比如网站的PV/UV，这是订单模块所不能提供的。订单和报表从逻辑上说就不是一体。

模块切分的另一个用意在于，当业务发展到某个阶段，流量爆发式增长，在已经做了读写分离方案的前提下，连写的数据库实例都达到了瓶颈，这时我们可以非常容易地对各个模块进行单独发布，打散单个模块的请求压力和数据库访问压力。

服务拆分成最小不可分单元，还遇到写瓶颈，就要考虑对数据库进行水平分片，也就是Sharding的概念，俗称分库分表，恭喜你，业务量级来到这一步的话，你们的产品想必离成功不远了。但这是后话。暂时不必想这么远，时刻谨记，**过早的优化是万恶之源**。

### 拆，必须要拆！

决定要拆分模块之后，首先要考虑的问题是，拆分后的模块之间如何通信？一个显而易见的答案是，通过API通信。HTTP也好，Thrift也好，总有一款适合你。为了保证事件驱动，我们不能让报表模块取轮询订单模块的接口，而应该反过来，在订单模块完成订单支付回调逻辑后，异步调用报表模块的接口发送通知。

咋一看似乎很完美。可是……对，总有可是。想象我们不止一个模块需要下单动作的通知，比如业务监控系统想根据每小时的下单订单数来做环比告警，推荐系统想根据下单信息做实时推荐。嗯，几个模块要数据也不坏，都来订单模块注册一下，我挨个给你们发通知。随着模块增多，整个系统里终于出现了`N`个模块，相互调用API发送`N^2`级别的消息通知。灾难性的架构。

更不必说，如果某个下游模块的API存在无法建立连接或接口调用失败的问题，订单模块是不是居然还要做失败重试？订单模块也很委屈，这毕竟不是我份内的逻辑。通知发送成功不成功，毕竟并不影响到订单本身的处理逻辑。

对！既然是通知，显然，我们需要一个消息队列。订单模块只要往特定的队列里发送通知，任务完成。关心这条消息的模块，各自去订阅这个队列，收到消息后自行完成本身的处理逻辑，责任划分变得更加清晰。

比较成熟的消息队列，包括`Kafka`, `RabbitMQ`等，这里为了简答起见，我们使用更为轻量的`Redis` `Pub/Sub`功能来做代码实例，代码参见`feature/v0.2_pubsub`分支。

修改后的订单模块回调接口如下，请求结束后，不再去访问报表模块的Websocket客户端，而是将信息直接发送到Redis：

``` python
class ApiHandler(web.RequestHandler):
    """订单中心支付宝支付成功回调接口"""
    redis_cli = redis.StrictRedis.from_url(REDIS_URI)

    @web.asynchronous
    def get(self, *args):
        # 回调逻辑，数据库写入
        order_id = int(self.get_argument("id"))
        order_amount = int(self.get_argument("amount"))

        new_order_flag = False
        if session.query(Order.id).filter_by(id=order_id).scalar():
            # 支付成功重复回调的情况，严谨起见还应该处理回调信息不一致的情况
            print("重复回调")
            pass
        else:
            # 增加订单记录；现实世界中，这里通常是改变订单的状态
            session.add(Order(id=order_id, amount=order_amount))
            session.commit()
            new_order_flag = True
        self.finish()
        # 请求完成后，异步通过ws发送消息到客户端
        if new_order_flag:
            # 这里更常见的做法是，只发送增量数据，由消息订阅方自行聚合
            data = {"cnt": session.query(Order).count(), "amount": session.query(func.sum(Order.amount)).scalar()}
            self.redis_cli.publish(ORDER_CHANNEL, json.dumps(data))
```

报表模块的`SocketHandler`，起WebSocket客户端则成为自己的私有变量（我知道，在Python里没有真正的私有变量，两个下划线也不行，但你明白这个意思的，对吧），不和外部共享。redis_listener方法，最终以一个单独的线程启动。连接建立时，也不再需要查询订单模块的数据库，而是本地保存了最新的消息状态。

```python                
class SocketHandler(websocket.WebSocketHandler):
    """报表系统websocket连接"""
    redis_cli = redis.StrictRedis.from_url(REDIS_URI)
    # 报表系统所有链接ws的客户端
    _rpt_ws_cl = []
    _latest_msg = json.dumps({"cnt": 0, "amount": 0})

    def check_origin(self, origin):
        return True

    def open(self):
        # 查询今日订单
        if self not in self._rpt_ws_cl:
            self._rpt_ws_cl.append(self)
            self.write_message(self._latest_msg)

    def on_close(self):
        if self in self._rpt_ws_cl:
            self._rpt_ws_cl.remove(self)

    # 报表系统订阅Redis信息
    @classmethod
    def redis_listener(cls):
        ps = cls.redis_cli.pubsub()
        ps.subscribe(ORDER_CHANNEL)
        for msg in ps.listen():
            if msg["type"] == "message":
                cls._latest_msg = msg["data"]
                for c in cls._rpt_ws_cl:
                    c.write_message(msg["data"])
```

这个阶段的架构图如下所示：

<img src="https://raw.githubusercontent.com/reata/real-time-dashboard-example/feature/v0.2_pubsub/architecture.png" width="100%" height="100%">

尽管在我们的示例代码中，两个模块的代码写在一个tornado实例中。但由于它们通过消息队列（Redis）进行了解藕，相互不共享其它内容，他们是可以做到单独发布的。
