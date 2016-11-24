---
layout: post
title:  "树莓派瞎玩~1~系统的安装"
categories: 树莓派
tags:  树莓派
---

* content
{:toc}


去年年底无聊买了树莓派，放在实验室，不是忘了拿SD卡，就是没有时间玩。今天秦皇岛天气晴，终于拿出来晒太阳了。

<!--more-->

手头的是Raspberry PI Model B+，它拥有40个GPIO引脚，4个USB2.0接口。更多介绍可以见[这里](https://www.raspberrypi.org/blog/introducing-raspberry-pi-model-b-plus/)。

# 先来装个系统

树莓派上可以跑很多种系统，官方网站上提供下载的就有10种，见[这里](https://www.raspberrypi.org/downloads/)。Raspbian是专门为Raspberry Pi硬件优化过的免费的操作系统。也算官方推荐的一款操作系统，可以在树莓派官网上下载：[下载地址](https://www.raspberrypi.org/downloads/raspbian/)

下载完毕得到压缩包，压缩包中有一个Img镜像文件。
 
```
D:\FTPSite\常用软件安装包\2016-03-18-raspbian-jessie.zip
MD5:453C3F996B294352B49F09277D7CAAF2
SHA-1:db41f2a8c6236c0ca9150fe4db2017c09e7871fb
文件大小 1397760088字节
```

将SD卡（官方建议的是8GB class 4版的SD卡）挂载到电脑上，Windows下可以使用USB Image Tool或Win32 Disk Image将下载的镜像刻录到SD卡中。

然后将SD弹出，插入到树莓派上，连接HDMI显示器、鼠标、键盘、网口等。树莓派没有开机键，插入电源线后直接启动系统。但在关机时，不建议直接拔掉电源线，而是使用`shutdown -h now`或`halt`命令关机，待系统关闭后在拔掉电源。

# 指示灯的状态

> On the Model B there's 5 LEDs, clearly labelled as ACT (disk activity i.e. SD card access), PWR (power), FDX (is the ethernet connected at full duplex), LNK (is the ethernet connected), 100 (is the ethernet conected at 100mbs).
> On the B+ there's the PWR and ACT LEDs at the top left, and two (out of the three) of the ethernet LEDs have been moved to the Ethernet jack itself.
> https://www.raspberrypi.org/forums/viewtopic.php?f=66&t=83889

PWR 指示电源状态，在左上角。正常情况是红灯常量。
ACT 指示磁盘活动，在左上角。闪烁表示SD卡正常活动。
FDX和LNK在RJ-45网口中，分别指示是否工作在全双工状态，以及网络是否已连接。