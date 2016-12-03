---
layout: post
title:  "树莓派瞎玩~7~RPi.GPIOのWIKI文档"
categories: 树莓派
tags:  树莓派
---

* content
{:toc}

<p>本文翻译的是树莓派中RPi.GPIO模块的WIKI，每个章节分别对应下表页面。</p>

<table>
<thead>
<tr>
  <th>Title</th>
  <th>Last Update By</th>
  <th>Last Updated</th>
</tr>
</thead>
<tbody>
<tr>
  <td><a href="https://sourceforge.net/p/raspberry-gpio-python/wiki/Home/">Home</a></td>
  <td>Ben Croston (croston)</td>
  <td>2014-10-11</td>
</tr>
<tr>
  <td><a href="https://sourceforge.net/p/raspberry-gpio-python/wiki/BasicUsage/">BasicUsage</a></td>
  <td>Ben Croston (croston)</td>
  <td>2016-01-01</td>
</tr>
<tr>
  <td><a href="https://sourceforge.net/p/raspberry-gpio-python/wiki/Inputs/">Inputs</a></td>
  <td>Ben Croston (croston)</td>
  <td>2016-02-09</td>
</tr>
<tr>
  <td><a href="https://sourceforge.net/p/raspberry-gpio-python/wiki/Outputs/">Outputs</a></td>
  <td>Ben Croston (croston)</td>
  <td>2014-11-11</td>
</tr>
<tr>
  <td><a href="https://sourceforge.net/p/raspberry-gpio-python/wiki/PWM/">PWM</a></td>
  <td>Ben Croston (croston)</td>
  <td>2013-12-21</td>
</tr>
<tr>
  <td><a href="https://sourceforge.net/p/raspberry-gpio-python/wiki/Checking%20function%20of%20GPIO%20channels/">Checking function of GPIO channels</a></td>
  <td>Ben Croston (croston)</td>
  <td>2015-02-18</td>
</tr>
</tbody>
</table>

<!--more-->

<hr />

<h1>RPi.GPIO Python Module</h1>

<p>在开始使用<code>RPi.GPIO</code>模块时，<a href="https://sourceforge.net/p/raspberry-gpio-python/wiki/Examples/">这里的实例</a>是值得阅读的。</p>

<p>安装说明见<a href="https://sourceforge.net/p/raspberry-gpio-python/wiki/install/">这里</a>。</p>

<p>BCM2835型号片上系统和树莓派的详细技术参数见<a href="https://sourceforge.net/p/raspberry-gpio-python/wiki/TechRef/">这里</a>。</p>

<hr />

<h1>RPi.GPIO module basics</h1>

<h2>Importing the module</h2>

<p>可以用以下语句导入<code>RPi.GPIO</code>模块</p>

<pre><code class="Python">import RPi.GPIO as GPIO
</code></pre>

<p>这样，你可以在脚本中后面的部分使用<code>GPIO</code>来指代<code>RPi.GPIO</code>模块。</p>

<p>同时，你可以检查是否模块是否导入成功：</p>

<pre><code class="Python">try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("Error importing RPi.GPIO!  This is probably because you need superuser privileges.  You can achieve this by using 'sudo' to run your script")
</code></pre>

<h2>Pin numbering</h2>

<p>在RPi.GPIO中，同时支持树莓派上的两种GPIO引脚编号。第一种编号是BOARD编号，这和树莓派电路板上的物理引脚编号相对应。使用这种编号的好处是，你的硬件将是一直可以使用的，不用担心树莓派的版本问题。因此，在电路板升级后，你不需要重写连接器或代码。</p>

<p>第二种编号是BCM规则，是更底层的工作方式，它和Broadcom的片上系统中信道编号相对应。在使用一个引脚时，你需要查找信道号和物理引脚编号之间的对应规则。对于不同的树莓派版本，编写的脚本文件也可能是无法通用的。</p>

<p>你可以使用下列代码（强制的）指定一种编号规则：</p>

<pre><code class="Python">GPIO.setmode(GPIO.BOARD)
  # or
GPIO.setmode(GPIO.BCM)
</code></pre>

<p>下面代码将返回被设置的编号规则</p>

<pre><code class="Python">mode = GPIO.getmode()
</code></pre>

<p>所有可能的返回模式包括<code>GPIO.BOARD</code>，<code>GPIO.BCM</code>，<code>None</code>。</p>

<h2>Warnings</h2>

<p>由于在树莓派上，可能有多个脚本或电路控制着GPIO模块。如果RPi.GRIO检测到一个引脚已经被设置成了非默认值，那么你将看到一个警告信息。你可以通过下列代码禁用警告：</p>

<pre><code class="Python">GPIO.setwarnings(False)
</code></pre>

<h2>Setup up a channel</h2>

<p>在使用一个引脚前，你需要设置这些引脚作为输入还是输出。配置一个引脚为输入的代码如下：</p>

<pre><code class="Python">GPIO.setup(channel, GPIO.IN)
</code></pre>

<p>（此处的<code>channel</code>取决与上文设置的编号规则(BOARD/BCM)）</p>

<p>有关输入引脚的更多信息见<a href="https://sourceforge.net/p/raspberry-gpio-python/wiki/Inputs/">这里</a>.</p>

<p>配置一个引脚为输出的代码如下：</p>

<pre><code class="Python">GPIO.setup(channel, GPIO.OUT)
</code></pre>

<p>（此处的<code>channel</code>取决与上文设置的编号规则(BOARD/BCM)）</p>

<p>你也可以为输出的引脚同时指定初始值。</p>

<pre><code class="Python">GPIO.setup(channel, GPIO.OUT, initial=GPIO.HIGH)
</code></pre>

<h2>Setup more than one channel</h2>

<p>你可以使用一次函数调用初始化多个引脚(要求0.5.8以上版本)。例如：</p>

<pre><code class="Python">chan_list = [11,12]    # add as many channels as you want!
                       # you can tuples instead i.e.:
                       #   chan_list = (11,12)
GPIO.setup(chan_list, GPIO.OUT)
</code></pre>

<h2>Input</h2>

<p>读取一个GPIO引脚值的代码如下：</p>

<pre><code class="Python">GPIO.input(channel)
</code></pre>

<p>（此处的<code>channel</code>取决与上文设置的编号规则(BOARD/BCM)）。低电平返回<code>0</code> / <code>GPIO.LOW</code> / <code>False</code>，高电平返回<code>1</code> / <code>GPIO.HIGH</code> / <code>True</code>。</p>

<h2>Output</h2>

<p>设置一个GPIO引脚的输出状态，代码如下：</p>

<pre><code>GPIO.output(channel, state)
</code></pre>

<p>（此处的<code>channel</code>取决与上文设置的编号规则(BOARD/BCM)）。状态可以设置为<code>0</code> / <code>GPIO.LOW</code> / <code>False</code> / <code>1</code> / <code>GPIO.HIGH</code> / <code>True</code>。</p>

<h2>Output to several channels</h2>

<p>你可以使用一次函数调用设置多个引脚的输出值(要求0.5.8以上版本)。例如：</p>

<pre><code>chan_list = [11,12]                             # also works with tuples
GPIO.output(chan_list, GPIO.LOW)                # sets all to GPIO.LOW
GPIO.output(chan_list, (GPIO.HIGH, GPIO.LOW))   # sets first HIGH and second LOW
</code></pre>

<h2>Cleanup</h2>

<p>在程序的最后，释放掉使用的资源是一个好的习惯。在使用RPi.GPIO模块中，也是这样。将用到的所有的输入都设置回没有上拉下拉电阻的输入，可以避免因为短接引脚而偶然的损坏树莓派。注意，<code>GPIO.cleanup()</code>只会释放掉脚本中使用的GPIO引脚，并会清除设置的引脚编号规则。</p>

<p>你可以使用下列代码释放脚本中使用的引脚：</p>

<pre><code>GPIO.cleanup()
</code></pre>

<p>如果在退出程序时，不想将脚本中使用的所有引脚都释放，而是保留其中的一部分。你可以释放一个或一组引脚。</p>

<pre><code>GPIO.cleanup(channel)
GPIO.cleanup( (channel1, channel2) )
GPIO.cleanup( [channel1, channel2] )
</code></pre>

<h2>RPi Board Information and RPi.GPIO version</h2>

<p>获取关于树莓派的信息：</p>

<pre><code>GPIO.RPI_INFO
</code></pre>

<p>获取树莓派版本的信息：</p>

<pre><code>GPIO.RPI_INFO['P1_REVISION']
GPIO.RPI_REVISION    (deprecated)
</code></pre>

<p>获取RPi.GPIO的版本：</p>

<pre><code>GPIO.VERSION
</code></pre>

<hr />

<h1>Inputs</h1>

<p>你可以通过多种方式获得GPIO引脚的值。最简单原始的方式是每隔一段时间检查输入的信号值，这种方式被称为轮询。如果你的程序读取的时机错误，则很可能会丢失输入信号。轮询是在循环中执行的，这种方式比较占用处理器资源。另一种响应GPIO输入的方式是使用中断（边缘检测），这里的边缘是指信号从高到低的变换（下降沿）或从低到高的变换（上升沿）。</p>

<h2>Pull up / Pull down resistors</h2>

<p>如果输入引脚处于悬空状态，引脚的值将是漂动的。换句话说，读取到的值是未知的，因为它并没有被连接到任何的信号上，直到按下一个按钮或开关。由于干扰的影响，输入的值可能会反复的变化。</p>

<p>我们可以通过硬件或软件两种方式为引脚连接一个上拉电阻或下拉电阻，这样，就会为输入引脚设置一个默认值，从而解决这个抖动问题。你可以使用硬件方式，将10K的电阻连接到输入引脚和3.3V电源之间（称为上拉电阻），或连接在输入引脚和0V的底线之间（成为下拉电阻）。也可以通过RPi.GPIO模块配置Broadcom的片上系统，实现为引脚连接一个上拉或下拉电阻。</p>

<pre><code class="Python">GPIO.setup(channel, GPIO.IN, pull_up_down=GPIO.PUD_UP)
  # or
GPIO.setup(channel, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
</code></pre>

<p>（此处的<code>channel</code>取决与上文设置的编号规则(BOARD/BCM)）</p>

<h2>Testing inputs (polling)</h2>

<p>你可以在某一时刻获取输入信号的值：</p>

<pre><code class="Python">if GPIO.input(channel):
    print('Input was HIGH')
else:
    print('Input was LOW')
</code></pre>

<p>下面代码给出了使用轮询的方式，来等待按钮按下：</p>

<pre><code class="Python">while GPIO.input(channel) == GPIO.LOW:
    time.sleep(0.01)  # wait 10 ms to give CPU chance to do other things
</code></pre>

<p>（此处假设按下按钮将使得输入信号从低电平转换为高电平）</p>

<h2>Interrupts and Edge detection</h2>

<p>边缘是指信号状态的改变，从低到高（上升沿）或从高到低（下降沿）。通常情况下，我们更关心于输入状态的该边而不是输入信号的值。这种状态的该边被称为事件。</p>

<p>当你的程序正在忙于其他事情时，下面提供了几种方式使你的程序可以捕获到按钮的按下事件：</p>

<p>*   wait_for_edge() 函数
*   event_detected() 函数
*   当边沿被检测时，回调一个线程函数</p>

<h3>wait_for_edge() function</h3>

<p><code>wait_for_edge()</code>被用于阻止程序的继续执行，直到检测到一个边沿。也就是说，上文中等待按钮按下的实例可以改写为：</p>

<pre><code class="Python">GPIO.wait_for_edge(channel, GPIO.RISING)
</code></pre>

<p>你可以检测这些边沿，<code>GPIO.RISING</code> / <code>GPIO.FALLING</code> / <code>GPIO.BOTH</code>。利用中断的好处是，它占用的CPU资源是可以忽略不计的，因此CPU有更多的资源可以做其他的事情。</p>

<p>如果你只是想在一个确定时间内等待边沿，则可以设置超时参数：</p>

<pre><code class="Python"># wait for up to 5 seconds for a rising edge (timeout is in milliseconds)
channel = GPIO.wait_for_edge(channel, GPIO_RISING, timeout=5000)
if channel is None:
    print('Timeout occurred')
else:
    print('Edge detected on channel', channel)
</code></pre>

<h3>event_detected() function</h3>

<p><code>event_detected()</code>函数可以在循环中和其他代码一起使用，和轮询方式不同的是，在CPU忙于其他事情时，并不会错过输入状态的改变。在使用Pygame或PyQt时，通常有一个主循环来监听和及时的响应GUI事件，此时该函数是很有用的。</p>

<pre><code class="Python">GPIO.add_event_detect(channel, GPIO.RISING)  # add rising edge detection on a channel
do_something()
if GPIO.event_detected(channel):
    print('Button pressed')
</code></pre>

<p>你可以检测这些边沿，<code>GPIO.RISING</code> / <code>GPIO.FALLING</code> / <code>GPIO.BOTH</code>。</p>

<h3>Threaded callbacks</h3>

<p>RPi.GPIO为回调函数另外开启一个线程。这意味这回调函数可以和你的主程序同时运行，及时的对边沿做出响应。例如：</p>

<pre><code class="Python">def my_callback(channel):
    print('This is a edge event callback function!')
    print('Edge detected on channel %s'%channel)
    print('This is run in a different thread to your main program')

GPIO.add_event_detect(channel, GPIO.RISING, callback=my_callback)  # add rising edge detection on a channel
...the rest of your program...
</code></pre>

<p>如果你想设置多个回调函数，可以这样：</p>

<pre><code class="Python">def my_callback_one(channel):
    print('Callback one')

def my_callback_two(channel):
    print('Callback two')

GPIO.add_event_detect(channel, GPIO.RISING)
GPIO.add_event_callback(channel, my_callback_one)
GPIO.add_event_callback(channel, my_callback_two)
</code></pre>

<p>注意，这种情况下，回调函数将按照他们被定义的顺序的执行，不会同时执行，因为这里只有一个线程用于执行回调函数。（小白注：是按照add的顺序还是定义的顺序？原文：This is because there is only one thread used for callbacks, in which every callback is run, in the order in which they have been defined.）</p>

<h3>Switch debounce</h3>

<p>你可能注意到当你按下一次按钮时，回调函数可能会被调用多次。产生这个结果的原因被成为开关抖动。下面有几种方式可以应对开关抖动：</p>

<p>*   加入 0.1uF 的电容
*   软件去抖
*   上两种方式的组合</p>

<p>在指定回调函数时，你可以加入<code>bouncetime=</code>参数来使用软件去抖，回跳时间的单位是毫秒。例如</p>

<pre><code class="Python"># add rising edge detection on a channel, ignoring further edges for 200ms for switch bounce handling
GPIO.add_event_detect(channel, GPIO.RISING, callback=my_callback, bouncetime=200)
</code></pre>

<p>或</p>

<pre><code class="Python">GPIO.add_event_callback(channel, my_callback, bouncetime=200)
</code></pre>

<h3>Remove event detection</h3>

<p>出于某些原因，当你的程序不在需要检测边沿事件时，可以使用下面的代码停止检测：</p>

<pre><code class="Python">GPIO.remove_event_detect(channel)
</code></pre>

<hr />

<h1>GPIO Outputs</h1>

<p>1&#46; 使用<code>RPi.GPIO</code>设置引脚为输出（正如<a href="https://sourceforge.net/p/raspberry-gpio-python/wiki/BasicUsage/">这里</a>描述的）</p>

<pre><code class="Python">import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT)
</code></pre>

<p>2&#46; 将输出值设置为高电平：</p>

<pre><code class="Python">GPIO.output(12, GPIO.HIGH)
 # or
GPIO.output(12, 1)
 # or
GPIO.output(12, True)
</code></pre>

<p>3&#46; 将输出值设置为低电平：</p>

<pre><code class="Python">GPIO.output(12, GPIO.LOW)
 # or
GPIO.output(12, 0)
 # or
GPIO.output(12, False)
</code></pre>

<p>4&#46; 同时设置多个输出引脚的值：</p>

<pre><code class="Python">chan_list = (11,12)
GPIO.output(chan_list, GPIO.LOW) # all LOW
GPIO.output(chan_list, (GPIO.HIGH,GPIO.LOW))  # first LOW, second HIGH
</code></pre>

<p>5&#46; 在程序的最后释放资源：</p>

<pre><code class="Python">GPIO.cleanup()
</code></pre>

<p>注意，你可以使用<code>Input()</code>函数读取一个输出引脚的状态并将其作为输出值，例如：</p>

<pre><code class="Python">GPIO.output(12, not GPIO.input(12))
</code></pre>

<hr />

<h1>Using PWM in RPi.GPIO</h1>

<p>创建一个PWM实例：</p>

<pre><code class="Python">p = GPIO.PWM(channel, frequency)
</code></pre>

<p>开始脉宽调制：</p>

<pre><code class="Python">p.start(dc)   # where dc is the duty cycle (0.0 &lt;= dc &lt;= 100.0)
</code></pre>

<p>更改调制频率：</p>

<pre><code class="Python">p.ChangeFrequency(freq)   # where freq is the new frequency in Hz
</code></pre>

<p>更改占空比：</p>

<pre><code class="Python">p.ChangeDutyCycle(dc)  # where 0.0 &lt;= dc &lt;= 100.0
</code></pre>

<p>停止输出PWM波：</p>

<pre><code class="Python">p.stop()
</code></pre>

<p>注意，当实例变量<code>p</code>超出作用域时，也会停止输出PWM波。</p>

<p>下面的例子将会使LED灯以两秒的速度闪烁：</p>

<pre><code class="Python">import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT)

p = GPIO.PWM(12, 0.5)
p.start(1)
input('Press return to stop:')   # use raw_input for Python 2
p.stop()
GPIO.cleanup()
</code></pre>

<p>下面的例子使一个LED逐渐的变亮和变暗：</p>

<pre><code class="Python">import time
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT)

p = GPIO.PWM(12, 50)  # channel=12 frequency=50Hz
p.start(0)
try:
    while 1:
        for dc in range(0, 101, 5):
            p.ChangeDutyCycle(dc)
            time.sleep(0.1)
        for dc in range(100, -1, -5):
            p.ChangeDutyCycle(dc)
            time.sleep(0.1)
except KeyboardInterrupt:
    pass
p.stop()
GPIO.cleanup()
</code></pre>

<hr />

<h1>gpio_function(channel)</h1>

<p>返回一个GPIO信道的功能。
例如：</p>

<pre><code class="Python">import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
func = GPIO.gpio_function(pin)
</code></pre>

<p>函数将返回下列值中的一个
<code>GPIO.IN</code> / <code>GPIO.OUT</code> / <code>GPIO.SPI</code> / <code>GPIO.I2C</code> / <code>GPIO.HARD_PWM</code> / <code>GPIO.SERIAL</code> / <code>GPIO.UNKNOWN</code></p>

<hr />
