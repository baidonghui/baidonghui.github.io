---
layout: post
title:  "融云 SDK 2.0 集成记录（二）"
categories: Android
tags:  rongcloud
---

* content
{:toc}


经过之前的集成，已经可以正常连接融云并发送文本/表情/语音消息。融云是可以自定义UI的：

# 会话页面输入框样式：

在会话界面中可以设置输入框的模式，在 rc_fr_messageinput.xml 中配置 app:style 。

输入框分为 S-语音/文本切换功能、C-内容输入功能、E-扩展功能，融云目前提供了九种排列组合模式：


| style | 组合模式 |
| :---------:| :-----:|
| SCE | 语音/文本切换功能+内容输入功能+扩展功能 |
| ECS | 扩展功能+内容输入功能+语音/文本切换功能 |
| CSE | 内容输入功能+语音/文本切换功能+扩展功能 |
| CES | 内容输入功能+扩展功能+语音/文本切换功能 |
| SC | 语音/文本切换功能+内容输入功能 |
| CS | 内容输入功能+语音/文本切换功能 |
| EC | 扩展功能+内容输入功能 |
| CE  |  内容输入功能+扩展功能 |
|  C |  内容输入功能 |


# 输入框扩展功能的自定义：

扩展功能默认为照片、拍照、地理位置和语音通话，对于不需要的可以将其屏蔽。

```java
RongIM.resetInputExtensionProvider(Conversation.ConversationType.PRIVATE, new InputProvider.ExtendProvider[]{
    new ImageInputProvider(RongContext.getInstance()),//图片
    new CameraInputProvider(RongContext.getInstance())//相机.
});
```

此时运行调试可以发现，点开输入框的扩展按钮，里面只有图片和相机两个功能。但是点击时会异常退出，查看Log可知融云支持这种功能的Activity没有被注册。

需要在AndroidManifest中添加

```xml
<!-- 融云 选择图片-->
<activity android:name="io.rong.imkit.tools.SelectPictureActivity"/>

<!-- 融云 预览图片 -->
<activity android:name="io.rong.imkit.tools.PreviewPictureActivity"/>

<!-- 融云 相机拍照 -->
<activity android:name="io.rong.imkit.widget.provider.TakingPicturesActivity"/>
```

如需新增自定义功能，可以参照[SDK文档]("http://www.rongcloud.cn/docs/android.html#4、会话扩展功能自定义")

# 修改融云中的头像形状

融云支持将头像设置为方形获圆形，只需要在相应的xml中设置 AsyncImageView 的属性
 
| xml文件 | 备注 |
| :---------:| :-----:|
| rc_item_conversation.xml| 会话列表  |
| rc_item_message.xml| 会话页面  |
| rc_item_conversation_member.xml| 设置页面  |

```xml
<io.rong.imkit.widget.AsyncImageView
    ...
    app:shape="circle"
    android:scaleType="centerCrop"/>
```

```xml 
<io.rong.imkit.widget.AsyncImageView
    ...
    app:shape="square"/>
```