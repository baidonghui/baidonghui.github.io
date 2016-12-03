---
layout: post
title:  "树莓派瞎玩~2~远程登录"
categories: 树莓派
tags:  树莓派
---

* content
{:toc}

为了实现远程登录，需要知道树莓派的IP地址。通常连接网线后会自动获取向路由申请一个IP，也就是DHCP提供的动态IP。当然为了之后方便也可以手动配置成静态IP，免得IP发生变化。

<!--more-->


# 树莓派上的配置

此时可以通过终端输入`sudo ifconfig`命令，查看当前网络的配置信息。将打印出如下类似的信息
 
```
eth0      Link encap:Ethernet   HWaddr b8:27:eb:40:b0:9d
          inet  addr:192.168.1.103  Bcast:192.168.1.255  Mask:255.255.255.0
          inet6 addr:  fe80::aa88:81a4:10ac:c0e7/64 Scope:Link
```

eth0 是 Ethernet0 的缩写，表示这段网络信息对应于网口0。如果插入了无线网卡，还可以发现如下信息

```
wlan0     Link encap:Ethernet  HWaddr 14:cf:92:ad:55:ed
          inet addr:192.168.1.101  Bcast:192.168.1.255  Mask:255.255.255.0
          inet6 addr: fe80::4b80:ce76:3044:8715/64 Scope:Link
```

但在我们实验室中，IP不能自动获取的，所以要手动设置IP和DNS。在终端中输入`sudo nano /etc/dhcpcd.conf`，这个文件是DHCP服务的配置文件，进入GNU nano编辑界面，在文件的末尾加入
 
```
interface eth0
static ip_address=192.168.81.213
static routers=192.168.81.1
static domain_name_servers=202.206.240.13
```

同样的，如果修改其他的网络配置，加入的内容是类似的，不同的是interface后的接口名称，这个接口名称可以在`ifconfig`中得到。如无线网卡的IP和DNS信息，则第一行为`interface wlan0`。

按照下方提示，按下Ctrl+X退出编辑，选择Y保存更改。

此时输入`sudo reboot`重启，或者重新网络服务，或者插拔网线，静态IP配置就生效了。

# 测试网络

可以再次使用`ifconfig`来查看网络的信息，此时发现IP已经被修改了。也可以使用ping命令确认网络的连通性，由于学校中上外网是需要实名认证的，此处[ping](http://baike.baidu.com/subview/709/5407702.htm)一下学校的DNS，显示如下信息：
 
```
pi@raspberrypi:~ $ ping 202.206.240.13
PING 202.206.240.13 (202.206.240.13) 56(84) bytes of data.
64 bytes from 202.206.240.13: icmp_seq=1 ttl=62 time=0.703 ms
64 bytes from 202.206.240.13: icmp_seq=2 ttl=62 time=0.975 ms
^C
--- 202.206.240.13 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 0.703/0.839/0.975/0.136 ms
```


# 回到远端电脑

回到电脑，打开Putty，选用SSH和对应的IP、端口连接。

根据提示输入用户名和密码

树莓派默认的登陆用户名为 **pi**
默认密码是 **raspberry**
 
```
login as: pi
pi@192.168.81.213's password:

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Fri Mar 18 09:41:21 2016
pi@raspberrypi:~ $
```

远程连接成功。