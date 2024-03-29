---
slug: "/blog/computer-science-open-online-course/"
date: "2022-02-15"
title: "计算机科学自学网络公开课"
excerpt: "学习这件事，还是得靠自己"
image: "../images/MOOC.png"
---

作为一个自学的程序员，工作快满7年，我终于把计算机专业本科生该学的课基本都学完了。

感谢世界顶级学府开放的这么多网络公开课程。没有它们，就没有今天的我。作为回馈，也把走过的路整理整理，以飨有缘的读者。

## 计算机科学导论

[Harvard CS50: Introduction to Computer Science](https://pll.harvard.edu/course/cs50-introduction-computer-science)

哈佛大学的计算机科学导论课程，各类概念都涉及到一些。趣味性十足，教授边撕书边讲二分搜索，我这辈子应该忘不了。

这门课不是一定要上，毕竟导论课程介绍的概念，所希望培养的思维模式，在之后的课程里都会详细涉及。但如果你还没有决定，转行计算机是否适合你，
那CS50是非常好的选择。

## 编程入门

[Fundamentals of Computing](https://online.rice.edu/courses/computer-fundamentals)

莱斯大学的编程入门系列课程，一边介绍计算的基本概念，一边讲解Python编程基础。

寓教于乐，每堂课的课后编程作业都是一个小游戏，从最简单的石头剪刀布，到类似雷电的卷轴射击，乃至策略型游戏无尽的饼干。
作为从小到大的游戏玩家，这是入门编程再好不过的课程了。

完成这门课后，给定明确的输入和输出，我能写一些简单的函数了。GitHub上各种项目的README，我突然发觉好些我都能看得懂，会使用了。
这种感觉不异于读书时玩GTA:SA，突然有一天我发觉我能听懂路人说的英语时的喜悦感。

这里Python是我个人的选择，但语言不是重点，重点是入门阶段至少要掌握一门编程语言。它是你和计算机沟通的桥梁。

## 算法和数据结构

[Princeton: Algorithm Part I](https://online.princeton.edu/node/201)

[Princeton: Algorithm Part II](https://online.princeton.edu/node/166)

对于任何一个只要了解一点点数据结构的人来说，红黑树都必定是一个如雷贯耳的名字。而讲授这门课的Sedgewick教授，正是红黑树的两位命名人之一。

算法和数据结构是一把钥匙，入门的时候可能不知道这把钥匙能开什么门，但后来有不止一天，我都很庆幸，幸好我带了这把钥匙。
我依然记得课程上讲述用并查集来为灌溉系统建模时，内心深处感受到的震撼，一切都充满了美感。而没有算法和数据结构，这一切都是不可能的。

这门课是用Java讲的，我觉得作为程序世界的通用语言，Java是学习数据结构最合适的选择了。
Python的str, list, dict, set抽象程度已经太高，损失了很多信息。而Java程序员天然就需要知道LinkedList和ArrayList有什么区别。

当然Java也不是宇宙的尽头，未来想深入计算机底层的时候，再用C的视角来看数据结构也不迟。那时你会发现，内存不过是个大数组，
寄存器、缓存是来自另一个世界的东西，而构建在内存这个大数组之上，不断抽象出的种种数据结构，是多么美妙。

## 程序设计

[Udacity: CS212 - Design of Computer Programs](https://www.udacity.com/course/design-of-computer-programs--cs212)

入门到这个阶段，基本概念都有了，我也顺利找到了工作。当时做服务端开发，参考别人的代码，参考官方文档，依样画葫芦，我也能写出线上能用的代码了。

但是当我开始研究我所用到的框架是怎么写出来的，当我试图封装一些库给其他人来用，我依然觉得无从下手。这个时候欠缺的是抽象能力。

很多人推荐在这个阶段读[SICP](https://mitpress.mit.edu/sites/default/files/sicp/index.html)，我个人读过之后的感觉，书里的概念固然很好，
但是因为它是用Scheme写的，也没有什么很好的IDE，做起练习来实在是一种痛苦。而Udacity上的这门课由Google研究主管Peter Norvig讲授，
使用Python语言，对我就十分友好。

上这门课，至今仍然受用的一句话是说，当你想要重构或者开发新功能时，“概念上的变动，应该等比于代码量的变动”，否则这里可能有坏代码的味道。

说起来，SICP里也有一句至理名言，“越是变化，事情越是它原本的样子”，代码和人生，都是这样。

## 计算机系统原理

[CMU: 15-213 - Intro to Computer Systems](https://www.cs.cmu.edu/~213/)

我知道计算机只认识0和1，我也知道怎么让我写的Python/Java程序运行起来。可是它们之间有多遥远的距离？我不知道。

Java的一次编写到处执行意味着什么，谁在替你负重前行？C写的程序为什么针对不同平台要编译不同的二进制文件？我也不知道。

买电脑时看CPU总说的L1/L2缓存，到底是什么？深度学习为什么基于GPU来计算要快得多？我还是不知道。

太多太多不知道，而正如这门课的开宗明义讲到：大多数计算机的课程都是在教你构建抽象，以获得封装后带来的更强大的能力，为此你不需要操心很多的细节。
而这门课的不同在于，我们要看看抽象的背后是什么。

我专门学了C语言编程，很努力想把Lab都做下来，但没能成功。饶是如此，上完这门课，我还是有一种奇经八脉都被打通的感觉。
让我们时刻牢记，"Abstraction is good, but don't forget reality".

这门课的参考书，[CSAPP](https://csapp.cs.cmu.edu/)，经典中的经典。

## 编译原理

[Stanford CS143: Compilers](https://web.stanford.edu/class/cs143/)

读过CSAPP，懂得了汇编的基本概念，就已经有了学习编译原理的先决条件。

我从没想过我会学习《编译原理》，我对汇编和硬件没有特别高的兴趣。我也听不止一个科班出身的朋友和我讲过，《编译原理》是他们大学里唯一一门一个字都没听懂的课程。

学习这门课的动机，来自于一个非常直接的需求，我在做SQL血缘解析，而开源的SQL Parser已经渐渐无法满足我的需要，生成的语法树在很多边界条件下总是和我想的不一样。
当我想要为其做一些定制化，由于缺乏相应的理论储备，我再度发觉无从下手。

这样目的也就非常明确了，关于编译器后端的部分，代码生成、优化，我不求甚解。对于编译器前端，词法分析、语法分析、语义分析，我尽力了解形式语言的理论，
以及各种基础实现。这样当我回过头去看像Antlr这样的parser生成工具，就没有什么障碍了。

话说回来，形式语言的分类谱系[乔姆斯基体系](https://zh.wikipedia.org/wiki/%E4%B9%94%E5%A7%86%E6%96%AF%E5%9F%BA%E8%B0%B1%E7%B3%BB)
命名于语言学家乔姆斯基，这是我大学上英语专业课《语言学》时认得的名字。那时老师提过，MIT的语言学系是用计算机和数理统计的理念来研究语言学的。
我当时想，总有一天我要看看他们是怎么玩的。

念念不忘，必有回响。

## 数据库系统原理

[CMU: 15-445 - Database Systems](https://15445.courses.cs.cmu.edu/)

作为大数据工程师，执行计划、查询优化、事务处理、故障恢复，这些得懂吧。否则只是做一个SQL boy未免太没有意思了。

学完再去看Hive, Spark, HBase, Presto, Clickhouse, 会多一种微妙的眼光。倒不是说否定大数据的创新性，但颠覆式创新？谈不上吧。更像是螺旋上升。

一切都是从数据库中来，到数据仓库/大数据系统里去。太阳底下无新事。

这里多提一嘴Andy Pavlo教授，绝对是我上过所有公开课里，最有个性的。这门课竟然有自己的DJ，有片头和片尾。哪怕你对数据库不感兴趣，上这门课你都不会后悔的。

## 机器学习

[Stanford CS229: Machine Learning](https://cs229.stanford.edu/)

我当年是读了《大数据时代》这本书，决定转行做程序员的。那个时候，书里介绍的更多的神奇应用，其实是机器学习的范畴。我本身有社科的背景，数理统计学得还不错。
所以很长时间内，我是想去搞机器学习的。

但是工作后就发现，理想很丰满，很多公司的条件其实根本不具备。信息化、数字化做得怎么样？大数据系统有吗？不会走路，很难跑起来呀。与其做一个听上去高大上，
实则每天在写SQL的分析师/算法工程师，我还是觉得能写代码更幸福一些。

话说远了，即使没能用上，即使如今深度学习火了，这门讲授传统机器学习的课程还是很值得。最重要的是了解机器学习的思路。
一般意义上的编程是程序员了解问题后，告诉计算机我要做什么以及我要怎么做。而机器学习的思路是告诉计算机我要求解的问题，以及给它看这些是以前别人解过的题，
让计算机自动学习出其中的模式。

有了这种思路，在全民AI的今天，谁还不能当个调包侠呢？但时至今日，我还能不能手推逻辑回归的公式，就是另一个问题了。

## 密码学

[Stanford: Cryptography I](https://crypto.stanford.edu/~dabo/courses/OnlineCrypto/)

其实这门课我在入门阶段，大概学算法与数据结构前后就上了。原因无它，就想扩展一下对于比特币和区块链的兴趣，看看它们背后的理论源头是啥。

从功利的角度讲，学这门课对于找工作没太大帮助，除非你一心想投身币圈，而我显然不是。

但从学东西的角度，《密码学》又满足了我很多的好奇心:

比如我这才知道，原来没有绝对意义上安全的加密，只有当前阶段最厉害的计算机花上几十年还暴力穷举不出结果的加密。 

比如我以前一直想不通，信息要加密传输，那密钥怎么传，总不能明文吧，还是说只能线下给？想不明白。但等学了非对称加密，看过RSA算法，真的感慨，
发明这些算法的人拥有全世界最性感的大脑。

另外，《密码学》的另一大馈赠：我从此也成为了八卦Alice和Bob罗曼史的一份子。

## TODO: Stay Hungry, Stay Foolish

- 算法设计和分析：Stanford CS106B/X
- 操作系统：MIT 6.S081/UCB CS162
- 计算机网络：Stanford CS144
- 分布式系统：CMU 15-418/Stanford CS149/MIT 6.824
- 计算机图形学：UCSB Games101
- 自然语言处理：Stanford CS224n
- 图像识别：Stanford CS231n
- 知识图谱：Stanford CS520
