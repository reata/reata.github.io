---
slug: "/blog/smallpond-review"
date: "2025-05-01"
title: "smallpond浅探"
excerpt: "Deepseek AI开源的数据处理框架"
image: "../images/smallpond.png"
---

[Smallpond](https://github.com/deepseek-ai/smallpond) 是DeepSeek开源的一个基于DuckDB的轻量级数据处理框架。在Andy Pavlo教授的年度回顾中
[Databases in 2024: A Year in Review](https://www.cs.cmu.edu/~pavlo/blog/2025/01/2024-databases-retrospective.html)，
他就提到在OLAP领域中，其实绝大多数的query处理的数据量都很小，中位数在100MB(而目前AWS上EC2提供的最大内存的实例为24TB），这意味着使用单实例的
DuckDB已经足够。更不必说使用DuckDB同时意味着原生就有了列式存储和向量执行的支持，性能优越。如今很多数据库都在开始集成DuckDB作为查询引擎。

Smallpond将DuckDB引入了数据处理领域，和Spark来到了同一战场。这里面就有很多值得一探的地方了。

## Smallpond的编程API
Smallpond有一套自己的DataFrame定义，针对DataFrame有map, filter, flat_map, repartition等等操作，所有操作都是惰性执行的，和Spark高度类似。
每个DataFrame都包含一个logical plan，map/filter这些操作会生成一个新的DataFrame，持有一个变更过的logical plan。

每一个plan都是一个Node，同时Node有自己的input_deps，可以追溯到直接依赖的上游Node。Node为点，input_deps为边，就共同构成一个DAG。
举例来说，像`df2=df1.map(col=1)`这样一段代码，df2的plan就是SqlEngineNode，并且这个SqlEngineNode通过input_deps参数，指向df1的Node。
df1可以是一个单独的读取文件系统的Node，也可以是已经经过多次操作嵌套的plan。

Node具体的类型，和Spark大差不差。有类似DataSourceNode, ShuffleNode, HashPartitionNode, SqlEngineNode, DataSinkNode等等。
所有的Node都持有同一session的Context，Context里面有node_id的计数，会自动自增。

注意到像map, filter这些操作，在Spark中就是一个Project或者Filter算子，但是在Smallpond中，都是SqlEngineNode。SqlEngineNode并行地在每个
partition上通过调用DuckDB来执行。map对应的sql就是`select {expr} from {df}`, filter对应`select * from {df} where ({expr})`

## Smallpond支持SQL API吗？

Spark的SQL API和DataFrame API，都可以解析成相同的Logical Plan。就SQL而言，一个复杂的SQL是会拆成多个任务来执行，中间可能涉及到shuffle。
这也是从MapReduce, Hive一路继承而来的。

而Smallpond是不会自动完成任务的拆分的。比如Readme里[Quick Start](https://github.com/deepseek-ai/smallpond/tree/v0.15.0?tab=readme-ov-file#quick-start)的例子：

```python
import smallpond

# Initialize session
sp = smallpond.init()

# Load data
df = sp.read_parquet("prices.parquet")

# Process data
df = df.repartition(3, hash_by="ticker")
df = sp.partial_sql("SELECT ticker, min(price), max(price) FROM {0} GROUP BY ticker", df)

# Save results
df.write_parquet("output/")
# Show results
print(df.to_pandas())
```

要执行的sql是：

```sql
SELECT ticker, min(price), max(price) FROM {0} GROUP BY ticker
```

就Spark而言，我们知道这里会用ticker作为key，对整个数据集进行shuffle，按`spark.sql.shuffle.partitions`参数进行自动分为若干个分区，
再并行地对每个分区上的结果执行计算。

而Smallpond需要用户显式地根据ticker来做repartition。这也是为啥它的操作叫做**partial_sql**. 如果这里用户指定的hash_by字段不对，
或者使用的是其它的分区策略，那么出来的计算结果就是错的。

**partial_sql**的函数注释里也明确了，如果要对多个df做join，用户需要自己保证两个df的是按照join key具有相同的分区的。

这也是Smallpond目前和Spark最大功能差距。暂时Smallpond还是一个轻量级数据处理框架，并不能完全覆盖整个数据处理的场景。
编写代码的用户需要对底层分布式执行的细节有更大程度的理解。

## Smallpond的Optimizer做了什么

前面提到，DataFrame是惰性计算的，针对DataFrame的每个操作，都在现有plan的基础上，继续添加节点。

而最终DataFrame在执行之前，会走Optimizer[生成optimized_plan](https://github.com/deepseek-ai/smallpond/blob/v0.15.0/smallpond/dataframe.py#L235)。

```python
self.optimized_plan = Optimizer(exclude_nodes=set(self.session._node_to_tasks.keys())).visit(self.plan)
```

[Optimizer](https://github.com/deepseek-ai/smallpond/blob/v0.15.0/smallpond/logical/optimizer.py)目前只实现了
visit_query_engine_node，也就是针对DuckDB的算子。

```python
def visit_query_engine_node(self, node: SqlEngineNode, depth: int) -> Node:
    # fuse consecutive SqlEngineNodes
    if len(node.input_deps) == 1 and isinstance(
        child := self.visit(node.input_deps[0], depth + 1), SqlEngineNode
    ):
        fused = copy.copy(node)
        fused.input_deps = child.input_deps
        fused.udfs = node.udfs + child.udfs
        fused.cpu_limit = max(node.cpu_limit, child.cpu_limit)
        fused.gpu_limit = max(node.gpu_limit, child.gpu_limit)
        fused.memory_limit = (
            max(node.memory_limit, child.memory_limit)
            if node.memory_limit is not None and child.memory_limit is not None
            else node.memory_limit or child.memory_limit
        )
        # merge the sql queries
        # example:
        # ```
        # child.sql_queries = ["select * from {0}"]
        #  node.sql_queries = ["select a, b from {0}"]
        # fused.sql_queries = ["select a, b from (select * from {0})"]
        # ```
        fused.sql_queries = child.sql_queries[:-1] + [
            query.format(f"({child.sql_queries[-1]})") for query in node.sql_queries
        ]
        return fused
    return self.generic_visit(node, depth)
```

这里具体的优化逻辑是，如果连续两个算子都是sql算子，那么通过子查询的形式，将sql合并，两个算子变成一个算子，少调用一次DuckDB，算是一个非常直接易懂的优化规则。

## Planner: Smallpond和Ray的集成

生成optimized plan之后，planner进一步[生成执行计划](https://github.com/deepseek-ai/smallpond/blob/v0.15.0/smallpond/dataframe.py#L259)。

```python
# create tasks for the optimized plan
planner = Planner(self.session._runtime_ctx)
# let planner update self.session._node_to_tasks
planner.node_to_tasks = self.session._node_to_tasks
return planner.visit(self.optimized_plan)
```

具体来说，Planner把Optimized Plan里的Node，转换为Task。Task基本就是针对Ray Core里的Low Level API: Ray Task的抽象。

[task.run_on_ray()](https://github.com/deepseek-ai/smallpond/blob/v0.15.0/smallpond/dataframe.py#L285)，
会创建[在ray上的执行任务](https://github.com/deepseek-ai/smallpond/blob/v0.15.0/smallpond/execution/task.py#L1127)，
task在ray上执行完成后，会返回一个DataSet。

```python
@ray.remote
def exec_task(task: Task, *inputs: DataSet) -> DataSet:
    import multiprocessing as mp
    import os
    from pathlib import Path

    from loguru import logger

    # ray use a process pool to execute tasks
    # we set the current process name to the task name
    # so that we can see task name in the logs
    mp.current_process().name = task.key

    # probe the retry count
    task.retry_count = 0
    while os.path.exists(task.ray_marker_path):
        task.retry_count += 1
        if task.retry_count > DEFAULT_MAX_RETRY_COUNT:
            raise RuntimeError(f"task {task.key} failed after {task.retry_count} retries")
    if task.retry_count > 0:
        logger.warning(f"task {task.key} is being retried for the {task.retry_count}th time")
    # create the marker file
    Path(task.ray_marker_path).touch()

    # put the inputs into the task
    assert len(inputs) == len(task.input_deps)
    task.input_datasets = list(inputs)
    # execute the task
    status = task.exec()
    if status != WorkStatus.SUCCEED:
        raise task.exception or RuntimeError(f"task {task.key} failed with status {status}")

    # dump the output dataset atomically
    os.makedirs(os.path.dirname(task.ray_dataset_path), exist_ok=True)
    dump(task.output, task.ray_dataset_path, atomic_write=True)
    return task.output
```

DataFrame API -> Logical Plan -> Optimized Plan -> Execution Task，算是一个非常典型的数据处理框架的架构。而针对DuckDB的使用，
是非常具有启发性的。
