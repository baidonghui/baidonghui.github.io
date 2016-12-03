---
layout: post
title:  "Oracle中的dual详解"
categories: oracle
tags:  dual oracle
---

* content
{:toc}

对于Oracle的dual，有以下几点我们需要明确：

- `dual`不是缩写词而是完整的单词。`dual`名词意思是对数，做形容词时是指二重的，二元的。
- `Oracle`中的`dual`表是一个单行单列的虚拟表。
- `dual`表是`Oracle`与数据字典一起自动创建的一个表，这个表只有1列`DUMMY`，数据类型为`VERCHAR2(1)`，`dual`表中只有一个数据`'X'`, `Oracle`有内部逻辑保证`dual`表中永远只有一条数据。
- `dual`表主要用来选择系统变量或求一个表达式的值。
- 最常见的一个简单的例子`SELECT sysdate FROM daul`

`Oracle`的`SELECT`语法的限制为 `SELECT * | [column1 [AS alias1], column2 [AS alias2]] FROM table`所以没有表名就没有办法查询，而时间日期并不存放在任何表中，于是这个`dual`虚拟表的概念就被引入了。

# DUAL表的用途

`dual`是`Oracle`中的一个实际存在的表，任何用户均可读取，常用在没有目标表的`Select`语句块中。

```sql
-- 查看当前连接用户
select user from dual; 
SYSTEM

-- 查看当前日期、时间
select sysdate from dual; 
2012-1-24 1

-- 日期转换
select to_char(sysdate,'yyyy-mm-dd hh24:mi:ss') from dual; 
2012-01-24 15:02:47

-- 当作计算器用
select 1+2 from dual;
3

-- 创建查看序列值
create sequence aaa increment by 1 start with 1;
select aaa.nextval from dual;
1

select aaa.currval from dual;
1
```

`dual`就是个一行一列的表，如果你往里执行`insert`,`delete`,`truncate`操作，就会导致很多程序出问题。结果也因`sqlplus、pl/sql dev`等工具而异。假我们插入想`dual`插入一条数据，那会是什么结果呢？

```sql
insert into dual values('Y');

select * from dual;
DUMMY
-----
X
Y

select sysdate from dual;
SYSDATE
-----------
2012-07-15
2012-07-15
```

这个时候返回的是两条记录，会引起问题。在通过使用`select sysdate into v_sysdate from dual`来获取时间或者其他信息的存储过程来说，`Oracle`会抛出`TOO_MANY_ROWS(ORA-01422)`异常。

因此，需要保证在`dual`表内有且仅有一条记录，不能把`dual`表的`UPDATE`，`INSERT`，`DELETE`权限随意释放出去，这样对于系统是很危险的。

如果不小心把`dual`删除了，是可以恢复的。