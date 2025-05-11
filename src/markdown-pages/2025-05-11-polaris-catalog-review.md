---
slug: "/blog/polaris-catalog-review"
date: "2025-05-11"
title: "Polaris Catalog浅探"
excerpt: "Iceberg时代的Hive Metastore"
image: "../images/polaris.png"
---

在过去的十多年中，Hive Metastore几乎就是data catalog这个领域的事实标准。Hive的后来者无论是Presto还是Spark，要操作Hadoop上的表数据，都绕不开
Hive Metastore。而随着开放数据表格式的兴起，Iceberg、Hudi、Delta则都有自己的一套Catalog，完成针对具体table的建表、删表、重命名等任务，
也包括维护所有托管的表，记录每张表最新的元数据。Delta有自己的Unity Catalog，Iceberg则在支持Hive Metastore作为catalog之外，
也定义了相关的OpenAPI接口，支持REST类型的catalog。Snowflake开源并捐献给Apache基金会的Polaris Catalog，就是Iceberg REST catalog的一种实现。

## Iceberg REST Catalog定义了哪些内容？
参考Iceberg的[OpenAPI spec](https://github.com/apache/iceberg/blob/main/open-api/rest-catalog-open-api.yaml)以及
[Swagger UI](https://editor-next.swagger.io/?url=https://raw.githubusercontent.com/apache/polaris/refs/tags/apache-polaris-0.9.0-incubating/spec/rest-catalog-open-api.yaml),
这里提供的API包括namespace(也就是database)的增删改查，namespace下table和view的增删改查，以及Iceberg的事务操作，比如单一table的事务更新
（即commit snapshot），以及针对多个table创建的事务。

Iceberg的Catalog除去事务是特殊的之外，其它namespace/table/view的操作，都可以简单对应到Hive Metastore的API。

## Polaris Catalog在Iceberg REST Catalog之上提供了什么额外的内容？

### 多Catalog
Iceberg的REST Catalog是针对单一的catalog的specification，但查询引擎可以不限于只使用单个catalog。以Spark为例，配置时需要指定：

```shell
spark-sql --packages org.apache.iceberg:iceberg-spark-runtime-3.5_2.12:1.9.0\
    --conf spark.sql.extensions=org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions \
    --conf spark.sql.catalog.spark_catalog=org.apache.iceberg.spark.SparkSessionCatalog \
    --conf spark.sql.catalog.spark_catalog.type=hive \
    --conf spark.sql.catalog.rest_prod=org.apache.iceberg.spark.SparkCatalog \
    --conf spark.sql.catalog.rest_prod.type=rest \
    --conf spark.sql.catalog.rest_prod.uri=http://localhost:8080 \
    --conf spark.sql.defaultCatalog=local
```

这样在同一个Spark session中，Hive Metastore和Iceberg相关的REST Catalog中的表，都可以一起使用。类似的，Spark也可以指定多个Iceberg REST catalog，
而Polaris是支持创建多个Catalog的。

### 权限控制

Polaris支持向不同的查询引擎实例提供不同的权限认证。比如总共创建了三个Catalog: Catalog1, Catalog2, Catalog3。而公司内部有多套不同的查询引擎：
市场部门的Snowflake1，财务部门的Snowflake2，数据部门的Spark。可以配置出Spark允许访问Catalog 1,2,3；Snowflake1只允许访问Catalog 1；
Snowflake2只允许访问Catalog 2这样的权限认证模式。

另外每个Catalog底下可以对应不同的存储介质，比如S3, GCS, Azure等。Polaris也托管了到这些对象存储的认证信息，并在查询执行时，
将相应的认证信息提供给查询引擎。这样Spark/Snowflake等可以不需要留存对S3, GCS, Azure的访问密钥。

## Polaris如何实现REST Catalog

**`polaris-api-iceberg-service`**: 包含了通过openapi.yaml进行codegen之后的controller部分的代码，以及service的interface。

**`polaris-service-common`**: 以Adapter的形式，具体实现了上面的interface。

**`polaris-relational-jdbc`**: 数据库持久层，Polaris里将其称作Metastores，将catalog, namespace, table等元数据持久化到PostgreSQL.

另外核心的业务逻辑在`polaris-core`，而Web Service是通过**quarkus**来实现的，所以有`polaris-quarkus-*`的一系列模块。

## 结语

Polaris能否在长期持续演化，并在Iceberg生态链中扮演曾经Hive Metastore之于Hadoop的作用，让我们拭目以待。
