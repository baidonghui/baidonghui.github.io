---
layout: post
title:  "Eclipse安装反编译插件 jadclipse"
categories: web
tags:  jadclipse eclipse
---

* content
{:toc}

# 准备工作

1. 下载[JadClipse - Eclipse](https://sourceforge.net/projects/jadclipse/?source=typ_redirect) 插件
2. 下载[Jad执行文件](http://varaneckas.com/jad/)
    
# 安装步骤

1.  关闭`Eclipse`
2.  将`JadClipse`插件`net.sf.jadclipse_3.3.0.jar`复制到`Eclipse`安装目录下的`plugins`目录
3.  打开`Eclipse`的`Preference`窗口
    3.1 左侧列表中找到`Java`-`JadClipse`，配置反编译可执行文件的地址。
        > Path to decompiler: F:\decompiler\jad\jad.exe
    3.2 左侧列表中找到`Editors`-`File Associations`，配置文件关联。
        > *.class without source：加入JadClipse Class File Viewer，并设为默认值。