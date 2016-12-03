---
layout: post
title:  "C#中WebBrowser的一些记录"
categories: C-Sharp
tags:  C#
---

* content
{:toc}

最近在做一个东西，要实现C#和网页的交互，将网页嵌入到App中。

1\. 屏蔽右键菜单

```C#
webBrowser1.IsWebBrowserContextMenuEnabled = false;
```

2\. 屏蔽快捷键

```C#
webBrowser1.WebBrowserShortcutsEnabled = false;
```

3\. 屏蔽脚本错误
 
```C#
webBrowser1.ScriptErrorsSuppressed = true;
```

4\. 调用js函数
 
```C#
webBrowser1.Document.InvokeScript(jsfunName, jsfunParam);
```

该函数会返回object对象，可以接收js函数的返回值。

5\. 打印预览

```C#
webBrowser1.ShowPrintPreviewDialog();
```

6\. 焦点在WebBrowser上时，无法响应菜单栏的快捷键

```C#
private void webBrowser1_PreviewKeyDown(object sender, PreviewKeyDownEventArgs e)
{
    if(e.KeyCode == Keys.P &amp;&amp; e.Control)
    {
        PrePrint_Click(sender, e);
    }
    else if(e.KeyCode == Keys.O &amp;&amp; e.Control)
    {
        OpenFile_Click(sender, e);
    }
    else if(e.KeyCode == Keys.S &amp;&amp; e.Control)
    {
        SaveFile_Click(sender, e);
    }
    else if (e.KeyCode == Keys.F6)
    {
        AddItem_Click(sender, e);
    }
    else if (e.KeyCode == Keys.F7)
    {
        EditItem_Click(sender, e);
    }
    else if (e.KeyCode == Keys.F8)
    {
        DelItem_Click(sender, e);
    }
    
}
```