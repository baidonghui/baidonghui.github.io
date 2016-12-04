---
layout: post
title:  "融云 SDK2.0 与 PhotoView"
categories: Android
tags:  rongcloud
---

* content
{:toc}

之前创建了一个新的项目，并集成了融云SDK，而当将融云集成现有项目时，编译通过，运行调试的时候提示：

```
UNEXPECTED TOP-LEVEL EXCEPTION:
com.android.dex.DexException: Multiple dex files define Luk/co/senab/photoview/Compat;
    at com.android.dx.merge.DexMerger.readSortableTypes(DexMerger.java:596)
    at com.android.dx.merge.DexMerger.getSortedTypes(DexMerger.java:554)
    at com.android.dx.merge.DexMerger.mergeClassDefs(DexMerger.java:535)
    at com.android.dx.merge.DexMerger.mergeDexes(DexMerger.java:171)
    at com.android.dx.merge.DexMerger.merge(DexMerger.java:189)
    at com.android.dx.command.dexer.Main.mergeLibraryDexBuffers(Main.java:454)
    at com.android.dx.command.dexer.Main.runMonoDex(Main.java:303)
    at com.android.dx.command.dexer.Main.run(Main.java:246)
    at com.android.dx.command.dexer.Main.main(Main.java:215)
    at com.android.dx.command.Main.main(Main.java:106)
Error:Execution failed for task ':app:dexDebug'.
&gt; com.android.ide.common.process.ProcessException: org.gradle.process.internal.ExecException: Process 'command 'C:\Program Files\Java\jdk1.7.0_60\bin\java.exe'' finished with non-zero exit value 2
```

![photoview](http://i5.tietuku.com/17c660902b1c0bc8.png)

PhotoView 是继承自 ImageView 的一种图像控件，提供


- 多点触摸和双击缩放
- 拖动，手指离开屏幕后的惯性拖尾滚动
- 和ViewPager等滑动容器完美兼容
- 提供了图片显示矩阵发生变化的回调
- 当点击屏幕时也可以收到回调

项目中通过[PhotoView 开源项目](https://github.com/chrisbanes/PhotoView)实现大图/原图查看，出现这个问题的原因是融云SDK中也使用了PhotoView，（在 Android Studio 中展开Rong_IMKit_v2_3_0.jar，即可发现 uk.co.senab.photoview 包）。因此引入了融云SDK，就不需要在主项目中引入PhotoView了，删除依赖项，错误消失。
