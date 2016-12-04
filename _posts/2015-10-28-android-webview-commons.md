---
layout: post
title:  "WebView常用功能"
categories: Android
tags:  webview
---

* content
{:toc}


# Beginning

主流移动应用分为三类：Web App、Hybrid App、 Native App。

- Web App 常指用html5编写的在浏览器中访问的APP，不需要下载安装，类似于轻应用。
- Native APP原生程序，依托于操作系统，针对IOS、Android等不同的手机操作系统要采用不同的语言和框架进行开发，可拓展性强，性能稳定，需要用户下载安装使用。
- Hybrid App 指半原生半Web的混合类App，有很少的UI，大部分使用WebView访问网页内容。

最近项目中用到一些简单的WebView交互，下面列出一些常见的功能和想法，以便以后查阅。

# WebView 交互

- 打开网页
 
```
WebView webView = (WebView) findViewById(R.id.webView);

// 打开网址
webView.loadUrl("http://www.baidu.com/");

// 打开asset目录下的网页 
webView.loadUrl("file:///android_asset/example.html");
```

- 支持JavaScript
 
```
// WebSettings用来设置WebView的属性和状态
WebSettings settings = webView.getSettings();

// 如果访问的页面中有Javascript，则webview需要设置支持Javascript
settings.setJavaScriptEnabled(true);
```

- 捕获将网页中的链接跳转
 
```
webView.setWebViewClient(new WebViewClient(){
	
	// 这个方法允许宿主APP接管将要加载的URL，并进行处理。

	@Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        // todo 此处可以分析url进行响应，或者转入Native UI

        // 返回true表示APP这个加载动作被APP响应，或者叫拦截，不会放给WebView执行。
		return true;
    }
});
```

- 实现字体大小调整
 
```
// WebSettings用来设置WebView的属性和状态
WebSettings settings = webView.getSettings();

// 支持缩放
settings.setSupportZoom(true);

// 参数 textsize 是 WebSettings.TextSize 中的枚举值，Android提供了5中字体大小
// SMALLEST = 50% ; SMALLER = 75% ; NORMAL = 100% ; LARGER is 150% ; LARGEST is 200%
// settings.setTextSize(textsize)
// 但这个函数在API 14时被deprecated了。

// 推荐使用setTextZoom(int)，指定文字的缩放比例。
settings.setTextZoom(100);
```

- 使返回键实现浏览器的后退功能
 
```

@Override
public boolean onKeyDown(int keyCode, KeyEvent event) {
    // 重写返回键事件
    if(keyCode==KeyEvent.KEYCODE_BACK)
    {
	   // Gets whether this WebView has a back history item. (来自 reference)
        if(webView.canGoBack())
        {
            //返回上一页面
            webView.goBack();
            return true;
        }
    }
    return super.onKeyDown(keyCode, event);
}
```

- 获取网页加载进度
 
```
webView.setWebChromeClient(new WebChromeClient() {
    @Override
    public void onProgressChanged(WebView view, int newProgress) {
        
        // newProgress 标识的加载进度 如
        if (newProgress == 100) {
            // 网页加载完成
        }
    }
});
```

- 显示友好的错误页面
 
```
webView.setWebViewClient(new WebViewClient(){
    // This method was deprecated in API level 23.
    @Override
    public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
        switch(errorCode)
        {
            // todo 不同errorCode加载不同页面
        }
        return true;
    }

    public void onReceivedError (WebView view, WebResourceRequest request, WebResourceError error){
        // WebResourceError 中提供两个public方法，分别是 getErrorCode() 和 getDescription()返回错误值和错误描述。
        // getErrorCode() 返回的是 WebViewClient 类中以 ERROR_ 开头的常量
        // 如常见的 ERROR_FILE_NOT_FOUND ， ERROR_TIMEOUT 等，但需要注意的是此处的常量值并不是404等错误码。
        int code = error.getErrorCode();
        switch(code)
        {
            // todo 不同code加载不同页面
        }
    }
});
```