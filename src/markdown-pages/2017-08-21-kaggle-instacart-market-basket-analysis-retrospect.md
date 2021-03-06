---
slug: "/blog/kaggle-instacart-market-basket-analysis-retrospect/"
date: "2017-08-21"
title: "Kaggle Instacart复购预测竞赛回顾"
excerpt: "客户下次会购买什么"
image: "../images/instacart.jpg"
---

Instacart是一家食品类垂直电商，在Kaggle上举办的这场比赛中，参赛人员需要利用其公开的交易数据建立机器学习模型，预测用户会再度购买哪些商品。

知道用户可能会购买哪些商品，有什么样的用处呢？最直接的，平台可以针对性地给用户发放促销优惠券，而更远景的目标，结合一些其它数据，或许可以做销量预测和库存优化，节约仓储、采购成本。

## 已有数据集

比赛使用的数据仅包含交易数据，不包含浏览数据。主要由以下几张表构成：

1. 订单表 orders（订单ID，用户ID，所属数据集，该用户的订单序号，订单下单在星期几，订单下单所在小时，距离上一次下单过去的天数）：数据粒度为一个订单事实。其中，所属数据集包含三类：a) 先验集：所有用户在历史一段时间内产生的所有订单；b) 训练集：从所有用户中抽出一部分训练用户，在考察周期内产生的所有订单；c) 测试集：除去训练用户外剩下的用户，在考察周期内产生的所有订单。先验集中，每个用户可能包含多个订单。而对于训练集和测试集，两者的用户无交集，且每个用户在各自集合内也只会有一个订单。

2. 商品表 products（商品ID，商品名称，通道ID，分类ID）：数据粒度为一件商品。

3. 通道表 aisles（通道ID，通道名称）：数据粒度为一个通道。这里的通道，就是超市里的通道/走道，每一个通道两侧的商品，通常是一个类别的，而走道上方，往往会有一个标识牌。

4. 分类表 departments（分类ID，分类名称）：数据粒度为一个分类。是比通道更大的分类概念，但二者相互没有确定的包含关系。

5. 先验集订单商品表 order_products_prior（订单ID，商品ID，加入购物车的次序，是否复购）：注意先验集包含所有的用户，这里的数据粒度是历史一段时期内，所有用户购买的所有商品记录。

6. 训练集订单商品表 order_products_train（订单ID，商品ID，加入购物车次序，是否复购）：这里是训练集用户，在考察期内，购买的所有商品记录。上面提过，这个数据集里的每个用户，只会有一个订单，其中包含若干个商品，可能包含也可能不包含复购的商品。

如果不使用NLP的方法对名称类字段进行处理的话，商品名称、通道名称、分类名称这几个字段是没有用的。在实际项目中，也没有进行相关处理，所以后面这几个字段将略过不谈。

最终产出的数据，是订单表的测试集中，每个订单所包含的复购商品，也即仅包含复购的测试集订单商品表。由于上面提到了，训练集和测试集实际上是按照用户划分的，所以最终提交的数据，也是测试用户在考察期间内，复购的所有商品。

## 问题的评价标准

按照每个用户实际复购的商品，和预测复购的商品，针对单个用户计算F1得分，最终再按用户人均的F1得分。

复购预测是一个典型的非均衡分类问题，绝大多数的商品都会落入TN的范围内——一件商品，算法预测不复购、用户实际也没有复购，所以准确率Accuracy是一个不好的指标，预测用户不复购任何商品，这个分类问题就可以得到很高的准确率。

与此同时，精准率Precision和召回率Recall也都不足以描述问题的关键。

片面考虑精准率，算法会趋于谨慎，只预测非常有把握实际会复购的，从而漏掉一部分实际复购的；覆盖面不够广，促销的力度可能不够。

片面考虑召回率，算法会趋于冒险，尽可能多地把实际复购的商品都挑选出来，从而预测了一部分实际上用户没有复购的；覆盖面过于广，造成促销活动的浪费。

F1 = 2 / (1/Precision + 1/Recall) = 2TP / (2TP + FP + FN)

注意到，在F1的计算过程中，TN是不纳入计算的。这也符合问题的初衷。

## 机器学习表述

将业务问题转化为一个机器学习问题的过程是项目成败的关键。从业务方提过来的问题，常常更贴近于业务现实，比如“最近公司的优惠券发得太漫无目的了，成本大幅上升，为了更高效地发放优惠券，我们希望能预知用户可能购买的商品”。而后续需要将问题进行机器学习的表述。

汇总出可以取得到的相关数据（使用交易数据，浏览数据很重要但可能无法获得），梳理出问题的评价标准（使用F1，而不是Accuracy）是问题的机器学习表述中极为关键的步骤。数据决定了后续算法的潜力如何，而评价标准则决定了算法潜力兑现后，模型多大程度上解决了业务问题。

而剩下的关键问题是，机器学习建模。我们面临的是哪一类机器学习问题？模型的粒度，也就是说，一条训练样本代表着什么？

在梳理问题评价标准的同时，我们已经发现，这是一个分类问题。给定一个用户，一件商品，算法需要预测出，用户是否会复购这件商品，因而模型的粒度是用户-商品。而复购，意味着用户曾经购买过这件商品才可能形成复购，不需要将所有用户和所有商品做笛卡尔积，挑选出各位用户及其曾经购买过的所有商品的组合即可。

注意到，在给定的数据集中，订单的粒度是一个订单，对应着一个用户的一次下单行为，订单商品的粒度是一个订单商品，对应着一个用户的一次商品购买，用户-商品组合可能出现多次。而我们的模型要求，每个用户-商品只允许出现一次，所以各类特征，不能简单从原始表中直接拿来用，而是需要根据用户-商品的粒度做一些聚合操作。

## 特征工程之维度建模

机器学习的模型，要求每条训练样本是用户-商品粒度，这和既有的订单表、订单商品表都不符，所以需要聚合特征。尽管不完全等同于数据仓库维度建模中的事实表和维度表区分，我们依然可以将用户在未来购买某件商品看做是一件未来的事实，围绕这个事实，添加一系列的维度，每个维度包含其自身的维度属性，用作模型的特征。具体地，整理出来的特征如下：

1 用户特征：

1.1 购买数次；1.2 购买频率（间隔天数）；1.3 复购率；1.4 平均每单购买的商品数；1.5 第一次购买距最后一单天数；1.6 该用户购买的总商品数；1.7 该用户购买多少种商品

2 商品特征：

2.1 购买订单数；2.2 购买用户数；2.3 复购订单数；2.4 复购人数；2.5 复购率

3 用户商品特征：

3.1 购买订单数；3.2 复购订单数；3.3 订单复购率；3.4 最近购买距今间隔（天）；3.5 最近购买距今间隔（订单）；3.6 该商品被添加到购物篮中的平均位置；3.7 该商品次数占比：该商品购买次数/该用户所有商品购买次数；3.8 最后一次购买标识；3.9 用户购买该商品的次数；3.10 用户第一次购买该商品所处的订单数；3.11 用户最后一次购买该商品所处的订单数；3.12 最近一次购买商品 - 最后一次购买该商品；3.13 该商品购买次数 / 第一次购买该商品到最后一次购买商品的的订单数；3.14 最近N单购买次数

4 分类特征：

4.1 购买订单数；4.2 购买用户数；4.3 复购订单数；4.4 复购人数；4.5 复购率

5 用户分类特征：

5.1 购买订单数；5.2 复购订单数；5.3 订单复购率；5.4 购买商品次数；5.5 复购商品次数；5.6 商品购买复购率；5.7 购买商品种类；5.8 复购商品种类；5.9 商品种类复购概率；5.10 最近购买距今间隔（天）；5.11 最近购买距今间隔（订单）；5.12 订单购买顺序统计；5.13 通道购买商品次数占比：该通道商品购买次数/所有商品购买次数；5.14 通道购买商品种类占比：购买该通道商品种类/所有购买商品种类；5.15 最后一次购买标识

6 通道特征：

6.1 购买订单数；6.2 购买用户数；6.3 复购订单数；6.4 复购人数；6.5 复购率

7 用户通道特征：

7.1 购买订单数；7.2 复购订单数；7.3 订单复购率；7.4 购买商品次数；7.5 复购商品次数；7.6 商品购买复购率；7.7 购买商品种类；7.8 复购商品种类；7.9 商品种类复购概率；7.10 最近购买距今间隔（天）；7.11 最近购买距今间隔（订单）；7.12 订单购买顺序统计；7.13 通道购买商品次数占比：该通道商品购买次数/所有商品购买次数；7.14 通道购买商品种类占比：购买该通道商品种类/所有购买商品种类；7.15 最后一次购买标识

聚合出上述特征后，放到XGBoost的模型中去训练，即可得到不错的分类模型。关于特征的选择，参考了这篇[KDD论文](http://www.kdd.org/kdd2016/papers/files/adf0160-liuA.pdf)，里面有更详细的特征分析。

## 算法的优化目标 vs 问题的优化目标

实际上，在模型的训练过程中，有一个隐含的问题。之前提到了，这个复购预测的评价指标，是人均F1得分。而XGBoost默认的优化目标是[logloss](https://en.wikipedia.org/wiki/Likelihood_function#Log-likelihood)，二者不是正相关的。换言之，是可能出现logloss优化到最小，而人均F1不是最优的情况。

二分类问题，针对F1进行优化，也有非常多的研究。可以针对性地设计优化函数，也可以针对条件概率分类器调整阈值。相关的论文可阅览参考阅读，我们这里采用的是后一种方法。因为Xgboost分类的结果，是一个概率表述，默认当概率大于0.5时，分为正类，否则为反类。调整预估是正类的阈值到0.21左右，在这个阈值的情况下，人均F1得分会最大化。具体的值是通过交叉验证来确定的。

## 无复购的处理

由于复购预测的评价指标是人均F1得分，这样就难免出现无任何商品复购的用户，而如果算法也预测用户没有任何购买，也即所有的预测结果都是TN，那么F1的计算结果会是0/0，没有意义。

为了规避上面这个问题，评价规则特别指出，如果预测用户没有任何复购，需要指明其复购商品为None。如果预测是None，实际也是None，该用户F1的得分就会是1。

但这个同时滋生了另一个问题，None就成为了一个特殊的“商品”。根据目前的用户-商品模型，用户无复购，即“购买了None”的概率P(None) = 1 - P(复购商品1)...P(复购商品n)。也就是说，如果算法预测用户没有复购任何商品，这是用户就购买了None。

社区里有人指出，在目前评价标准为人均F1的情况下，针对None单独做一个预测模型，最终的效果会更好。这个策略我没有进行尝试。可以参考[Instacart Market Basket Analysis, Winner's Interview: 2nd place, Kazuki Onodera](http://blog.kaggle.com/2017/09/21/instacart-market-basket-analysis-winners-interview-2nd-place-kazuki-onodera/?utm_source=Mailing+list&utm_campaign=3832403754-Kaggle_Newsletter_09-10-2017&utm_medium=email&utm_term=0_f42f9df1e1-3832403754-399140641)。

## 更高阶的玩法

在参与这项比赛的过程中，我就察觉出来了，我基本上一直在搞特征工程——想特征，交叉验证测试，筛选特征。这个多少让数据科学变得不那么性感。

但是，比赛结束后，果然，有更性感的方案。最终排名第三的用户，公布了他的神经网络算法，所有特征是通过神经网络自动生成的，之后再用XGBoost跑分类模型。神经网络大法好！

有兴趣可以参考[3rd-Place Solution Overview](https://www.kaggle.com/c/instacart-market-basket-analysis/discussion/38097)。

## 结语

我的模型，最终在所有2623名参赛选手中，排名662，前26%，未获得奖牌。接下来，还需要继续努力。Go Kaggle!

## 参考阅读

1. [Repeat Buyer Prediction for E-Commerce](http://www.kdd.org/kdd2016/papers/files/adf0160-liuA.pdf)
2. [Optimizing the F-Measure in Multi-Label Classification: Plug-in Rule Approach versus Structured Loss Minimization](http://proceedings.mlr.press/v28/dembczynski13.pdf)
3. [Thresholding Classifiers to Maximize F1 Score](https://arxiv.org/pdf/1402.1892.pdf)
