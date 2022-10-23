---
slug: "/blog/print-is-not-real-time/"
date: "2022-10-23"
title: "print不会实时打印？"
excerpt: "是什么阻挡了print"
image: "../images/python-print.png"
---

最近遇到了一个奇异的现象，我有一段Python脚本，执行过程中每隔若干时间，会打印一段日志到标准输出。脚本是通过另一个平台托管执行的，平台以子进程的形式启动Python脚本，并且会捕获子进程的标准输出，将其重定向到平台提供的日志文件。

Python脚本很简单，类似下面这样：

```python
import time
for i in range(10):
    print(i)
    time.sleep(1)
```

对于上面这段代码，理论上应该是每隔1秒，就会打印一行日志。当我在命令行中直接执行这个脚本时，结果正如我们所料。

```bash
python test.py
```

但当这个脚本在平台上执行，我去观察日志文件时，却发现，日志不会实时打印。正相反，所有日志内容都是在10秒过后，一次性出现在日志文件中：

```bash
tail -f test.log
```

## 平台的问题？

程序员的第一反应，肯定不是自己的锅。于是友好交流了一番，对方表示，平台上其他的bash和Java任务，输出到标准输出的内容，都是实时打印的。一直也有一些Python任务，但从来没有听说过这类问题。于是我分别测试了一下：

Bash版本：
```bash
for i in $(seq 0 9)
    do echo $i
    sleep 1
done
```

Java版本：
```java
public class App {
    public static void main(String[] args) throws InterruptedException {
        for (int i = 0; i < 10; i++) {
            System.out.println(i);
            Thread.sleep(1000);
        }
    }
}
```

分别用如下命令，在该平台中执行，然后同样去tail日志文件。发现确实，这两段代码的日志是实时的。所以不存在平台启动子进程的时候，没有实时捕获子进程标准输出的问题。

那么问题是出在Python身上了吗？
```bash
sh test.sh
java -jar App.jar
```

## print的问题？

通常Python打印日志，是会用标准库里的logging模块来实现的。这里因为是平台托管明确表示将数据打印到标准输出即可，所以我就偷懒用了print。那么改回用logging来模拟同样的日志行为，结果会不会有不同呢？

```python
import logging
import sys
import time

logging.basicConfig(level=logging.DEBUG, stream=sys.stdout, format='%(message)s')

for i in range(10):
    logging.info(i)
    time.sleep(1)
```

这里我们降低了日志级别到DEBUG，以便INFO级别的信息可以打印出来。并且logging默认配置是打印到标准错误的，这里也改成了标准输出。执行后再去看日志文件中的信息，发现是实时打印出来的。换言之，切换到logging之后，平台可以捕获到我们脚本的标准输出了。

print和logging，都是输出到stdout，区别在哪里呢？


## logging

logging默认使用的是StreamHandler。

logger完成[record的拼装](https://github.com/python/cpython/blob/3.10/Lib/logging/__init__.py#L1622)后，会调用自己的handle方法。handle方法最终会拿到logger对应的各个handler，并[调用handler的handle方法](https://github.com/python/cpython/blob/3.10/Lib/logging/__init__.py#L1696)。

对于handler来说，其[handle方法](https://github.com/python/cpython/blob/3.10/Lib/logging/__init__.py#L955)统一写在父类Handler中，主要逻辑是过滤数据，获取锁，并emit相应的record。我们已经保证了打印的INFO级别，高于默认的DEBUG级别，日志不会被过滤掉。于是核心的逻辑，就在emit方法上了。Handle父类中的emit是个抽象方法，需要各个子类自行实现。我们来重点看一下StreamHandler子类的实现：

```python
    def flush(self):
        """
        Flushes the stream.
        """
        self.acquire()
        try:
            if self.stream and hasattr(self.stream, "flush"):
                self.stream.flush()
        finally:
            self.release()

    def emit(self, record):
        try:
            msg = self.format(record)
            stream = self.stream
            # issue 35046: merged two stream.writes into one.
            stream.write(msg + self.terminator)
            self.flush()
        except RecursionError:  # See issue 36272
            raise
        except Exception:
            self.handleError(record)
```

这里的stream就是我们传入的sys.stdout。sys.stdout.write，和print没有什么本质的不同。区别在于flush方法。flush的作用，是将程序缓冲池中的内容，真正调用操作系统的IO接口，刷到对应的文件中。缓冲池的作用，是避免频繁调用操作系统接口，造成IO效率降低。

看一下print函数的签名，果然，默认是不会flush的。

```python
def print(self, *args, sep=' ', end='\n', file=None): # known special case of print
    """
    print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)
    
    Prints the values to a stream, or to sys.stdout by default.
    Optional keyword arguments:
    file:  a file-like object (stream); defaults to the current sys.stdout.
    sep:   string inserted between values, default a space.
    end:   string appended after the last value, default a newline.
    flush: whether to forcibly flush the stream.
    """
    pass
```

## print with flush

既然print函数中有flush这个参数，那么我们手动传参，是不是也可以达到logging的效果呢？

```python
import time
for i in range(10):
    print(i，flush=True)
    time.sleep(1)
```

经过测试，果然，这样改写后，也可以达到实时写入日志的效果。

## 前台与后台

尽管logging和print with flush，都解决了实时打印日志的这个问题。但还有最后一个疑惑，为什么最初的脚本，在命令行中直接调用，是实时打印的。只有在平台里执行，才会暴露出需要flush的这个问题。

我们可以在命令行中，模拟平台的操作：启动一个后台进程作为当前命令行进程的子进程，同时重定向标准输出到日志文件：

```bash
python test.py > test.log &
tail -f test.log
```

不加flush不用logging，当我们查看日志时，可以完全复现在平台中的行为：即仅当该Python进程完成，日志文件中才会一次出现所有内容。

这个行为，记录在Python的[官方文档](https://docs.python.org/3/library/sys.html#sys.stdout)中：

> When interactive, the stdout stream is line-buffered. Otherwise, it is block-buffered like regular text > files. The stderr stream is line-buffered in both cases. You can make both streams unbuffered by passing > the -u command-line option or setting the PYTHONUNBUFFERED environment variable.

这样就清楚了，在命令行中交互执行（前台执行）时，stdout是按行缓冲的。也就是说，每一行结束，都会自动flush。而当后台执行时，就和正常写文件一样，按块缓冲了。操作系统块肯定远大于我们打印的9个数字的长度，缓冲池没有满，日志自然不会被打印出来了。

参照文档里描述的，我们通过增加-u选项：

```python
python -u test.py > test.log &
tail -f test.log
```

或者设置PYTHONUNBUFFERED环境变量：

```python
PYTHONUNBUFFERED=1 python test.py > test.log &
tail -f test.log
```

二者都可以在没有flush的情况下，将日志实时打印出来。
