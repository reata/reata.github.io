---
title: "SQLLineage: 基于Python的SQL血缘分析工具"
excerpt: "构建表级血缘"
header:
  overlay_image: assets/images/world.svg
  overlay_filter: 0.4
  caption: "图片引用自https://graphviz.org/Gallery/directed/world.svg"
categories:
  - big-data
  - parser
tags:
  - big data
  - sql parsing
author: "胡俊伟"
date: "20 September 2020"
---

### 缘起

做数据的人，都离不开宿命的SQL。从Hive到Spark SQL，SQL形式的ETL已经覆盖了大数据离线计算的绝大多数场景。而Presto甚至提出了SQL on everything
的口号，旨在做一个针对异构系统的统一操作引擎，查询语言毫无疑问是SQL。而随着Flink的普及，我们也开始看到SQL进入流式计算的领域。无处不在的SQL，
SQL可能会比我们活得都长。但即便如此，这些依然改变不了SQL本身层次多、冗余、难读的特点。

我经常听数据仓库工程师说，分析人员抛过来了一个上千行、业务价值满满、同时也令人绝望的SQL。梳理清楚哪些表之间在做Join，结果又写进了哪张表，
就需要花很长的时间，更不要说深入到其中的业务逻辑。从数据平台的角度，SQL血缘也有非常广泛的用途，首当其冲自然是构建表之间的数据血缘关系，
数据血缘可以帮助开发人员更好地认识表之间的数据流向，理解业务，并且在需要做数据变更时去做影响分析。而在任务调度时，也可以通过表级别的血缘关系，
反过来去推荐、诊断、优化任务级别依赖关系的配置。

需求始终存在，但当年的我，不懂编译器（compiler）、语法分析（parser）、词法分析（lexical analyzer）等等概念，我试图用正则表达式（regular expression）
这个朴素的手段来解决问题，想法也非常直接，FROM或者JOIN后面就是源表，INSERT INTO/INSERT OVERWRITE TABLE后面就是目标表嘛，easy，这个我稍微调试一下，
两下就能写出来。

```python
# 当年我用来抓取表名的正则
source_table_regex = re.compile(r"(?:from|join)\s+(\S*)(?:\s+|;)", re.IGNORECASE)
target_table_regex = re.compile(r"insert\s+(?:into|overwrite)\s+table\s+(\S*)\s+", re.IGNORECASE)
```

这个方法显然不是这么准确，比如碰到下面这个SQL

```sql
insert overwrite table table_foo
select * from /* let's play with a comment */ table_bar;
```

显然我会认为/*是表名，虽然人家不过是个注释。

再比如说我还可以写个恶趣味的SQL

```
select * from table_foo
where description = "from Excel";
```

这时候Excel也变成一个表名了，确实很表，但它不是我想要的。

虽然看起来确实很傻瓜、充满了漏洞，但这个正则的方案还是活了很久，事实上，加上一些if-else的判断和预处理，在生产环境中可能80%~90%的情况，
它是可以返回正确结果的。不过，作为一个有追求的程序员，怎么可以满足于90分对吧。我也想借此机会了解一下编译原理相关的东西，
AST抽象语法树这个东西我听的够多了，它到底是个啥呢？这些都一起促成了做[SQLLineage](https://github.com/reata/sqllineage)这个项目的初衷。

### 设计思路

在动手开发之前，我先有过一些思考：

我希望这个工具尽量简单，有命令行的界面，同时作为一个Python Package发布，这样pip安装后也可以import到其他的项目中。这个简单的工具，不会去执行SQL，
或者连接任何元数据系统（比如Hive metastore）。我只对代码进行静态分析。优点当然是简单，而劣势就是可能这个血缘解析只能完美地做到表级别的血缘，
对于字段级别的血缘，假如有select *的情况，就会丢失信息。这也是我暂时没有做字段级别血缘的主要原因。

另外一个取舍是从原理层面来说，我不想自己去做parser，最理想的情况是有一个通用的parser，可以将绝大多数常见的SQL方言解析成AST，
然后我只要对AST进行分析，产出源表、目标表等人类可读的结果就好。遵循这个思路，我找到了[sqlparse](https://github.com/andialbrecht/sqlparse)这个项目，
它将自己定位为一个不进行语法校验的通用SQL parser，当然也是基于Python来开发的。

在sqlparse把SQL语句解析成AST之后，我们要做的事情就和之前正则的时候大差不差了。对于源表，无非是找到FROM或者JOIN相关的Keyword，看它后面的
Token是什么，如果是Comment或者Whitespace就继续往后看，如果是Identifier，取出它的name，如果是Subquery，则递归地再搜索一层。当然如前面所说，
sqlparse不进行语法校验，一方面这意味着有了更多SQL方言支持的可能，当然反过来，解析出来的结果可能是不对的。比如Subquery，在没写alias的情况下
（在某些SQL方言中，子查询不写别名，语法也是正确），会被解析成了Identifier，不能直接取name。真正开始写代码之后，我发现各种各样的边界条件都是可能存在的。

所以最开始在我的设想中，这个package就需要充分的测试，尽可能广的测试用例，尽可能高的测试覆盖。我是用pytest框架来做单元测试的，目前1.0版本总共有77个
测试用例，代码覆盖率是97%，可以在[codecov](https://codecov.io/gh/reata/sqllineage)看到详尽的代码覆盖情况。

### Show Me The Code

sqllineage已经发布到了PyPI上，可以通过pip直接进行安装使用：
```bash
$ pip install sqllineage
# 安装完成之后，会自带一个sqllineage的命令行工具
$ sqllineage -e "insert into db1.table1 select * from db2.table2"
Statements(#): 1
Source Tables:
    db2.table2
Target Tables:
    db1.table1
```

安装后也可以在Python脚本中直接调用：
```python
from sqllineage.runner import LineageRunner
sql = """insert into db1.table11 select * from db2.table21 union select * from db2.table22; 
insert into db3.table3 select * from db1.table11 join db1.table12;"""
result = LineageRunner(sql)
print(result)
# 打印result，会产出下面的信息
# Statements(#): 2
# Source Tables:
#    db1.table12
#    db2.table21
#    db2.table22
#Target Tables:
#    db3.table3
#Intermediate Tables:
#    db1.table11

# 也可以直接获取各个源表
for tbl in result.source_tables: 
    print(tbl)
#db1.table12
#db2.table21
#db2.table22

# 目标表当然也是可以的
for tbl in result.target_tables: 
    print(tbl)
# db3.table13

# 甚至还可以调用matplotlib绘制血缘图
result.draw()
```
下面这样一张表级血缘图会自动弹出：
<div style="text-align:center" markdown="1">
![sqllineage]({{ site.url }}{{ site.baseurl }}/assets/images/sqllineage.png)
</div>

SQLLineage目前已经发布v1.0版本，进入稳定可用状态，让我一起来探索SQL血缘吧！

### 相关链接
- 代码：[https://github.com/reata/sqllineage](https://github.com/reata/sqllineage)
- 文档：[https://sqllineage.readthedocs.io/](https://sqllineage.readthedocs.io/)
- PyPI：[https://pypi.org/project/sqllineage/](https://pypi.org/project/sqllineage/)
