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

但事实不是这样，可以想见，当业务量扩大之后，报表模块会需要来自更多模块的数据，比如网站的PV/UV，这是订单模块所不能提供的，他们在逻辑上并不是一体。模块切分的另一个用意就在于，当业务发展到某个阶段，流量来到一定程度，我们可以非常容易地对各个模块进行单独发布，打散单个模块的请求压力。

### To be continued 拆，必须要拆！

未完待续。
