---
layout: post
title:  "树莓派瞎玩~4~控制GPIO"
categories: 树莓派
tags:  树莓派
---

* content
{:toc}

树莓派上提供了一组GPIO（General Purpose Input Output，即通用输入/输出）接口，这些接口可以用于做一些电子相关的实验：控制一些硬件设备，如最常见的发光二极管、电机等，或者读取一些信号的状态，如开关、传感器等。这里需要注意的是，树莓派中的GPIO只支持数字输入输出，即1和0对应高电平3.3V和低电平0V，因此必要的时候可能需要数模转换。

<!--more-->


> **Connection of a GPIO to a voltage higher than 3.3V will likely destroy the GPIO block within the SoC.**
> [HARDWARE-GPIO](https://www.raspberrypi.org/documentation/hardware/raspberrypi/gpio/README.md)

# 引脚编号

在树莓派的左上角，有两排凸出的针，这块就是GPIO了。在Model B+上有40个引脚，其中26个是GPIO引脚，其余的是电源线和地线（还有两个ID EEPROM引脚）。在我们使用这些引脚和外界交互时，首先需要知道这个引脚的编号，树莓派上的引脚有两种编号，一种是GPIO编号，如下图所示：

![GPIO layout](https://www.raspberrypi.org/documentation/usage/gpio-plus-and-raspi2/images/gpio-numbers-pi2.png)
（图片来自：raspberrypi.org）

这种编号顺序是跳跃的，并没有一个很好的规则来记住它们，可以将他们记下来查阅。另一种编号是物理编号，如下图

![GPIO layout](https://www.raspberrypi.org/documentation/usage/gpio-plus-and-raspi2/images/physical-pin-numbers.png)
（图片来自：raspberrypi.org）

这种编号方便记忆，但通常情况下，建议使用第一种GPIO编号。

# 命令行控制

在树莓派上，使用Linux提供的重定向特性，可以将GPIO接口虚拟成一组文件，这为用户提供了一种操作系统底层硬件的简易接口。从上图中首先选取一个GPIO引脚，如GPIO24，在控制这个引脚之前，首先需要将操作接口从内核空间暴露给用户：

> 其实原本选择的是14引脚，第一排第3个为地线，第4个为GPIO14，正好用万用表测嘛，还省的数那么多，结果，手一抖看到了瞬间灿烂的花火~ (- -|||)，还是选24吧。

 
```
pi@raspberrypi:~ $ echo 24 &gt; /sys/class/gpio/export
```


执行后系统将在/sys/class/gpio下创建一个gpio24目录，并在这个目录下创建几个文件，如下所示

```
pi@raspberrypi:~ $ cd /sys/class/gpio
pi@raspberrypi:/sys/class/gpio $ ls
export  gpio24  gpiochip0  unexport
pi@raspberrypi:/sys/class/gpio $ cd gpio24
pi@raspberrypi:/sys/class/gpio/gpio24 $ ls
active_low  device  direction  edge  subsystem  uevent  value
```

其中`direction`指示这个引脚用于输入或是输出，value则表示引脚的高低电平。

例如，若将24引脚置为高电平，则连接在24引脚和底线之间的LED将被点亮，（尽量不要直接将LED加在电源上，最好加入一个限流电阻），用万用表测得电压3.3V。


```
pi@raspberrypi:/sys/class/gpio/gpio24 $ echo out > direction
pi@raspberrypi:/sys/class/gpio/gpio24 $ echo 1 > value
```

同理，若让LED熄灭，则向24引脚输出低电平
 
```
pi@raspberrypi:/sys/class/gpio/gpio24 $ echo 0 &gt; value
```

将24的引脚设置为输入，则可用于读取引脚的信号，首先24引脚连接3.3V，查看引脚值（此时为1），然后连接底线，查看引脚值（此时为0）。


```
pi@raspberrypi:/sys/class/gpio/gpio24 $ echo in > direction
pi@raspberrypi:/sys/class/gpio/gpio24 $ cat value
1
pi@raspberrypi:/sys/class/gpio/gpio24 $ cat value
0
```