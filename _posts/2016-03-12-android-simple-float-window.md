---
layout: post
title:  "记一最简单的悬浮窗"
categories: Android
tags:  
---

* content
{:toc}

 
```java
package cn.xiaobaidonghui.floatwindow;

import android.content.Context;
import android.graphics.PixelFormat;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    /**
     * The interface that apps use to talk to the window manager.
     * Use Context.getSystemService(Context.WINDOW_SERVICE) to get one of these.
     */
    private WindowManager windowManager;


    private WindowManager.LayoutParams layoutParams;

    private View floatView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        windowManager=(WindowManager)getApplication().getSystemService(Context.WINDOW_SERVICE);

        //TYPE_SYSTEM_ALERT	    system window, such as low power alert. These windows are always on top of application windows. In multiuser systems shows only on the owning user's window.
        layoutParams=new WindowManager.LayoutParams(WindowManager.LayoutParams.TYPE_SYSTEM_ALERT);

        //默认值是OPAQUE不支持透明色，因此将其设置为RGBA目的是使其允许Alpha通道
        layoutParams.format = PixelFormat.RGBA_8888;

        //FLAG_NOT_FOCUSABLE	Window flag: this window won't ever get key input focus, so the user can not send key or other button events to it.
        //FLAG_NOT_TOUCH_MODAL	Window flag: even when this window is focusable (its FLAG_NOT_FOCUSABLE is not set), allow any pointer events outside of the window to be sent to the windows behind it.
        layoutParams.flags = WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL | WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE;


        // 设置悬浮窗的位置
        layoutParams.gravity= Gravity.TOP | Gravity.LEFT;
        layoutParams.width = 100;
        layoutParams.height = 100;

        floatView = new View(getApplicationContext());
        floatView.setBackgroundResource(R.mipmap.ic_launcher);
        floatView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
        floatView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getApplicationContext(), "Click", Toast.LENGTH_LONG).show();
            }
        });

        windowManager.addView(floatView, layoutParams);
    }


    @Override
    protected void onDestroy() {
        windowManager.removeView(floatView);
        super.onDestroy();
    }
}
```


# 需要注意

1. LogCat提示错误 "permission denied for this window type" 需要在AndroidManifest.xml中添加权限：
 
<pre class="lang:xhtml decode:true " >&lt;uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/&gt;</pre> 


2. 小米的安全中心默认禁止程序的显示悬浮窗，需要开启权限