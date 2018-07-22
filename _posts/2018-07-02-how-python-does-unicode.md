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
 
在Python 2中，`str`和`unicode`两种数据类型，都可以用来表示字符串。`str`实际上是“字节串（byte string/sequence of bytes）”，它表示使用某种特定编码后的一组字节序列，而这个特定编码，在Python 2里，默认是ASCII编码。而`unicode`则如其名，表示的是"Unicode字符"，因而它不表示任何特定编码（真的不表示任何编码吗？请继续往下读）。在Python 2里，绝大多数函数都接受两种字符串类型中的任意一种，`unicode`和`str`甚至可以直接比较是否相等，它们都是一个公共父类`basestring`的子类。在Python2中，要创建一个`str`，可以使用自带函数`str()`，或者字符串字面值（string literal），比如`mystring = 'This is my string.'`。而要创建一个`unicode`，可以使用自带函数`unicode()`，或者带u前缀的字符串，比如`my_unicode = u'This is my Unicode string.'`
 
在Python 3中，只有唯一的一种字符串类型`str`，它是Unicode。“字节串”如今用`bytes`数据结构来表示。普遍来说，接受`str`类型的函数，通常不再支持传`bytes`进去，两种类型也不再可以直接比较是否相等。Python解释器甚至有命令行的flag可以选择性地将混用`bytes`和`str`作为异常进行抛出。
 
这是很好的设计选择，Unicode是正确的字符串类型。而作为一种副作用，`bytes`类型在需要使用的时候，也远比Python 2中的`str`更为好用。
 
此外，Python 3还在3.3这个版本中，引入了又一个不那么为人所知，但同样重要的变化。我们会详细讨论这个变化，但首先，我们需要一些背景知识。

### 字符集与编码集

Unicode不是一种编码，这是需要首先厘清的一个概念。你可以说，一个字符串是ASCII编码的、GBK编码的、GB2312编码的，UTF-8编码的，这里列举的都是编码类型，但Unicode不是。Unicode本质上是一个字符集，可以想象为一个非常大乃至无所不包的字符（character）数据库，每个字符都对应着一个唯一的id，但如何将这个字符对应的id转换为一个字节串，换句话说就是一串计算机能理解的0和1，这个不属于Unicode考虑的范畴。

而深究起来，Unicode所包含的最基本单元，也不是字符（character），而是码位（code point）。如果要把一个Unicode码位在屏幕中打印出来，你会发现码位和我们平时认知的字符，并不存在清晰的对应关系。有时一个字符可能就对应一个码位，而有时一个字符可能由多个码位组成，甚至有时候，看起来多个字符对应的是一个码位。

下面是一些例子：
- 一一对应：码位`U+0041`，对应[LATIN CAPITAL LETTER A](http://www.fileformat.info/info/unicode/char/0041/index.htm)，打印出来显示为A。
- 一个字符对应多个码位：码位`U+0327`，对应[COMBINING CEDILLA](http://www.fileformat.info/info/unicode/char/0327/index.htm)。码位`U+0063`，对应[LATIN SMALL LETTER C](http://www.fileformat.info/info/unicode/char/0063/index.htm)。将这两个码位组合起来，可以得到字符ç。而这个字符也可以用单一的码位`U+00E7`来表示，对应[LATIN SMALL LETTER C WITH CEDILLA](http://www.fileformat.info/info/unicode/char/00e7/index.htm)。这里`U+00E7`在Unicode中称为“合成形式”，`U+0063 U+0327`称为“分解形式”。Unicode定义了将彼此等价的序列转成同一序列的Unicode正规化规则。
- 看起来一个码位对应多个字符：码位`U+FDFA`，对应[ARABIC LIGATURE SALLALLAHOU ALAYHE WASALLAM](http://www.fileformat.info/info/unicode/char/fdfa/index.htm)，打印出来显示为ﷺ。按照Unicode的分解规则，这个码位可以分解成接近20个“字符”。因为使用较为频繁，Unicode将其表示为一个码位。

Unicode当前是按照字符平面（plane）来组织码位的。每个字符平面包含 2^16 = 65535 个码位。目前Unicode总共定义了17个字符平面，其中0号平面（U+0000 - U+FFFF）涵盖了绝大多数自然语言的码位，而（U+4E00 - U+9FFF）是中日韩同一表意文字所在区间，常用的中文字符都在这个区间内。

所以Unicode是字符集，或者更严格地说是码位集，它规定了一个码位的二进制代码，但没有规定这个二进制代码应该如何存储。比如汉字[“杭”](https://www.fileformat.info/info/unicode/char/676d/index.htm)，对应的码位`U+676D`，也就是十进制的`26477`（int('676D', 16) == 26477），二进制的`0b110011101101101`（bin(int('676D', 16)) == '0b110011101101101'; int('0b110011101101101', 2) == 26477）。这个二进制数有15位，这意味着存储该二进制数至少需要15位，也即至少需要两个字节。

假设我们就用二进制代码来存储Unicode（这也是ASCII的思路），"杭"的二进制代码是15位，对其首位补0，得到一个16位的二进制数，'01100111:01101101'。这里引入了一个严重的问题，计算机怎么知道在这里两个字节表示一个码位，而不是两个字节表示两个码位。按两个码位来理解，对计算机完全行得通。从左往右，第一个字节，'01100111'，十进制的103，对应Unicode码位'U+0067'，也就是英语字母g。第二个字节，'01101101'，十进制的109，对应Unicode码位'U+006D'，也就是英语字母m。这样计算机无从分辨。

假设稍作修改，我们要求，所有Unicode都表示为两个字节，不足两个字节的首位补0。那么，ASCII编码所能表示的英文字母和符号，第一个字节都是0。两个字节只有65536个码位，Unicode的数量是远大于这个数字。我们需要三个字节，才能保存现有的所有字符。计算机对于2的幂指数来说更为优化，于是我们采用四个字节，来表示所有Unicode。这基本上就是UTF-32编码（Unicode Transformation Format, 32-bit）。很显然，绝大多数字符都不需要四个字节的空间，所以UTF-32编码多少显得有些浪费存储空间。

UTF-32的另一个问题是，定死了四个字节数后，就意味着同时限制了Unicode的扩展性，使得Unicode变成了和ASCII一样字符编码统一的集合。ASCII只用一个字节，只能表示256个码位。Unicdoe用四个字节，可以表示2^32 = 4294967296个码位。从目前Unicode的实际分配情况来说，这个空间是远远满足需求的。但是，IPv4发明的时候，谁也想不到有一天我们会需要IPv6，对吗？

UTF-32有时也被称为UCS-4（“Universal Coded Character Set, 4-type”），UCS是一种类似Unicode的ISO/IEC标准，和Unicode共享码位的分配，但不包含Unicode定义的属性和规则。之前，当Unicode的码位数量还没有超过2^16=65536时，另外还有一种编码叫做UCS-2，每个码位表示为两个字节（也即16个二进制数）。但时至今日，Unicode的范围已经超过了16个二进制数所能表述的区间（16个二进制数，恰好是0号平面所在的区间，目前又引入了其它16个平面，但不是每个平面已经分配了码位），所以UCS-2不再能正常使用了。但通过一些简单的修改，有时将码位表示为两字节、有时表示为四字节，就得到了UTF-16（Unicode Transformation Format, 16-bit）编码。

UTF-16的原理如下：
- 如果码位可以用16个二进制数表示，那么就直接表示为16个二进制数
- 如果不能，……

为了进一步压缩存储空间，又引入了UTF-8编码，UTF-8也是一种变长编码。视Unicode的码位大小，编码后的字节串，可能是一字节、二字节、三字节、四字节不等。具体如下：
- ……

在现实中，UTF-8和UTF-16是最为常见的Unicode编码规则。Windows的大部分API都使用UTF-16，而Unix/Linux系统大多使用UTF-8。

### Six在兼容Py2和Py3时，是如何处理Unicode与Str的

TODO

### Django是如何做Unicode/Str兼容的

TODO

### 参考阅读

1. [How Python does Unicode](https://www.b-list.org/weblog/2017/sep/05/how-python-does-unicode/)
2. [字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
