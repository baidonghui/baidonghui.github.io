---
layout: post
title:  "JAVA中的设计模式 创建型模式"
categories: java
tags: 数据结构与算法
---
创建型模式是设计模式中的一类，这类模式主要用于对象的构造，在构造对象时不需要将具体的构造函数暴露给用户，也就是不直接使用new关键字构造对象。创建型模式共包含五种设计模式，可以针对不同的应用场景灵活的构造出符合要求的对象。

## 五种创建型设计模式


- 工厂模式（Factory Pattern）：用于创建一些派生类的实例化
- 抽象工厂模式（Abstract Factory Pattern）：用于创建属于不同类的实例化对象
- 单例模式（Singleton Pattern）：这个类中只有一个实例化对象存在
- 建造者模式（Builder Pattern）：构造较复杂的对象，且对象的构造和对象的表示分开
- 原型模式（Prototype Pattern）：用于创建一个对象的副本


## 工厂模式

工厂模式是最常用的设计模式之一，在工厂设计模式中，我们不需要将对象的构建逻辑暴露给用户，而是为用户提供一个创建对象的通用接口。也就是说，不需要用户使用new关键字创建所需对象，而是提供一个工厂类，通过向工厂发出请求，由工厂完成对象的实例化，并返回给用户。


```java
package cn.xiaobaidonghui.creational.Factory;
/**
 * 工厂模式可以提供创建对象的通用接口，可以创建实现同一个接口的单一对象。
 * @author baidonghui
 *
 */

/* 首先构造一个通用的接口 */
public interface IShape
{
    public abstract void draw();
}

/* 构建实现这个接口的几个具体类 */
public class Rectangle implements IShape
{

    @Override
    public void draw()
    {
        System.out.println("Rectangle drawing");
    }
}

public class Circle implements IShape
{

    @Override
    public void draw()
    {
        System.out.println("Circle drawing");
    }
}

/* 创建一个工厂，通过向工厂中传递不同的参数获得不同的具体类对象 */
public class ShapeFactory
{
    public IShape getShape(String type)
    {
        if("Circle".equalsIgnoreCase(type))
        {
            return new Circle();
        }
        else if("Rectangle".equalsIgnoreCase(type))
        {
            return new Rectangle();
        }
        else
        {
            return null;
        }
    }
}

/* Demo */
public class Demo
{
    public static void main(String[] args)
    {
        ShapeFactory factory = new ShapeFactory();
        
        IShape circle = factory.getShape("circle");
        circle.draw();
        
        IShape rectangle = factory.getShape("rectangle");
        rectangle.draw();
    }
}
```


为了避免由于字符串传递错误导致的对象创建错误，可以将工厂中的方法改为多个，每个方法返回一个类的实例化对象。


```java
/* 创建一个具有多个方法的工厂，通过调用不同的方法，返回不同类的实例化对象 */
public class ShapeFactory2
{
    public IShape getRectangle()
    {
        return new Rectangle();
    }
    
    public IShape getCircle()
    {
        return new Circle();
    }
}

/* Demo */
public class Demo
{
    public static void main(String[] args)
    {
        ShapeFactory2 factory = new ShapeFactory2();
        
        IShape circle = factory.getCircle();
        circle.draw();
        
        IShape rectangle = factory.getRectangle();
        rectangle.draw();
    }
}
```


如果将工厂中的方法改为静态方法，则在客户端调用时，就不需要对工厂进行实例化。


```java
/* 创建一个具有多个静态方法的工厂，通过调用不同的方法，返回不同类的实例化对象 */
public class ShapeFactory3
{
    public static IShape getRectangle()
    {
        return new Rectangle();
    }
    
    public static IShape getCircle()
    {
        return new Circle();
    }
}

/* Demo */
public class Demo
{
    public static void main(String[] args)
    {
        IShape circle = ShapeFactory3.getCircle();
        circle.draw();
        
        IShape rectangle = ShapeFactory3.getRectangle();
        rectangle.draw();
    }
}
```


测试以上三个Demo的运行结果均为：


```
Circle drawing
Rectangle drawing
```


## 抽象工厂模式

在工厂模式中，通过工厂可以创建实现同一接口的类的对象，有些情况下，这些具体的类不能抽象为同一个接口，这时，我们可以使用抽象工厂模式。

假设这些个具体类抽象为N个接口，那么构建N个工厂，分别实例化实现每个接口的具体类的对象。同时，设计工厂的超类，通过向这个超类传递信息获取不同的工厂，也可以理解为创建了一个工厂的工厂。


```java
package cn.xiaobaidonghui.creational.abstractFactory;
/**
 * 抽象工厂模式可以提供创建对象的通用接口，可以创建实现多个接口的单一对象。
 * @author baidonghui
 *
 */

/* 有两个接口和继承这两个接口的具体类 */
public interface IShape
{
    public abstract void draw();
}

public class Rectangle implements IShape
{

    @Override
    public void draw()
    {
        System.out.println("Rectangle drawing");
    }
}

public class Circle implements IShape
{

    @Override
    public void draw()
    {
        System.out.println("Circle drawing");
    }
}

public interface IColor
{
    public abstract void fill();
}

public class Red implements IColor
{

    @Override
    public void fill()
    {
        System.out.println("Red filling");
    }
}

public class Green implements IColor
{

    @Override
    public void fill()
    {
        System.out.println("Green filling");
    }
}

/* 设计工厂的超类 */
public abstract class AFactory
{
    public abstract IShape getShape(String type);
    public abstract IColor getColor(String type);
}

/* 分别构建两个工厂生成实现这两个接口具体对象 */
public class ShapeFactory extends AFactory
{

    @Override
    public IShape getShape(String type)
    {
        if("Circle".equalsIgnoreCase(type))
        {
            return new Circle();
        }
        else if("Rectangle".equalsIgnoreCase(type))
        {
            return new Rectangle();
        }
        else
        {
            return null;
        }
    }

    @Override
    public IColor getColor(String type)
    {
        // TODO Auto-generated method stub
        return null;
    }
}

public class ColorFactory extends AFactory
{

    @Override
    public IShape getShape(String type)
    {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public IColor getColor(String type)
    {
        if("Red".equalsIgnoreCase(type))
        {
            return new Red();
        }
        else if("Green".equalsIgnoreCase(type))
        {
            return new Green();
        }
        else
        {
            return null;
        }
    }
}

/* 创建工厂的生产者，通过传递不同的信息获得不同的工厂 */
public class FactoryProducer
{
    public AFactory getFactory(String type)
    {
        if("Shape".equalsIgnoreCase(type))
        {
            return new ShapeFactory();
        }
        else if("Color".equalsIgnoreCase(type))
        {
            return new ColorFactory();
        }
        else
        {
            return null;
        }
    }
}

/* Demo */
public class Demo
{
    public static void main(String[] args)
    {
        FactoryProducer producer = new FactoryProducer();
        
        AFactory shapeFactory = producer.getFactory("shape");
        IShape rectangle = shapeFactory.getShape("rectangle");
        rectangle.draw();
        
        AFactory colorFactory = producer.getFactory("color");
        IColor red = colorFactory.getColor("red");
        red.fill();
    }
}
```


以上Demo的输出结果为


```
Rectangle drawing
Red filling
```


## 单例模式

如果一个类只允许有一个实例化对象存在，那么称为单例模式。这种默认的类提供直接获取唯一实例的方法，而不需要手动实例化这个类。


```java
package cn.xiaobaidonghui.creational.singleton;

/**
 * 这是最简单的单例类
 * @author baidonghui
 *
 */
public class Singleton
{
    /* 将私有静态实例对象置空，目的是实现延迟加载 */
    private static Singleton mInstance = null;
    
    /* 将构造函数私有化，外部无法构建这个类的实例化对象 */
    private Singleton()
    {
        
    }
    
    /* 提供对外的获取唯一实例接口 */
    public static Singleton getInstance()
    {
        if(mInstance == null)
        {
            mInstance = new Singleton();
        }
        
        return mInstance;
    }
}
```


如果这个单例类工作在多线程模式，那么将出现问题，最简单的做法就是加入synchronized关键字，当两个并发线程同时访问时，只有一个线程可以执行这个代码块，另一个线程将被阻塞。


```java
    /* 提供对外的获取唯一实例接口 */
    public static synchronized Singleton getInstance()
    {
        if(mInstance == null)
        {
            mInstance = new Singleton();
        }
        
        return mInstance;
    }
```


但此时频繁的上锁解锁会对性能造成影响，其实我们只需要在第一次创建对象时上锁，修改如下：


```java

    /* 提供对外的获取唯一实例接口 */
    public static Singleton getInstance()
    {
        if(mInstance == null)
        {
            init();
        }
        return mInstance;
    }

    public static synchronized void init()
    {
        if(mInstance == null)
        {
            mInstance = new Singleton();
        }
    }
```


如果单例类继承序列化接口时，还会出现其他问题，此处暂不讨论。

## 建造者模式

建造者模式可以由简单的对象构造出很复杂的对象，通常，我们使用Bilder类一步一步地构造复杂对象。工厂模式中关注的是创建单个产品，而建造者模式则是关注创建多个对象的组合体。


```java
package cn.xiaobaidonghui.creational.builder;

/**
 * 建造者模式可以由简单的对象构造出较为复杂的对象，本例中将简单的食物构造出较为复杂的套餐。
 * @author baidonghui
 *
 */
 
/* 创建接口和实现这个接口的具体类 */
public interface IItem
{
    public String getName();
    public float getPrice();
}

public class Rice implements IItem
{

    @Override
    public String getName()
    {
        return "rice";
    }

    @Override
    public float getPrice()
    {
        return 7f;
    }
}

public class Noodles implements IItem
{

    @Override
    public String getName()
    {
        return "noodles";
    }

    @Override
    public float getPrice()
    {
        return 6f;
    }
}

public class Cola implements IItem
{

    @Override
    public String getName()
    {
        return "cola";
    }

    @Override
    public float getPrice()
    {
        return 3f;
    }
}

/* 构建一个类，由这些简单类组合为复杂类（本例中将简单的食物组合成套餐） */
public class Meal
{
    private ArrayList<IItem> mItems = new ArrayList<IItem>();
    
    public void addItem(IItem e)
    {
        mItems.add(e);        
    }
    
    public void showItems()
    {
        System.out.println("Meal Items");
        for(IItem e:mItems)
        {
            System.out.println(e.getName());
        }
    }
    
    public float getCost()
    {
        float cost = 0f;
        for(IItem e:mItems)
        {
            cost += e.getPrice();
        }
        return cost;
    }
}

/* 通过Builder一步一步的构建套餐对象 */
public class MealBuilder
{
    public Meal getRiceSet()
    {
        Meal meal = new Meal();
        meal.addItem(new Rice());
        meal.addItem(new Cola());
        return meal;
    }
    
    public Meal getNoodleSet()
    {
        Meal meal = new Meal();
        meal.addItem(new Noodles());
        meal.addItem(new Cola());
        return meal;
    }
}

/* Demo 通过Builder获取套餐这个较复杂的实例化对象 */
public class Demo
{
    public static void main(String[] args)
    {
        MealBuilder builder = new MealBuilder();
        
        Meal riceSet = builder.getRiceSet();
        riceSet.showItems();
        System.out.println(riceSet.getCost());
        
        Meal noodleSet = builder.getNoodleSet();
        noodleSet.showItems();        
        System.out.println(noodleSet.getCost());
    }
}
```


以上Demo的输出结果：


```java
Meal Items
rice
cola
10.0
Meal Items
noodles
cola
9.0
```


## 原型模式


```java
package cn.xiaobaidonghui.creational.prototype;

/**
 * 原型模式用来为现有的对象创建副本
 * @author baidonghui
 *
 */


public interface IShape
{
    public abstract void draw();
}

/* 原型模式的关键就是创建副本，简单的复制操作可以继承Cloneable接口实现 */
public abstract class AShape implements IShape, Cloneable
{
    @Override
    protected AShape clone()
    {
        AShape obj = null;
        try
        {
            obj = (AShape) super.clone();
        }
        catch (CloneNotSupportedException e)
        {
            e.printStackTrace();
        }
        return obj;
    }
}

public class Rectangle extends AShape
{

    @Override
    public void draw()
    {
        System.out.println("Rectangle drawing");
    }
}

public class Circle extends AShape
{

    @Override
    public void draw()
    {
        System.out.println("Circle drawing");
    }
}

/* 构建缓存类，通过这个类获取实例对象的副本 */
public class ShapeCache
{
    private Hashtable<String, AShape> mCache = new Hashtable<String, AShape>();
    
    public ShapeCache()
    {
        mCache.put("Circle", new Circle());
        mCache.put("Rectangle", new Rectangle());
    }
    
    public AShape getShape(String type)
    {
        return mCache.get(type).clone();
    }
}

/* Demo */
public class Demo
{
    public static void main(String[] args)
    {
        ShapeCache cache = new ShapeCache();
        
        AShape circle = cache.getShape("Circle");
        circle.draw();
        
        AShape rectangle = cache.getShape("Rectangle");
        rectangle.draw();
    }
}
```


以上Demo的输出结果


```java
Circle drawing
Rectangle drawing
```


### 深复制和浅复制

深复制和浅复制的区别是，如果要复制的对象中包含引用对象，即非基本数据类型的对象，那么浅复制中仅仅将这些引用对象指向原来的空间，而深复制中，则把整个对象包括它引用的对象都复制了一遍。

Object中的clone方法为浅复制，这个函数识别出要复制的是哪一个对象，然后为这个对象分配空间，并进行对象的复制，将原始对象的内容一一复制到新对象的存储空间中。

实现深复制的一种方法是将对象串行化


>（主要是为了避免重写比较复杂对象的深复制的clone（）方法，也可以程序实现断点续传等等功能）
> 把对象写到流里的过程是串行化（Serilization）过程，但是在Java程序师圈子里又非常形象地称为“冷冻”或者“腌咸菜（picking）”过程；而把对象从流中读出来的并行化（Deserialization）过程则叫做 “解冻”或者“回鲜(depicking)”过程。
> 应当指出的是，写在流里的是对象的一个拷贝，而原对象仍然存在于JVM里面，因此“腌成咸菜”的只是对象的一个拷贝，Java咸菜还可以回鲜。
> 在Java语言里深复制一个对象，常常可以先使对象实现Serializable接口，然后把对象（实际上只是对象的一个拷贝）写到一个流里（腌成咸菜），再从流里读出来（把咸菜回鲜），便可以重建对象。
> 这样做的前提是对象以及对象内部所有引用到的对象都是可串行化的，否则，就需要仔细考察那些不可串行化的对象或属性可否设成transient，从而将之排除在复制过程之外。
> 本段引用自[Java中对象的深复制（深克隆）和浅复制（浅克隆）介绍](http://www.jb51.net/article/62909.htm)


```java
package cn.xiaobaidonghui.creational.prototype;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public abstract class AShape implements IShape, Serializable
{
    public Object deepClone() throws IOException, ClassNotFoundException
    {
     //将对象写到流里
     ByteArrayOutputStream bo=new ByteArrayOutputStream();
     ObjectOutputStream oo=new ObjectOutputStream(bo);
     oo.writeObject(this);
     //从流里读出来
     ByteArrayInputStream bi=new ByteArrayInputStream(bo.toByteArray());
     ObjectInputStream oi=new ObjectInputStream(bi);
     return(oi.readObject());
    }
}
```



```java
package cn.xiaobaidonghui.creational.prototype;

import java.io.IOException;
import java.util.Hashtable;

public class ShapeCache
{
    private Hashtable<String, AShape> mCache = new Hashtable<String, AShape>();
    
    public ShapeCache()
    {
        mCache.put("Circle", new Circle());
        mCache.put("Rectangle", new Rectangle());
    }
    
    public AShape getShape(String type)
    {
        try
        {
            return (AShape)mCache.get(type).deepClone();
        }
        catch (ClassNotFoundException e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        catch (IOException e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
}
```

