---
layout: post
title:  "Android 6.0 and HttpClient"
categories: Android
tags:  Android
---

* content
{:toc}


<img src="http://i5.tietuku.com/69c32fa21cd7f8f1.jpg" alt="" />

今天将之前的一个项目导入到Android Studio中，发现 DefaultHttpClient 等类都被划红线了，这才查了下发者文档，安卓6已经移除了Apache Client，推荐使用的是 HttpURLConnection ，如果要继续使用阿帕奇的包，需要在 build.gradle 中添加一条语句

```xml
android {
    useLibrary 'org.apache.http.legacy'
}
```

下面来自开发文档：

> Android 6.0 release removes support for the Apache HTTP client. If your app is using this client and targets Android 2.3 (API level 9) or higher, use the HttpURLConnection class instead. This API is more efficient because it reduces network use through transparent compression and response caching, and minimizes power consumption. To continue using the Apache HTTP APIs, you must first declare the following compile-time dependency in your build.gradle file:


```xml
android {
    useLibrary 'org.apache.http.legacy'
}
```
