---
layout: post
title:  "树莓派瞎玩~6~控制GPIO之C语言"
categories: 树莓派
tags:  树莓派
---

* content
{:toc}

使用C控制GPIO时，常用的是`wiringPi`模块，[点此](https://projects.drogon.net/raspberry-pi/wiringpi/functions/)查看API文档。现在使用C语言完成[上文](http://www.xiaobaidonghui.cn/?p=390)Python语言实现的相同功能。

<!--more-->


# 控制GPIO输出

创建一个`.c`文件，如` gpio24_blink.c`，编辑代码

```C
#include <wiringPi.h>
#include <stdio.h>
#include <stdlib.h>
#define GPIO_PIN      24

int main()
{
    if(wiringPiSetupGpio() == -1) //wiringPiSetupGpio()表示使用GPIO编号，wiringPiSetup()则使用物理编号
    {
        printf("Setup wiringPi failed!");
        return -1;
    }

    pinMode(GPIO_PIN, OUTPUT); // 设置引脚为输出
 
    while(1) 
    {
        digitalWrite(GPIO_PIN, 1); // 设置输出高电平
        delay(1000);
        digitalWrite(GPIO_PIN, 0); // 设置输出低电平
        delay(1000);
    }
	
	return 0;
}
```

保存后回到命令行链接执行。

```
pi@raspberrypi:~/python_gpio $ gcc gpio24_blink.c -o gpio24_blink  -l wiringPi
pi@raspberrypi:~/python_gpio $ sudo ./gpio24_blink
```

# 读取GPIO引脚的状态（轮询）

```C
#include <wiringPi.h>
#include <stdio.h>
#include <stdlib.h>
#define GPIO_PIN      24
 
int count = 5;
 
int main()
{
    if(wiringPiSetupGpio() == -1) //wiringPiSetupGpio()表示使用GPIO编号，wiringPiSetup()则使用物理编号
    {
        printf("Setup wiringPi failed!");
        return -1;
    }

    pinMode(GPIO_PIN, INPUT); // 设置引脚为输出
 
    printf("waiting 5 times...\n");
	fflush(stdout);
	
    while(count > 0) 
    {
	    if(digitalRead(GPIO_PIN) == 1)
		{
		   count--;
		   printf("input high\n");
		   fflush(stdout);
		}
        delay(100);
    }
	
	printf("exit...\n");
	return 0;
}
```

# 读取GPIO引脚的状态（中断）

```C
#include <wiringPi.h>
#include <stdio.h>
#include <stdlib.h>
#define GPIO_PIN      24

static volatile int count = 5;

void doThings(void)
{
    if(count > 0)
    {
        --count;
	    printf("input high\n");
	    fflush(stdout);
    }
}

int main (void)
{
    int myCounter = 0;
  
    if(wiringPiSetupGpio() == -1) //wiringPiSetupGpio()表示使用GPIO编号，wiringPiSetup()则使用物理编号
    {
        printf("Setup wiringPi failed!");
        return -1;
    }
	
    if(wiringPiISR(GPIO_PIN, INT_EDGE_FALLING, &doThings) < 0)
    {
        printf("Regist interrupts failed!");
        return -2;
    }
	
	printf("waiting 5 times...\n");
	fflush(stdout);
    while(1)
    {
        if(count <= 0)
		    break;
        delay(100);
    } 
	
	printf("exit...");
    return 0 ;
}
```