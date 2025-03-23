---
slug: "/blog/revisit-wsgi/"
date: "2022-10-30"
title: "再探WSGI"
excerpt: "不用框架，写一个兼容WSGI的Python Web应用"
image: "../images/wsgi.png"
---

写过Python Web应用，尤其进行过线上部署的人，一定都听说过WSGI这个协议。它定义了Python的Web服务器和Web应用之间的数据交换接口。这个说法本身是比较抽象的，我们用实际的例子来解释一下可能会更清楚一些：

试想我们用Django或者Flask等Web应用框架写了一个Web应用，官方文档里都会提到，框架自带的server，像Django的`python manage runserver`或者Flask的`flask --app hello run`，仅供开发阶段调试，不足以处理生产环境的流量。在部署到生产时，都需要将Web应用放在Web服务器后面运行，典型的Web服务器有Gunicorn和uWSGI。Web服务器会提供诸如进程模型、线程模型等并发选项，来提升Web应用的并发性能。

针对上面这个简单的情景，就有四种技术选型组合：Gunicorn + Django, Gunicorn + Flask, uWSGI + Django, uWSGI + Flask。不同的组合，如果要Web应用框架提供不同的Web服务适配代码，N**2的复杂度，显然是不合算的。WSGI存在的目的，就是定义好了Web服务器和Web应用之间的接口。框架的开发者都针对这个接口来编码即可。而对于Web应用的开发，就拥有了更多选型的自由，同样的Django代码，我既可以选择让它跑在Gunicorn上，也可以跑在uWSGI上。

## 抛开Web应用框架

在我们讨论Django和Flask针对WSGI的适配之前，让我们再将问题简化一些。Web框架存在的原因是什么？是提供一些便利的功能，比如路由，比如HTTP请求解析，帮助我们更容易更快地写出Web应用对吧。那么其实针对非常简单的应用，我们也是可以不用框架来写的。

PEP定义的WSGI接口非常简单，没有（也不应该）用到任何Web框架：
```python
HELLO_WORLD = b"Hello world!\n"

def simple_app(environ, start_response):
    """Simplest possible application object"""
    status = '200 OK'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    return [HELLO_WORLD]
```

这样一个简单的Web应用，和Web服务器之间，就通过environ环境变量字典和start_response函数来交互。Web服务器会保证传入正确的参数。

假定我们将上面的代码保存在app.py中，并且已经安装好了Gunicorn，那么我们就可以用如下命令来启动这个应用
```bash
gunicorn app:simple_app
```

默认Gunicorn会绑定8000端口，我们用curl发送一个请求试试
```bash
$ curl http://localhost:8000
Hello world!
```

一切如我们所料。同时，注意到我们这个Web应用的代码逻辑是非常简单的，不考虑请求的路径（"/"，"/api"，etc.），请求的方法（GET，POST，PUT，etc.），应用始终返回200的状态码以及Hello World!作为响应的body。

```
$ curl http://localhost:8080/non-exist-endpoint
Hello world!
$ curl -X POST http://localhost:8080
Hello world!
```

## 超越Hello World

正如上面所述，一个正常的Web应用，肯定会有不止一个endpoint。我们也会希望根据请求的不同，来返回不同的响应。

而请求所有的信息，Web服务器都会放在environ这个字典当中，同时还会包含其它的环境变量。

在所有的key当中，我们最需要关注的，有下面三个：

1. REQUEST_METHOD：即请求方法，GET/POST等。
2. PATH_INFO：即请求路径。
3. wsgi.input：是一个文件对象，当请求body中包含数据时，我们可以通过这个对象来读取。另一个key，CONTENT_LENGTH会指明请求body的长度。二者通常配合使用。

假定这里我们要在/路径上，实现一个新的POST接口，接收JSON类型的参数，用户传入{"name": "xxx"}，Web应用会返回Hello, xxx! GET接口不变，继续返回Hello, World!

代码如下：
```python
import json

def simple_app(environ, start_response):
    request_method = environ["REQUEST_METHOD"]
    path_info = environ["PATH_INFO"]
    response_headers = [('Content-type', 'text/plain')]
    if path_info == '/':
        status = '200 OK'
        if request_method == 'GET':
            body = b'Hello world!\n'
        elif request_method == 'POST':
            request_body_size = int(environ["CONTENT_LENGTH"])
            request_body = environ["wsgi.input"].read(request_body_size)
            payload = json.loads(request_body)
            name = payload.get("name", "")
            body = f"Hello {name}!\n".encode("utf-8")
        else:
            status = '405 Method Not Allowed'
            body = b'Method Not Allowed!\n'
    else:
        status = '404 NOT FOUND'
        body = b'Not Found!\n'
    start_response(status, response_headers)
    return [body]
```

这里除去请求路径和请求方法的处理之外，我们还加了一些简单的客户端错误检测，比如访问/之外的路径，会返回404。用非GET或者POST的方法访问/，会返回405。

简单测试如下：

```bash
$ curl http://localhost:8080/
Hello World!
$ curl -X POST http://localhost:8080/ -d '{"name": "reata"}'
Hello reata!
$ curl -X PUT http://localhost:8080/                  
Method Not Allowed!
$ curl http://localhost:8080/non-exist-path
Not Found!
```


## 变得更像Flask

不难想象，随着我们Web应用的逻辑越来越复杂，simple_app这个函数会越来越冗长。意大利面式的代码显然不是良好的编程实践。

我们可以参照Flask的API，来做一些简单的封装。

比如将函数切换成class的callable，让Web应用的开发者可以拿到WSGI的app；内部用routes来保存所有path->handler的映射；将environ封装成一个request对象等。
```python
class MyWebFramework:
    def __init__(self):
        self.routes = {}
    
    def route(self, path):
    	def wrapper(handler):
            self.routes[path] = handler
            return handler

        return wrapper

    def __call__(self, environ, start_response):
        request = self.assemble_request(environ)
        if path_info in self.routes:
            handler = self.routes[path_info]
            return handler(request)
        else:
            # return 404

app = MyWebFramework()

@app.route("/my_endpoint")
def my_endpoint_handler(request):
    # business logic here to handle request and assemble response
    return response
```

这样，MyWebFramework的部分就可以逐渐抽象出一个Web应用框架，而真正开发Web应用的业务逻辑，只要写各个handler即可。

参考[flask.app.Flask](https://github.com/pallets/flask/blob/2.2.2/src/flask/app.py#L2495)的源码，它也是这么写的。Flask应用源自Flask这个核心类，它本身同时就是一个WSGI应用。

Django的设计上稍稍有一些不同，它自己提出并实现了一个ASGI(Asynchronous Server Gateway Interface)的协议，来支持异步请求。一个Django应用可以通过内部函数，转换成ASGI应用或WSGI应用。当我们只关心[WSGI的部分](https://github.com/django/django/blob/4.1.2/django/core/handlers/wsgi.py#L127)，会发现一切都还是非常熟悉的内容。

## SQLLineage的例子

[sqllineage](https://github.com/reata/sqllineage/blob/master/sqllineage/drawing.py)就是用这个思路实现了一个兼容WSGI的Web应用。起因是有用户反馈，他们用不到可视化这部分的功能，希望剥离flask相关的依赖。

sqllineage是一个SQL数据血缘分析工具，用flask来启动可视化Web应用确实有些重了。于是索性就自己参照Flask实现了一个。

其中我只针对POST相关的接口做了路由，也没有将environ变量封装成request对象。而默认的web服务器，用了标准库自带的wsgiref。这样全程在不引入第三方依赖的情况下，还是达到了和使用flask相同的效果。

## Java的术语

其实WSGI这件事用Java的概念是非常好解释的，[PEP 3333](https://peps.python.org/pep-3333/)本身也提到了这点。

在Java生态中，WSGI就相当于servlet API。一个Java Web应用，只要实现了servlet接口，打成war包（Java Web Application Archive），就可以交给不同的Web服务器来运行。常见的开源Java Web服务器包括Tomcat，Jetty，商用的如Oracle的WebLogic，IBM的WebSphere。Web服务器自身会启动Java虚拟机，然后加载war文件。

当然事实上我们不会自己去实现servlet接口来写Web应用，都是直接用Spring Boot了。近些年随着Spring Boot以及docker的流行，war包的部署形式已经不再常用。但背后的概念是没有变的，`spring-boot-starter-web`只是默认帮你捆绑好了Tomcat，并打成Jar包。servlet的概念不再强调，但依然是存在于应用之中的。

## 参考阅读
1. [PEP 333 – Python Web Server Gateway Interface v1.0](https://peps.python.org/pep-0333/)
2. [PEP 3333 – Python Web Server Gateway Interface v1.0.1](https://peps.python.org/pep-3333/)
3. [Building Your Own Python Web Framework](https://testdriven.io/courses/python-web-framework/)
