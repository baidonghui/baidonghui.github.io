---
layout: post
title:  "QQ互联已经接入"
categories: 站点维护日志
tags: 站点维护日志
---

今日QQ互联已接入，可以使用QQ账户登陆本站，已经注册的用户可以从个人中心绑定QQ账号。

<!--more-->

## Open Social 记录接入历程 - 1

登入WordPress后台，插件/安装插件，搜索"Open Social"，安装。

登陆 QQ互联 ，选择"网站接入"，在新打开的页面（管理中心）中点击创建应用， 选择"网站"，填写基本信息。

在基本信息中主要有两点需要注意：


- 在网站地址后有个meta验证，首先想到的是在主题的header.php中增加meta标签，但尝试多次，浏览器F12中已经看到meta代码，但仍然无法通过验证（验证失败 103001），无奈选择了在一级子目录下进行验证。首先建立一个文件夹（如"qqconnect"），在文件夹下建立空的index.html，将meta标签加入header；在网站地址中填写"http://www.xiaobaidonghui.cn/qqconnect"
- 回调地址填写主页注意最后的斜杠，如"http://www.xiaobaidonghui.cn/"


填写完毕点击"创建应用"，就会获得APP ID和APP KEY，回到WordPress，设置插件，勾选账号配置中的腾讯QQ，填写刚刚获得ID和KEY，随便找到QQ登陆按钮（取决于设置中的在何处显示Open Social），点击即可跳转到QQ登陆，此时已经成功一半了。

但此时还不能进行登陆，提示"xiaobaidonghui.cn的QQ登录在测试中"，需要我们回到QQ互联的管理中心，对刚刚创建的网站进行编辑，在"补充信息"中的"协作者测试号"中添加我们测试用的号码。

测试成功后，在QQ互联上提交审核，等待审核结果。

## Open Social 记录接入历程 - 2

第一次审核没有过，拒绝原因是"未放置QQ登陆按钮或位置放置不规范"，于是进一步查看了 网站前端页面规范 ，然后修改前端

### 使用腾讯提供的标准"QQ登录"标识

由于现有登陆图标都是32×32的，于是选择了QQ登陆长图标中170×32款，下载到open-social\images文件夹中。

更改qq登陆图标的样式：

打开同目录下的os.css样式表，

```css
.login_icon_qq{
background:url(qqconnect_logo_4.png) no-repeat transparent;
width: 170px;
height: 32px;
line-height: 32px;
margin: 3px 5px 3px 1px;
cursor:pointer;
display:inline-block;
display:-moz-inline-stack;
zoom:1;
*display:inline;
}
```

open-social.php

```php
function open_login_button_show($icon_type,$icon_title,$icon_link){
if($icon_type == 'qq')
{
return "<div class="\'login_icon_$icon_type\'" title="\'$icon_title\'"></div>";
}
return "<div class="\'login_button" title="\'$icon_title\'"></div>";
}
```

### 标识放置位置规范

"QQ登录"按钮放置的位置必须易于用户查找，建议放置在首页、登录页以及注册页。


- 首页显示：open-social已经提供了widget，在WordPress的外观-自定义中可以直接显示。
- 登录页显示，在插件的设置中可以勾选。
- 注册页显示，open-social.php中 //login and share 区域修改

```php
if( osop('show_login_page',1) )
{
add_action('login_form', 'open_social_login_form_in_reg_and_login');
add_action('register_form', 'open_social_login_form_in_reg_and_login');
}
```

当勾选登陆页显示时，注册页也会显示，并修改显示样式

```php
function open_social_login_form_in_reg_and_login() {
if(is_user_logged_in()) return;
echo open_social_login_html();
}
function open_social_login_html_in_reg_and_login($atts=array()) {
$html = '
<div class="open_social_box login_box" style="position: fixed; top: 0; right: 0;">';
$show = (isset($atts) && !empty($atts) && isset($atts['show'])) ? $atts['show'] : '';
foreach ($GLOBALS['open_arr'] as $v){
if($show && stripos($show,$v)===false) continue;
if(osop(strtoupper($v))) $html .= open_login_button_show($v,str_replace('%OPEN_TYPE%',$GLOBALS['open_str'][$v],$GLOBALS['open_str']['login']),home_url('/'));
}
$html .= '</div>
';
return $html;
}
```

### widget优化

```php
function open_social_profile_html(){
if(!is_user_logged_in()) return;
$current_user = wp_get_current_user();
$email = $current_user-&amp;gt;user_email;
$html = '
<div align="center"><a href="&amp;quot;'.(current_user_can('manage_options')?admin_url():(get_edit_user_link($current_user-">ID)).'?from='.esc_url($_SERVER["REQUEST_URI"])).'"&amp;gt;'.get_avatar($current_user-&amp;gt;ID).'</a></div>
';
$html .= '
<div><a href="&amp;quot;'.get_edit_user_link($current_user-">ID).'?from='.esc_url($_SERVER["REQUEST_URI"]).'" title="'.__('Edit My Profile').'"&amp;gt;'.$current_user-&amp;gt;display_name.'</a>';
$html .= ' (<a href="'.wp_logout_url($_SERVER['REQUEST_URI']).'">'.__('Log Out').'</a>)</div>
';
return $html;
}
```
