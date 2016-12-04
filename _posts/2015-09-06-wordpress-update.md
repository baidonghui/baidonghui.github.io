---
layout: post
title:  "增加文章类型与版权信息！"
categories: 站点维护日志
tags: wordpress  站点维护日志
---

* content
{:toc}

这篇文章来谈谈如何在WordPress中添加文章分类和版权信息。

# 自定义栏目

WordPress允许发布文章的作者为一篇文章添加自定义栏目，这个附加信息被称为**meta-data**。其中包含的信息可以是任意的，而且Meta-data是以键值对的方式存在，我们可以利用附加信息来实现我们的需求。

> 更多自定义栏目的信息可以移步 [https://codex.wordpress.org/Custom_Fields](https://codex.wordpress.org/Custom_Fields)

# 如何实现

要实现的目标是既要区分文章的类型，又要显示版权信息。


- 对于文章类型而言，只涉及到原创、转载和翻译。
- 对于版权信息而言，如果是原创则好办，对于转载和翻译而言，需要显示原文链接。


因此实现方式至少有两种


- 用两个key-value组成，第一个存储文章类型，第二个存储原文连接。对于原创只需要第一个，对于其他两种，则需要两个同时存在。
- 用两个key-value组成，key分别对应转载和翻译，value对应原文地址；若这两个都不存在，则是原创。


显然第二种要比第一种操作起来方便。

# 实现文章分类的显示

只需分析转载或翻译的key是否存在与meta-data中，然后分别去显示不同的文章类别。这里用到了一个函数获取所有的key：

[get_post_custom_keys()](https://codex.wordpress.org/Function_Reference/get_post_custom_keys" title="Function Reference/get post custom keys)

Get a list of all key names for the current post.

然后用PS做了三种分类的图片。

<img src="/customimg/type_zhuan.png"></img>
<img src="/customimg/type_yi.png"></img>
<img src="/customimg/type_yuan.png"></img>

```php
/**
    作者：xiaobaidonghui.cn
    时间：2015-09-06
    描述：添加文章类型显示
*/
$custom_fields = get_post_custom_keys($post -> ID);
if (in_array ('single-reproduced', $custom_fields)){
    echo '<img src="/customimg/type_zhuan.png"></img>';
}elseif (in_array ('single-translate', $custom_fields)) {
    echo '<img src="/customimg/type_yi.png"></img>';
}else{
    echo '<img src="/customimg/type_yuan.png"></img>';
}
```

# 实现文章版权的显示

上面我们已经区分开文章是哪种类型，下面的问题只存在于，如何获取自定义栏目中的value值。此处用到了另一个函数，下面是官方的解释：

[get_post_meta($post_id, $key, $single = false)](https://codex.wordpress.org/Function_Reference/get_post_meta)

In WP 1.5 and beyond, this function returns the meta information without cache problems. The function requires the post id, the key, and if $single is set to TRUE, it returns only the first result (NOT as an array) for PHP use.

实现
 
```php
/**
    作者：xiaobaidonghui.cn
    时间：2015-09-06
    描述：添加版权声明
*/
$custom_fields = get_post_custom_keys($post -> ID);
if (in_array ('single-reproduced', $custom_fields)){
	$custom_value = get_post_meta($post -> ID, 'single-reproduced', true);
	echo '<div class="copyright"><strong>版权声明：</strong>本文为转载文章，原文地址：<a target="_blank" href="' , $custom_value , '" >' , $custom_value , '</a></div>';
}elseif (in_array ('single-translate', $custom_fields)) {
	$custom_value = get_post_meta($post -> ID, 'single-translate', true);
	echo '<div class="copyright"><strong>版权声明：</strong>本文为【<a href="http://www.xiaobaidonghui.cn" >小白的部落 xiaobaidonghui.cn</a>】翻译文章，原文地址： <a target="_blank" href="' , $custom_value , '" >' , $custom_value , '</a></div>';
}else{
	echo '<div class="copyright"><strong>版权声明：</strong>本文为【<a href="http://www.xiaobaidonghui.cn" >小白的部落 xiaobaidonghui.cn</a>】原创文章，转载时请注明出处！</div>';
}
```

# 如何使用

1. 点击到写文章或修改文章页面，最上端有“显示选项”按钮，拉下之后勾选“自定义栏目”。
2. 在文章的编辑框下方可以找到自定义栏目，转载的key对应于'single-reproduced'，翻译的key对应于'single-translate'，值即为原文地址。原创文章就不用操作了。