---
layout: post
title:  "Bitmap too large to be uploaded into a texture exception"
categories: Android
tags:  Android
---

* content
{:toc}

当加载大图（超过4096*4096）时，LogCat中会提示上述警告。

查了查有几种解决方案

## 关闭OpenGL硬件加速

```
android:hardwareAccelerated="false"
```

这样会影响性能，对内存方面没有进一步考察。

## 减小图片尺寸

一般通过设置 BitmapFactory.Options 先将图片尺寸取得，然后设置采样率 inSampleSize 以及 inPreferredConfig 减小内存占用，在按 Options 获取图片Bitmap。

（挖坑）

这种对于允许图片缩小的场景（如设置头像）可行，图像的裁剪（挖坑），但对于类似QQ空间或微博上的长图原图则无法实现。

## 长图的探索

-[BitmapRegionDecoder](http://developer.android.com/reference/android/graphics/BitmapRegionDecoder.html)
-[Android 高清加载巨图方案 拒绝压缩图片](http://blog.csdn.net/lmj623565791/article/details/49300989)
-[LuckyJayce/LargeImage](https://github.com/LuckyJayce/LargeImage)