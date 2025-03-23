---
slug: "/blog/apache-beam-review"
date: "2025-03-22"
title: "Apache Beam浅探"
excerpt: "Google Dataflow Model如何处理批流统一"
image: "../images/beam.png"
---

Google的Dataflow[论文](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/43864.pdf)，
可能是业界最早提出的针对批流合一的编程模型，Apache Beam则是Dataflow模型的开源实现。

说它是编程模型，而非执行引擎，就很显然地表示出其与Flink或者Spark对批流合一的尝试方向是不太一样的。具体来说，
它会将用户经由不同语言的SDK写出来的Beam程序，翻译成具体执行引擎的代码。这个执行引擎，就是Flink、Spark、或者Google Cloud。

以下是简单调研后的一些快问快答。

## Beam的DAG图，抽象层次是怎么样的？

在Beam的抽象中，用户编写代码来声明Pipeline，一个Pipeline就是一个DAG图。图中的计算节点，对应Beam中的PTransform (Parallel Transform)，
每一个计算节点的输入输出，叫做PCollection，是一组数据的分布式抽象，逻辑上非常类似Spark的RDD（Resilient Distributed Dataset）。

Beam自带一些常见的PTransform算子，除去各种数据源IO作为整个Pipeline的输入和输出的IO算子之外，中间的计算过程，最核心的算子就两个：

- ParDo: Parallel Do，最通用的并行计算算子，类似于MapReduce里的Map。
- GroupByKey: 类似于MapReduce里的Reduce。

通过这两个基础算子就可以衍生出很多复杂的算子，比如CoGroupByKey，针对两个数据集作为输入。CoGroupByKey可以作为SQL中各种Join的底层算子。
这里的理念从各个层面上都非常类似MapReduce。

当然Beam也有更高层次的Beam SQL API，但其成熟度不算太高。

## Beam的DAG如何翻译成Spark或者Flink程序？

Spark本身有两层抽象，DataFrame和RDD。SQL和DataFrame API编写的Spark程序，首先解析为统一的Logical Plan，
最终再转为真正面向RDD级别操作的Physical Plan。

通过对Beam的了解可以知道，PTransform的抽象层次是更类似RDD的。所以Beam的SparkRunner在翻译时，实际上不涉及DataFrame或者Logical Plan
这一级的抽象，而是直接翻译为RDD的操作。相关代码可参考
[TransformTranslator.java](https://github.com/apache/beam/blob/v2.63.0/runners/spark/src/main/java/org/apache/beam/runners/spark/translation/TransformTranslator.java)

而对Flink也是类似的。Beam的翻译，不会涉及Table API & SQL或者DataStream API，而是直接翻译为Flink的JobGraph（Logical Graph built with operators）。
相关代码可参考
[FlinkPipelineExecutionEnvironment.java](https://github.com/apache/beam/blob/v2.63.0/runners/flink/src/main/java/org/apache/beam/runners/flink/FlinkPipelineExecutionEnvironment.java#L195)

## Beam是如何实现批流一体的？

Beam模型中有这样一些约定的语义：

- Window: 时间窗口
- Timestamps: 处理时间和事件时间
- Watermark: 水位线，也即处理时间和事件时间的差值
- Trigger: 触发器

在Flink已经成为流式处理事实标准的今天，这些都是耳熟能详的概念。Flink希望解决批处理问题的方向，和Beam是完全一致的：即把批看作特殊场景下的流。

一个最经典的按天批处理的场景，就可以翻译为：单一的全局Window，按处理时间计算，假定一个从unix时间0开始一直到无限的水位线，
以及流式输入场景下定时触发的触发器（否则默认的触发器，由于全局Window不会结束，永远不会触发计算）。

## 数据源已经确定是批或者流了，是否Beam的执行模式就确定了？

Beam针对分布式数据的抽象PCollection包含两大类，Bounded和Unbounded，即有界数据和无界数据。

像Text文件属于有界数据，是无法用流模式来处理的，指定流模式Beam会报错。对于Kafka这样的无界数据，则天然支持既可以用流模式处理，也可以用批模式处理。

而PTransform中，像ParDo和GroupByKey这样的通用算子，肯定是批流无关的，可以任意切换。

## 支持Flink/Spark等多种不同的Runner，Beam的表达能力会受限吗？如何处理Flink/Spark特有的功能？

Beam的表达能力，都由自己的SDK提供的API控制，即PCollection和PTransform的抽象。这层统一的API首先确保是可以翻译到不同的计算引擎
（当然也存在Beam API支持，但特定Runner不支持的情况，这个会在编译期报错）。

对于计算引擎一些特有的功能，比如Flink支持Custom Window Trigger，可以通过Flink的CLI option传入，但这样实质上这部分就是在写Flink代码。
绝大多数引擎特有的功能，可以简单认为Beam就是不支持。

某种意义上，可以这么说，Flink和Spark的交集，再取一个Beam API能表达的子集，就是Beam的所有表达能力。由于Beam API比较low level，
所以这个子集其实无限接近于二者的交集。 

表达能力之外，考虑到翻译后不可避免会存在一些性能损耗（比如绕过Spark DataFrame API也就意味着用不了catalyst优化器了），其实Beam的流行度在业界一直不高。
