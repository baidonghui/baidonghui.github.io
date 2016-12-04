---
layout: post
title:  "站点维护日志"
categories: 站点维护日志
tags:  站点维护日志
---

* content
{:toc}

最近服务器总是出现`error establishing database connection`，无奈查看了mysql错误日志

```
2015-11-07 04:19:22 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2015-11-07 04:19:22 31654 [Note] Plugin 'FEDERATED' is disabled.
2015-11-07 04:19:22 31654 [Note] InnoDB: Using atomics to ref count buffer pool pages
2015-11-07 04:19:22 31654 [Note] InnoDB: The InnoDB memory heap is disabled
2015-11-07 04:19:22 31654 [Note] InnoDB: Mutexes and rw_locks use GCC atomic builtins
2015-11-07 04:19:22 31654 [Note] InnoDB: Memory barrier is not used
2015-11-07 04:19:22 31654 [Note] InnoDB: Compressed tables use zlib 1.2.3
2015-11-07 04:19:22 31654 [Note] InnoDB: Using Linux native AIO
2015-11-07 04:19:22 31654 [Note] InnoDB: Using CPU crc32 instructions
2015-11-07 04:19:22 31654 [Note] InnoDB: Initializing buffer pool, size = 128.0M
InnoDB: mmap(137363456 bytes) failed; errno 12
2015-11-07 04:19:22 31654 [ERROR] InnoDB: Cannot allocate memory for the buffer pool
2015-11-07 04:19:22 31654 [ERROR] Plugin 'InnoDB' init function returned error.
2015-11-07 04:19:22 31654 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.
2015-11-07 04:19:22 31654 [ERROR] Unknown/unsupported storage engine: InnoDB
2015-11-07 04:19:22 31654 [ERROR] Aborting
```

检查内存使用情况

```
# free
             total       used       free     shared    buffers     cached
Mem:       1019204     996004      23200          0      26408     75220
-/+ buffers/cache:     894376     124828
Swap:            0          0          0
```

主要问题出在内存不足上，然后查到了[关于阿里云小内存服务器Mysql运行一段时间后自动停止解决方法](http://www.zzsck.org/program/mysql/5477.html)，上面提到三种解决方案

> 如果不需要mysql的innodb表建议关闭
> 为了节约内存nginx也做了相关配置。一个CPU的话单进程，265个线程即可。
> 减少php-fpm的资源占用，根据自己的实际情况修改

## 修改默认引擎

首先查看MYSQL引擎状态

```
mysql> show engines;
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| Engine             | Support | Comment                                                        | Transactions | XA   | Savepoints |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables      | NO           | NO   | NO         |
| CSV                | YES     | CSV storage engine                                             | NO           | NO   | NO         |
| MRG_MYISAM         | YES     | Collection of identical MyISAM tables                          | NO           | NO   | NO         |
| BLACKHOLE          | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO   | NO         |
| MyISAM             | YES     | MyISAM storage engine                                          | NO           | NO   | NO         |
| FEDERATED          | NO      | Federated MySQL storage engine                                 | NULL         | NULL | NULL       |
| ARCHIVE            | YES     | Archive storage engine                                         | NO           | NO   | NO         |
| InnoDB             | DEFAULT | Supports transactions, row-level locking, and foreign keys     | YES          | YES  | YES        |
| PERFORMANCE_SCHEMA | YES     | Performance Schema                                             | NO           | NO   | NO         |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
```

停止mysql服务

```
# service mysqld stop
```

定位到MYSQL的配置文件`alidata/server/mysql/my.cnf`，在`[mysqld]`下添加

```
default-storage-engine = MYISAM
```

启动mysql服务

```
# service mysqld start
Starting MySQL.                                            [  OK  ]
```

再次检查MYSQL引擎状态

```
mysql> show engines;
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| Engine             | Support | Comment                                                        | Transactions | XA   | Savepoints |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables      | NO           | NO   | NO         |
| CSV                | YES     | CSV storage engine                                             | NO           | NO   | NO         |
| MRG_MYISAM         | YES     | Collection of identical MyISAM tables                          | NO           | NO   | NO         |
| BLACKHOLE          | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO   | NO         |
| MyISAM             | DEFAULT | MyISAM storage engine                                          | NO           | NO   | NO         |
| FEDERATED          | NO      | Federated MySQL storage engine                                 | NULL         | NULL | NULL       |
| ARCHIVE            | YES     | Archive storage engine                                         | NO           | NO   | NO         |
| InnoDB             | YES     | Supports transactions, row-level locking, and foreign keys     | YES          | YES  | YES        |
| PERFORMANCE_SCHEMA | YES     | Performance Schema                                             | NO           | NO   | NO         |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
```

## Nginx配置

配置文件`/nginx/conf/nginx.conf`中的连接线程

```
worker_connections 256;
```

## php-fpm配置

配置文件`php/etc/php-fpm.conf`

```
pm = dynamic
如何控制子进程，选项有static和dynamic。
如果选择static，则由pm.max_children指定固定的子进程数。
如果选择dynamic，则由下开参数决定：
pm.max_children ，子进程最大数
pm.start_servers ，启动时的进程数
pm.min_spare_servers ，保证空闲进程数最小值，如果空闲进程小于此值，则创建新的子进程
pm.max_spare_servers ，保证空闲进程数最大值，如果空闲进程大于此值，此进行清理
对于专用服务器，pm可以设置为static。
```

## 手动释放缓存

本节转载自[如何手工释放linux内存](http://www.cnblogs.com/hoys/archive/2012/09/08/2676922.html)</a>

/proc是一个虚拟文件系统，我们可以通过对它的读写操作做为与kernel实体间进行通信的一种手段。也就是说可以通过修改/proc中的文件，来对当前kernel的行为做出调整。那么我们可以通过调整/proc/sys/vm/drop_caches来释放内存。操作如下：

```
[root@server test]# cat /proc/sys/vm/drop_caches

0
```

首先，/proc/sys/vm/drop_caches的值，默认为0。

```
[root@server test]# sync
```

手动执行sync命令（描述：sync 命令运行 sync 子例程。如果必须停止系统，则运行sync 命令以确保文件系统的完整性。sync 命令将所有未写的系统缓冲区写到磁盘中，包含已修改的 i-node、已延迟的块 I/O 和读写映射文件）

```
[root@server test]# echo 3 > /proc/sys/vm/drop_caches
[root@server test]# cat /proc/sys/vm/drop_caches

3
```

将/proc/sys/vm/drop_caches值设为3

```
[root@server test]# free -m
total used free shared buffers cached
Mem: 249 66 182 0 0 11
-/+ buffers/cache: 55 194
Swap: 511 0 511
```

再来运行free命令，会发现现在的used为66MB，free为182MB，buffers为0MB，cached为11MB。那么有效的释放了buffer和cache。

◎ 有关/proc/sys/vm/drop_caches的用法在下面进行了说明

> /proc/sys/vm/drop_caches (since Linux 2.6.16)
> Writing to this file causes the kernel to drop clean caches,dentries and inodes from memory, causing that memory to become free.
> To free pagecache, use echo 1 > /proc/sys/vm/drop_caches;
> to free dentries and inodes, use echo 2 > /proc/sys/vm/drop_caches;
> to free pagecache, dentries and inodes, use echo 3 > /proc/sys/vm/drop_caches.
> Because this is a non-destructive operation and dirty objects are not freeable, the user should run sync first.
