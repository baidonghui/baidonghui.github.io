---
layout: post
title:  "Android评分跳转市场"
categories: Android
tags:  Android
---

* content
{:toc}

```java
public boolean mark(){
    Uri uri = Uri.parse("market://details?id="+ getApplicationContext().getPackageName());
    Intent intent = new Intent(Intent.ACTION_VIEW,uri);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    try {
        startActivity(intent);
        return true;
    } catch (ActivityNotFoundException e) {
        return false;
    }
}
```
