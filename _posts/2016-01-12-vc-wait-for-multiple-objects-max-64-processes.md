---
layout: post
title:  "vc++ 多线程 WaitForMultipleObjects 最大等待64个线程"
categories: vc++
tags:  WaitForMultipleObjects
---

* content
{:toc}


背景：最近在写属性拓扑的并行算法，跑了几个`UCI`背景后结果正常，当处理蘑菇`mushroom`背景时却发生内存访问异常。`WaitForMultipleObjects` 可以轻松的实现等待内核对象，包括线程。


```c
	/* 并行分解 */
    HANDLE handle[ATT_CNT];

    for (int i = 0; i &lt; ATT_CNT; ++i)
    {
        PUSH_BIT_0(queueMask, CQueue[i]);

        booleanset* parallQueueMask = (booleanset*)malloc(ATT_SET_COUNT * BOOLEAN_SET_SIZE);
        memcpy(parallQueueMask, queueMask, ATT_SET_COUNT * BOOLEAN_SET_SIZE);

        parallParam* param =  (parallParam*)malloc(sizeof(parallParam));
        param -&gt; queueMask = parallQueueMask;
        param-&gt;adjMatrix0 = CAdjMatrix;
        param -&gt; attributes0 = CAttributes;
        param -&gt; queue = CQueue;
        param -&gt; queueIndex = i;
        param -&gt; incRow = CIncMatrix[CQueue[i]];
        param -&gt; object_count = OBJ_CNT;
        param -&gt; attribute_count = ATT_CNT;

        handle[i] = (HANDLE)_beginthreadex(NULL, 0, ThreadFun, param, 0, NULL);
    }
    WaitForMultipleObjects(ATT_CNT, handle, TRUE, INFINITE);
```

报错的指针指向的地址没有变化，但数据改变了。第一直觉是指针操作错误，是不是中间步骤计算时发生了越界等，但经过反复检查指针，并无错误。
偶然发现注释掉main最后的free后，没有抛出内存访问异常，虽然打印的数据是错误的，用getchar等待一段时间后，断点调试的数据是正常的。

对于蘑菇背景来说，按照正常的算法可以通过一次分解将其分解为79个独立的部分，因此可同时开启79个线程计算每个独立的属性拓扑。但忽略了文档上写的最大等待线程数为MAXIMUM_WAIT_OBJECTS (64)个。

> Waits until one or all of the specified objects are in the signaled state or the time-out interval elapses.
> Parameters
>  nCount [in]
>  The number of object handles in the array pointed to by lpHandles. The maximum number of object handles is MAXIMUM_WAIT_OBJECTS. This parameter cannot be zero.
>  lpHandles [in]
>  An array of object handles. For a list of the object types whose handles can be specified, see the following Remarks section. The array can contain handles to objects of different types. It may not contain multiple copies of the same handle.
>  If one of these handles is closed while the wait is still pending, the function's behavior is undefined.
>  The handles must have the SYNCHRONIZE access right. For more information, see Standard Access Rights.
>  bWaitAll [in]
>  If this parameter is TRUE, the function returns when the state of all objects in the lpHandles array is signaled. If FALSE, the function returns when the state of any one of the objects is set to signaled. In the latter case, the return value indicates the object whose state caused the function to return.
>  dwMilliseconds [in]
>  The time-out interval, in milliseconds. If a nonzero value is specified, the function waits until the specified objects are signaled or the interval elapses. If dwMilliseconds is zero, the function does not enter a wait state if the specified objects are not signaled; it always returns immediately. If dwMilliseconds is INFINITE, the function will return only when the specified objects are signaled.
>  https://msdn.microsoft.com/en-us/library/windows/desktop/ms687025(v=vs.85).aspx


还有 `free` 掉之后最好要置 `NULL` 。
