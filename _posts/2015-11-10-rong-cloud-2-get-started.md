---
layout: post
title:  "融云 SDK 2.0 集成记录"
categories: Android
tags:  rongcloud
---

* content
{:toc}

# 0 集成sdk

## 0.1 导入rongcloud sdk


- 创建项目
- 选中左侧Android Project里的项目，按F12打开Project Structure。
- 点击加号（New Moudle），Import Existing Project，选择demo中的IMKit文件夹，Finish。
- 将IMKit添加到项目的Dependencies【或build.gradle中的依赖项中添加  compile project(':IMKit')  】。

## 0.2 配置AndroidManifest.xml

融云的 SDK 使用了 Service 进程来进行通信，其中：

- 应用进程:ipc，这是融云的通信进程；
- io.rong.push，这是融云的推送进程。

```xml
<service
    android:name="io.rong.push.PushService"
    android:process="io.rong.push" > <!-- Waring: The name of the push process can't be changed!!! -->
    <intent-filter>
        <category android:name="android.intent.category.DEFAULT" />

        <action android:name="io.rong.push" />
    </intent-filter>
</service>

<service
    android:name="io.rong.push.CommandService"
    android:process="io.rong.push" > <!-- Waring: The name of the push process can't be changed!!! -->
    <intent-filter>
        <category android:name="android.intent.category.DEFAULT" />

        <action android:name="io.rong.command" />
    </intent-filter>
</service>

<receiver
    android:name="io.rong.push.PushReceiver"
    android:process="io.rong.push" > <!-- Waring: The name of the push process can't be changed!!! -->
    <intent-filter>
        <action android:name="io.rong.imlib.action.push.heartbeat" />
            </intent-filter>
            <intent-filter>
        <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.USER_PRESENT" />
        <action android:name="android.intent.action.ACTION_POWER_CONNECTED" />
        <action android:name="android.intent.action.ACTION_POWER_DISCONNECTED" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.PACKAGE_REMOVED" />

        <data android:scheme="package" />
    </intent-filter>
</receiver>

<service
    android:name="io.rong.imlib.ipc.RongService"
    android:process=":ipc" >
</service>
<service android:name="io.rong.imlib.ReConnectService" />

<receiver android:name="io.rong.imlib.ConnectChangeReceiver" />
<receiver android:name="io.rong.imlib.ipc.PushMessageReceiver" >
    <intent-filter>
        <action android:name="io.rong.push.message" />
    </intent-filter>
</receiver>
<receiver
    android:name="io.rong.imlib.HeartbeatReceiver"
    android:process=":ipc" />


 <!-- 融云后台申请的 App Key -->
<meta-data
    android:name="RONG_CLOUD_APP_KEY"
    android:value="xxxxxxxxxxxxx" />
```

## 0.3 TEST

AndroidManifest中io.rong.xxxx被正确识别

# 1 连接至融云

## 1.1 初始化

创建一个集成Application的类，在OnCreate中加入

```java
/**
* OnCreate 会被多个进程重入，这段保护代码，确保只有您需要使用 RongIM 的进程和 Push 进程执行了 init。
* io.rong.push 为融云 push 进程名称，不可修改。
*/
if (getApplicationInfo().packageName.equals(getCurProcessName(getApplicationContext())) || "io.rong.push".equals(getCurProcessName(getApplicationContext()))) {
   RongIM.init(this);
}
```

其中getCurProcessName()为获得当前进程的名称

```java
/**
 * 获得当前进程的名字
 *
 * @param context
 * @return 进程号
 */
 public static String getCurProcessName(Context context) {      
     int pid = android.os.Process.myPid();
     
     ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);

     for (ActivityManager.RunningAppProcessInfo appProcess : activityManager.getRunningAppProcesses()) {
         if (appProcess.pid == pid) {
             return appProcess.processName;
         }
     }
     return null;
 }
 ```

## 1.2 连接融云

```java
String Token = "d6bCQsXiupB/4OyGkh+TOrI6ZiT8q7s0UEaMPWY0lMxmHdi1v/AAJxOma4aYXyaivfPIJjNHdE+FMH9kV/Jrxg==";//用户令牌，由服务器从融云获取返回给APP，获直接从融云后台的"API调试"中手动获取。

RongIM.connect(Token,new RongIMClient.ConnectCallback(){
    @Override
    public void onTokenIncorrect(){
        //TODO Token失效的状态处理，需要重新获取 Token
    }

    @Override
    public void onSuccess(String userId){
        //连接成功
        Log.e(TAG, “——onSuccess—-” +userId);
    }

    @Override
    public void onError(RongIMClient.ErrorCode errorCode){
        //出错
        Log.e(TAG, “——onError—-” +errorCode);
    }
});  
 ```

## 1.3 TEST

运行程序，查看Logcat中的日志显示连接成功；
在融云后台API调试中查看测试token对应的User是否在线，返回结果为`{"code":200,"status":"1"}`

注：[常见错误码](http://www.rongcloud.cn/docs/android.html#常见错误码)


# 2 会话显示（加入会话列表和会话界面）

融云IMKit SDK使用了Fragment作为会话列表和会话界面的组件，因此需要在这两个Activity里加载Fragment。

## 2.1 会话列表和会话界面的xml布局文件，只需加入fragment并制定融云的name。

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">

    <fragment
        android:id="@+id/conversationlist"
        android:name="io.rong.imkit.fragment.ConversationListFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
 ```

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <fragment
        android:id="@+id/subconversationlist"
        android:name="io.rong.imkit.fragment.SubConversationListFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</LinearLayout>
 ```

## 2.2 在Activity中配置会话列表

```java
package cn.xiaobaidonghui.rongcloud;

import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import io.rong.imkit.fragment.ConversationListFragment;
import io.rong.imlib.model.Conversation;

/**
 * Created by xiaobaidonghui on 2015/11/10.
 */
public class ConversationListActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_conversation_list);

        enterFragment();
    }

    /**
     * 加载 会话列表 ConversationListFragment
     */
    private void enterFragment() {

        ConversationListFragment fragment = (ConversationListFragment) getSupportFragmentManager().findFragmentById(R.id.conversationlist);

        Uri uri = Uri.parse("rong://" + getApplicationInfo().packageName).buildUpon()
                .appendPath("conversationlist")
                  .appendQueryParameter(Conversation.ConversationType.PRIVATE.getName(), "false") //此处只设定了私聊会话的显示方式为非聚合显示，其他会话类型设置方法相同
                .build();

        fragment.setUri(uri);
    }
}

 ```

注：会话类型

NONE(0, "none"),
PRIVATE(1, "private"),
DISCUSSION(2, "discussion"),
GROUP(3, "group"),
CHATROOM(4, "chatroom"),
CUSTOMER_SERVICE(5, "customer_service"),
SYSTEM(6, "system"),
APP_PUBLIC_SERVICE(7, "app_public_service"),
PUBLIC_SERVICE(8, "public_service");

## 2.3 配置会话界面

```java
package cn.xiaobaidonghui.rongcloud;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import java.util.Locale;

import io.rong.imkit.fragment.ConversationFragment;
import io.rong.imlib.model.Conversation;

/**
 * Created by xiaobaidonghui on 2015/11/10.
 */
public class ConversationActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_conversation);

        enterFragment();
    }

    /**
     * 加载会话页面 ConversationFragment
     */
    private void enterFragment() {
        Intent intent = getIntent();
        String targetId = intent.getData().getQueryParameter("targetId");
        Conversation.ConversationType mConversationType = Conversation.ConversationType.valueOf(intent.getData().getLastPathSegment().toUpperCase(Locale.getDefault()));

        ConversationFragment fragment = (ConversationFragment) getSupportFragmentManager().findFragmentById(R.id.conversation);

        Uri uri = Uri.parse("rong://" + getApplicationInfo().packageName).buildUpon()
                .appendPath("conversation").appendPath(mConversationType.getName().toLowerCase())
                .appendQueryParameter("targetId", targetId).build();

        fragment.setUri(uri);
    }
}
 ```

## 2.4 加入启动会话列表入口

```java
@Override
public boolean onOptionsItemSelected(MenuItem item) {
    int id = item.getItemId();
    if (id == R.id.action_conversation_list) {
        if (RongIM.getInstance() != null)
            RongIM.getInstance().startConversationList(this);
        return true;
    }

    return super.onOptionsItemSelected(item);
}

 ```

## 2.5 配置Android Manifest

为两个activity注册，由于融云的会话列表和会话界面都需要接收intent并实现跳转，因此还需配置intent-filter属性，并将data中的android:host修改为程序的包名

```xml
<!--会话列表-->
<activity
android:name=".ConversationListActivity"
android:screenOrientation="portrait"
android:windowSoftInputMode="stateHidden|adjustResize">

<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />

    <data android:host="cn.xiaobaidonghui.rongcloud"
        android:pathPrefix="/conversationlist"
        android:scheme="rong" />
</intent-filter>
</activity>


<!--会话页面-->
<activity android:name=".ConversationActivity"
android:screenOrientation="portrait"
android:windowSoftInputMode="stateHidden|adjustResize">
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:host="cn.xiaobaidonghui.rongcloud"
        android:pathPrefix="/conversation/"
        android:scheme="rong" />
</intent-filter>
</activity>
 ```

## 2.6 TEST

进入会话列表
用融云后台的API调试向token对应的user发送消息

注 A：聚合会话列表的配置

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <fragment
        android:id="@+id/subconversationlist"
        android:name="io.rong.imkit.fragment.SubConversationListFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</LinearLayout>
 ```

```java
public class SubConversationListActivtiy extends FragmentActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.subconversationlist);
      }
}
 ```

```xml
<!--聚合会话列表-->
 <activity
     android:name="io.rong.fast.activity.SubConversationListActivtiy"
     android:screenOrientation="portrait"
     android:windowSoftInputMode="stateHidden|adjustResize">

     <intent-filter>
         <action android:name="android.intent.action.VIEW" />

         <category android:name="android.intent.category.DEFAULT" />

         <data
             android:host="io.rong.fast"
             android:pathPrefix="/subconversationlist"
             android:scheme="rong" />
     </intent-filter>
 </activity>

 ```

注 B：会话列表的启动可以直接调用下列方法，或使用Uri启动

```java
//启动会话界面  param:  Context context, String targetUserId, String title
RongIM.getInstance().startPrivateChat(this, "26594", "title");

//启动会话列表界面  param:  Context context
RongIM.getInstance().startConversationList(this);

//启动聚合会话列表界面  param:  Context context, ConversationType conversationType
RongIM.getInstance().startSubConversationList(this, Conversation.ConversationType.GROUP);
 ```

```java
/**
 * 启动会话界面。
 * @param context 应用上下文。
 * @param targetUserId 要与之聊天的用户 Id。
 * @param title 聊天的标题，如果传入空值，则默认显示与之聊天的用户名称。
 */
public void startPrivateChat(Context context, String targetUserId, String title) {
   if(context != null && !TextUtils.isEmpty(targetUserId)) {
        if(RongContext.getInstance() == null) {
            throw new ExceptionInInitializerError("RongCloud SDK not init");
        } else {
            Uri uri = Uri.parse("rong://" + context.getApplicationInfo().packageName).buildUpon().appendPath("conversation").appendPath(ConversationType.PRIVATE.getName().toLowerCase()).appendQueryParameter("targetId", targetUserId).appendQueryParameter("title", title).build();
            context.startActivity(new Intent("android.intent.action.VIEW", uri));
        }
    } else {
        throw new IllegalArgumentException();
    }
}

/**
 * 启动会话列表界面。
 * @param context 应用上下文。
 */
public void startConversationList(Context context) {
    if(context == null) {
        throw new IllegalArgumentException();
    } else if(RongContext.getInstance() == null) {
        throw new ExceptionInInitializerError("RongCloud SDK not init");
    } else {
        Uri uri = Uri.parse("rong://" + context.getApplicationInfo().packageName).buildUpon().appendPath("conversationlist").build();
        context.startActivity(new Intent("android.intent.action.VIEW", uri));
    }
}

/**
 * 启动聚合后的某类型的会话列表。
 * @param context 应用上下文。
 * @param conversationType 会话类型。
 */
public void startSubConversationList(Context context, ConversationType conversationType) {
    if(context == null) {
        throw new IllegalArgumentException();
    } else if(RongContext.getInstance() == null) {
        throw new ExceptionInInitializerError("RongCloud SDK not init");
    } else {
        Uri uri = Uri.parse("rong://" + context.getApplicationInfo().packageName).buildUpon().appendPath("subconversationlist").appendQueryParameter("type",conversationType.getName()).build();
        context.startActivity(new Intent("android.intent.action.VIEW", uri));
    }
}
 ```

# 3. 显示昵称和用户头像

> 融云认为，每一个设计良好且功能健全的 App 都应该能够在本地获取、缓存并在合适的时机更新 App 中的用户信息。所以，融云不维护和管理用户基本信息（用户 Id、昵称、头像）的获取、缓存、变更和同步。此外，App 提供用户信息也避免了由于缓存导致的用户信息更新不及时，App 中不同界面上的用户信息不统一（比如：一部分 App 从 App 服务器上获取并显示，一部分由融云服务器获取并显示），能够获得最佳的用户体验。
> 融云通过让开发者在 IMKit 中设置用户信息提供者的方式，来实现在聊天界面和会话列表页中，实现通过 App 的数据源来显示用户昵称和头像。
> 设置用户信息提供者即通过调用 RongIM.setUserInfoProvider 方法设置 UserInfoProvider。用户信息提供者采用 Provider 模式，即您提供给融云的 IMKit 一个 UserInfoProvider，当融云的 IMKit 需要使用用户信息的时候，调用您传入的 UserInfoProvider.getUserInfo 方法，向您获取用户信息。所以您在 UserInfoProvider.getUserInfo 方法中，需要根据传入的 userId 参数，向我们返回对应的用户信息。
> [原文](http://www.rongcloud.cn/docs/android.html#显示用户昵称和头像)

```java
/**
 * 融云SDK事件监听处理，设置用户信息的提供者，在RongIM.init()后可以直接调用
 */
RongIM.setUserInfoProvider(new RongIM.UserInfoProvider() {

    @Override
    // userId - 用户Id
    public UserInfo getUserInfo(String userId) {
    //TODO 获取用户信息
        return null;
    }

}, true);

 ```

注：

```java
/**
 * 设置用户信息的提供者，供 RongIM 调用获取用户名称和头像信息。
 *
 * @param userInfoProvider 用户信息提供者。
 * @param isCacheUserInfo  设置是否由 IMKit 来缓存用户信息。<br>
 *                         如果 App 提供的 UserInfoProvider。
 *                         每次都需要通过网络请求用户数据，而不是将用户数据缓存到本地内存，会影响用户信息的加载速度；<br>
 *                         此时最好将本参数设置为 true，由 IMKit 将用户信息缓存到本地内存中。
 * @see UserInfoProvider
 */
public static void setUserInfoProvider(RongIM.UserInfoProvider userInfoProvider,
                                       boolean isCacheUserInfo)
 ```

```java
/**
 * 用户信息模型。
 *
 * @param id        用户ID。
 * @param name      显示的名字。
 * @see portraitUri 显示的头像。
 */
public UserInfo(String id, String name, Uri portraitUri)
 ```
