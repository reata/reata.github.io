---
title: "Encode还是Decode，这是一个问题"
excerpt: "Python是如何处理Unicode的"
header:
  overlay_image: assets/images/decode_encode.png
  overlay_filter: 0.4
  caption: "图片引用自http://ez2learn.com/basic/unicode.html"
categories:
  - python
  - unicode
tags:
  - python programming language
  - unicode
  - utf-8
author: "胡俊伟"
date: "2 July 2018"
---

Python的编码问题由来已久，相信每一个Python程序员，都对UnicodeDecodeError和UnicodeEncodeError再熟悉不过了，这种时候就需要通过对变量进行encode或者decode，转换为对应的数据类型。是使用encode还是decode，就成为了一个问题。如果你不想每次只是来回地尝试，那么掌握一些原理想必是有益的。
 
在Python 2中，`str`和`unicode`两种数据类型，都可以用来表示字符串。`str`实际上是“字节串”，它表示使用某种特定编码后的一组字节序列，而这个特定编码，在Python 2里，默认是ASCII编码。而`unicode`则如其名，表示的是"Unicode字符"，因而它不表示任何特定编码（真的不表示任何编码吗？请继续往下读）。在Python 2里，绝大多数函数都接受两种字符串类型中的任意一种，`unicode`和`str`甚至可以直接比较是否相等，它们都是一个公共父类`basestring`的子类。在Python2中，要创建一个`str`，可以使用自带函数`str()`，或者字符串字面值（string literal），比如`mystring = 'This is my string.'`。而要创建一个`unicode`，可以使用自带函数`unicode()`，或者带u前缀的字符串，比如`my_unicode = u'This is my Unicode string.'`
 
在Python 3中，只有唯一的一种字符串类型`str`，它是Unicode。“字节串”如今用`bytes`数据结构来表示。普遍来说，接受`str`类型的函数，通常不再支持传`bytes`进去，两种类型也不再可以直接比较是否相等。Python解释器甚至有命令行的flag可以选择性地将混用`bytes`和`str`作为异常进行抛出。
 
这是很好的设计选择，Unicode是正确的字符串类型。而作为一种副作用，`bytes`类型在需要使用的时候，也远比Python 2中的`str`更为好用。
 
此外，Python 3还在3.3这个版本中，引入了又一个不那么为人所知，但同样重要的变化。我们会详细讨论这个变化，但首先，我们需要一些背景知识。
 
### 字符集与编码集

TODO

### Six在兼容Py2和Py3时，是如何处理Unicode与Str的

TODO

### Django是如何做Unicode/Str兼容的

TODO

### 参考阅读

1. [How Python does Unicode](https://www.b-list.org/weblog/2017/sep/05/how-python-does-unicode/)
2. [字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
