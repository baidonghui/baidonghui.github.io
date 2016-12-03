---
layout: post
title:  "树莓派瞎玩~5~控制GPIO之Python"
categories: 树莓派
tags:  树莓派
---

* content
{:toc}

在Raspbian中已经预装了Python2.7.9，直接在命令行输入`python`即可看到如下信息

```
pi@raspberrypi:~ $ python
Python 2.7.9 (default, Mar  8 2015, 00:52:26)
[GCC 4.9.2] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

<!--more-->


使用Python控制GPIO时，常用的是[raspberry-gpio-python](https://sourceforge.net/p/raspberry-gpio-python/)模块，在`2016-03-18-raspbian-jessie`版本的系统镜像中，预装了最新的版本v0.6.2，我们可以在Python中输入下列命令查看：

```
>>> import RPi.GPIO as GPIO
>>> GPIO.VERSION
'0.6.2'
>>>
```

要退出python返回到命令行，可以输入`exit()`或按下`CTRL+Z`。

```
>>> exit()
pi@raspberrypi:~ $
```

# 控制GPIO输出

现在，只需找个地方创建python脚本，然后使用`raspberry-gpio-python`模块来控制GPIO引脚的输出。

```
pi@raspberrypi:~ $ cd ~
pi@raspberrypi:~ $ mkdir python_gpio
pi@raspberrypi:~ $ cd python_gpio/
pi@raspberrypi:~/python_gpio $ touch gpio24_blink.py
pi@raspberrypi:~/python_gpio $ nano gpio24_blink.py
```

编辑脚本内容

```Python
import RPi.GPIO as GPIO
import time

GPIO_PIN = 24

GPIO.setmode(GPIO.BCM)
GPIO.setup(GPIO_PIN, GPIO.OUT)
while True:
        GPIO.output(GPIO_PIN,GPIO.HIGH)
        time.sleep(1)
        GPIO.output(GPIO_PIN,GPIO.LOW)
        time.sleep(1)
```

存盘后，使用`python + 脚本文件名`的方式执行这个脚本。
 
```
pi@raspberrypi:~/python_gpio $ python gpio24_blink.py
```

用万用表测量GPIO24引脚的电压，发现电压每隔一秒在3.3V和0V之间跳动。由于代码的循环条件是`True`，所以脚本将无限循环下去，按下`Ctrl+C`组合键终止脚本的运行。

# 读取GPIO引脚的状态（轮询）

轮询就是持续的检查一件事儿，在这里就是持续的检查引脚状态，我们可以发现在代码中是用`while`循环和`if`组合实现的，这种轮询的方式将占用大量的处理能力。循环中的`sleep`是为了释放CPU，给其他程序让出资源。

```Python
import RPi.GPIO as GPIO
import time

GPIO_PIN = 24
count = 5

GPIO.setmode(GPIO.BCM)
GPIO.setup(GPIO_PIN, GPIO.IN)

print("waiting 5 times...")

while count > 0:
    if(GPIO.input(GPIO_PIN) == 1):
        count = count - 1
        print("input high")
    time.sleep(0.1)

print("exit...")
GPIO.cleanup()
```

通过测试，如果将引脚悬空，引脚上没有任何接线，此时引脚为低电平；若将杜邦线的一头插入到引脚上，另一头悬空，即没有连接3.3V电源也没有接地时，引脚处于不稳定状态，表现为状态在0和1之间跳动。我们可以使用硬件内部的上拉电阻或下拉电阻，为输入引脚配置初始值，可以达到去除干扰抖动的效果。修改上述代码中的配置语句为`GPIO.setup(GPIO_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)`，然后执行脚本，每当将24引脚连接高电平时，就会输出`input high`，由于这里是轮询模式，在连接时间较长时，会输出多行。

```
pi@raspberrypi:~/python_gpio $ sudo python gpio24_in.py
waiting 5 times...
input high
input high
input high
input high
input high
exit...
```

# 读取GPIO引脚的状态（中断）

```Python
import RPi.GPIO as GPIO

GPIO_PIN = 24
count = 5

GPIO.setmode(GPIO.BCM)
GPIO.setup(GPIO_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

print("waiting 5 times...")

while count > 0:
        GPIO.wait_for_edge(GPIO_PIN, GPIO.RISING)
        count = count - 1
        print("input high")


print("exit...")
GPIO.cleanup()
```

其中的`wait_for_edge`函数将使代码处于阻塞状态，直到发生对应的信号状态变换，代码才继续执行。