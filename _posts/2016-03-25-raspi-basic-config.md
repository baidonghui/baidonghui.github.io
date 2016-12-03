---
layout: post
title:  "树莓派瞎玩~3~Pi的基本配置"
categories: 树莓派
tags:  树莓派
---

* content
{:toc}

`raspi-config`是Raspbian系统上的树莓派配置工具，由[Alex Bradbury](https://github.com/asb)编写和维护。

<!--more-->


# 用途

当第一次启动Raspbian时，你将看到`raspi-config`这个配置工具。之后可以使用命令行来打开这个配置工具。

```
sudo raspi-config
```

使用`sudo`命令的原因是，配置工具将更改一些并不属于当前pi用户的文件。（sudo是linux系统管理指令，是允许系统管理员让普通用户执行一些或者全部的root命令的一个工具，[百度百科](http://baike.baidu.com/view/1138183.htm)）

你将看到一个蓝色的屏幕，屏幕中间有灰色的方框，其中有很多种选项，如下图所示

![RASPI-CONFIG](http://a3.qpic.cn/psb?/V13ytL8L02xffK/8k..AVYoJHNEdeE5r9pD2r96zh.Ltkz8iJTqOEq4koo!/b/dKcAAAAAAAAA&bo=qwOpAQAAAAADByI!&rf=viewer_4)

在这个配置工具中，你可以对下列选项进行配置：

```
┌──────────────────────────┤ Raspberry Pi Software Configuration Tool (raspi-config) ├──────────────────────────┐
│                                                                                                               │
│      1 Expand Filesystem            Ensures that all of the SD card storage is available to the OS            │
│      2 Change User Password         Change password for the default user (pi)                                 │
│      3 Boot Options                 Choose whether to boot into a desktop environment or the command line     │
│      4 Wait for Network at Boot     Choose whether to wait for network connection during boot                 │
│      5 Internationalisation Options Set up language and regional settings to match your location              │
│      6 Enable Camera                Enable this Pi to work with the Raspberry Pi Camera                       │
│      7 Add to Rastrack              Add this Pi to the online Raspberry Pi Map (Rastrack)                     │
│      8 Overclock                    Configure overclocking for your Pi                                        │
│      9 Advanced Options             Configure advanced settings                                               │
│      0 About raspi-config           Information about this configuration tool                                 │
│                                                                                                               │
│                                                                                                               │
│                                <Select>                                <Finish>                               │
│                                                                                                               │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## 移动菜单

你可以使用上下方向键在这些可用的选项中移动选定菜单，选定项将已高亮的样式显示。按下右方向键将从选项中跳出，进入到`<Select>`和`<Finish>`按钮区域。按左方向键则会回到选项区域。当然，你也可以使用`Tab`键在这选项和两个按钮中进行切换。

注：当列表中的选项数很多时（如在区域设置的列表中），你可以键入一个字母，使列表跳转到这个字母所在的区域。例如，当输入`L`后，列表将会跳转到Lisbon，这个选项和London仅仅相隔了两个选项，这种操作可以节省你的时间，免去了一直向下滚动选项浪费的时间。

## Raspi-config 做了什么

通常来讲，`raspi-config`可以方便的更改一些常用配置的功能。这些更改可能会对`/boot/config.txt`和一些Linux中标准文件进行更改。这里的一些选项是需要重新启动才能够生效的，如果你更改了这些选项，在点击`<Finish>`时，`raspi-config`将询问你是否立即重启。

# 菜单中的选项

## EXPAND FILESYSTEM (扩展文件系统)

如果你是使用NOOBS安装的Raspbian，那么你可以忽略这个选项，因为在安装过程中，文件系统已经被自动的扩展了。然而，如果你是手动的将镜像写入到SD卡中进行安装，那么SD卡的一个部分可能没有被使用，这个部分的大小并不是确定的，其大小有可能超过3个GB。选择这个选项将使你的安装填充整个的SD卡，那么，你就有更多的空间来存储用户文件。执行这个选项后需要重启才能生效。注意，这个操作没有确认提示，一旦选择了该选项，分区扩展将立即被执行。

## CHANGE USER PASSWORD（更改用户口令）

树莓派上用户`pi`的默认密码是`raspberry`，你可以在此处更改用户`pi`的密码。关于users的更多信息见[这里](https://www.raspberrypi.org/documentation/linux/usage/users.md)

## ENABLE BOOT TO DESKTOP OR SCRATCH（启动到桌面或SCRATCH）

你可以更改当你启动Pi时执行的流程。这个选项可以设置启动偏好为命令行、桌面、或直接进入SCRATCH。

## INTERNATIONALISATION OPTIONS（国际化选项）

选择`Internationalisation Options`菜单并按下`Enter`键会进入子菜单，包含下列选项。

### CHANGE LOCALE

选择一个区域，如`en_GB.UTF-8 UTF-8`。

### CHANGE TIMEZONE

选择你所在的时区。首先选择区域，如`Europe`，然后选择城市，如`London`。按下一个字母列表将跳转到字母所在的区域。

### CHANGE KEYBOARD LAYOUT

这个选项打开另一个菜单，允许你设置键盘的布局。它会读取所有的键盘类型，因此这个菜单需要一些时间才能显示。更改通常是即时生效的，但可能需要重启。

## ENABLE CAMERA（启用摄像头）

如果你需要使用树莓派上的摄像头模块，必须将其设置为可用。选择这个选项，并将其设置为`Enable`。这将确保内存中只要有128M被用于GPU。

## ADD TO RASTRACK（加入到RASTRACK）

Rastrack是一个用户贡献的谷歌地图。它显示了全世界树莓派使用者的分布热力图。这是有一个年轻的树莓派爱好者[Ryan Walmsley](http://ryanteck.uk/)在2012年创立的。Rastrack的官方连接是[这里](http://rastrack.co.uk/).

你可以使用这个选项将你的位置加入到地图上。

## OVERCLOCK（超频）

你可以将树莓派的CPU超频。默认情况下，CPU以700MHz的频率工作，此处可以将其超频为1000MHz。超频的范围是非常广泛的，但是过高的超频可能会导致系统不稳定。选择这个选项时，将显示下述警告：

请注意，超频可能会减少树莓派的使用寿命。如果在一个特定的频率上造成了系统的不稳定，请尝试使用更低的频率进行超频。在启动过程中，按住`shift`可以暂时禁用超频。

## ADVANCED OPTIONS（高级选项）

### OVERSCAN（过扫描）

老式的电视机显示的图像时，图像的尺寸有明显的变化，一些电视机在屏幕上会有重叠的区域。因此电视画面会出现黑色的边框却没有画面丢失，这被成为过扫描。现代的电视或监视器不需要边框，图像信号也不允许出现这个边框。如果出事的问题被显示在了屏幕的外面，你需要启用过扫描，将图像的边框调整回来。

任何的更改都需要重启才能够生效。你可以通过编辑[config.txt](https://www.raspberrypi.org/documentation/configuration/config-txt.md)来获得更大的控制权。

在某些显示设备，尤其是监视器上，禁用过扫描将使图像充满整个屏幕，并纠正分辨率。对于其他的显示器，可能需要开始过扫描并调整其中的值，使其能够正常显示图像。

## HOSTNAME（主机名）

设置树莓派在网络中可见的主机名。

## MEMORY SPLIT（内存划分）

调整GPU能够使用的内存大小。

### SSH

设置是否允许远程设备通过SSH协议使用命令行连接树莓派。

SSH允许你在另一台电脑上使用命令行远程连接树莓派。如果禁用这个选项，在系统开启时，将不会启动SSH服务，释放一些处理资源。更多关于SSH的信息见[这里](https://www.raspberrypi.org/documentation/remote-access/ssh/README.md)。注意，SSH服务是默认开启的。如果你将树莓派直接连接到公共网络上，在你为所有用户设置安全密码前，你应该禁用SSH。

### DEVICE TREE（设备树）

启用或禁用设备树。更多关于设备树的配置见[这里](https://www.raspberrypi.org/documentation/configuration/device-tree.md)。

### SPI

启用或禁用SPI接口和SPI内核模块的自动加载。有些产品需要这个如PiFace。

### I2C

启用或禁用I2C接口和I2C内核模块的自动加载。

### SERIAL

在串行连接中开启或关闭外壳和内核消息。

### AUDIO

强制使用HDMI或3.5mm的音频接口进行声音输出。更多信息见[这里](https://www.raspberrypi.org/documentation/configuration/audio-config.md)。

### UPDATE

将本工具更新为最新的版本

## ABOUT RASPI-CONFIG

选择这个选项将西那是下列文本：

本工具为初始化树莓派的配置提供了一个简单的途径。尽管它可以在任意时间运行，当你做了大量的自定义后，其中的一些选项可能会遇到问题。

## FINISH

当你已经完成更改时，请使用这个按钮。你将会被询问是否重启。当第一次进行配置时，建议立即重启。如果你选择了调整SD卡文件系统的大小，重启操作有可能会延后一段时间。

## DEVELOPMENT OF THIS TOOL

本工具的源码见[这里](https://github.com/RPi-Distro/raspi-config)。

