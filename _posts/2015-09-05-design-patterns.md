---
layout: post
title:  "JAVA中的设计模式 结构型模式"
categories: java
tags: 数据结构与算法
---

结构型模式主要考虑如何将类和对象组合在一起，实现新的功能。

## 七种结构型设计模式


- 适配器模式（Adapter Pattern）：适配不同类的接口
- 装饰模式（Decorator Pattern）：动态的为对象增加功能
- 代理模式（Proxy Pattern）：用代理对象表示另一个对象并加以控制
- 外观模式（Facade Pattern）：用定义了高层接口的类使得子系统更加容易使用
- 组合模式（Composite Pattern）：用单个或多个对象组成树结构
- 桥接模式（Bridge Pattern）：将对象的抽象接口和具体实现分离，使它们都可以独立地变化
- 享元模式（Flyweight Pattern）：通过高效的共享减小对象实例化带来的内存增长


## 适配器模式

一个类作为独立的或不兼容的接口之间的桥梁，或将现有的编程接口转换为期望的接口。这个类通常称为适配器（Adapter），适配器所包装的对象称为适配者（Adaptee）。

适配器模式可以分为两种：


- 类适配器模式，只需创建一个新类继承原有类，实现期望的接口。
- 对象适配器模式，只需创建一个适配器，持有原有类的一个实例，实现期望的接口。


适配器实现了期望的接口，并包含了适配者的引用，当用户请求一个适配的方法时调用适配者中的相应接口，这个过程是对用户透明的。因此适配器将不能交互的独立的或不兼容接口连接在一起。

```java
package cn.xiaobaidonghui.structural.adapter;
/**
 * 现在笔记本可以直接读取SD卡，而对于TF卡（Mini SD卡）而言，需要卡托才能插入笔记本读取文件。
 * @author baidonghui
 *
 */

/* SD卡接口 */
public interface ISDCard
{
    public abstract void workWithSD();
}

/* TF卡接口 */
public interface ITFCard
{
    public abstract void workWithTF();
}

public class TFCardReader implements ITFCard
{

    @Override
    public void workWithTF()
    {
        System.out.println("TFCard working");
    }
}

/* 适配器模式可以分为两种：类适配器和对象适配器，这两种方法在本例中可以任选其一 */
/* 构建对象适配器 */
public class TFCardAdapter implements ISDCard
{
    ITFCard tfCard = new TFCardReader();

    @Override
    public void workWithSD()
    {
        /* 处理接口的不兼容性代码 */
        tfCard.workWithTF();
    }
}

/* 构建类适配器 */
public class TFCardAdapter extends TFCardReader implements ISDCard
{

    @Override
    public void workWithSD()
    {
        /* 处理接口的不兼容性代码 */
        workWithTF();
    }
}

/* Demo */
public class Demo
{
    public static void main(String[] args)
    {
        ISDCard sdCardReader = new TFCardAdapter();
        sdCardReader.workWithSD();
    }
}
```

以上Demo的输出结果

```
TFCard working
```


## 装饰模式

装饰设计模式允许用户为一个对象添加新的职责或功能，而不需要更改现存类。装饰模式实现了对原有类的扩展，而且比继承更加灵活，可以作为继承的一种替代方案。通常是创建一个装饰类，使装饰类和被装饰类实现同一个接口，同时装饰类中持有被装饰类的实例，再覆写需要装饰的函数。

```java
package cn.xiaobaidonghui.structural.decorator;

/**
 * 为形状装饰颜色，而不修改形状类本身。
 * @author baidonghui
 *
 */

/* 现有圆形和方形两种形状，实现IShape接口 */
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

/* 抽象装饰类，只实现了对原有类的包裹，实现相同的接口，并持有被装饰类的对象 */
public abstract class AShapeDecorator implements IShape
{
    private IShape shape;

    AShapeDecorator(IShape shape)
    {
        this.shape = shape;
    }

    @Override
    public void draw()
    {
        shape.draw();
    }    
}

/* 创建装饰类，实现对形状功能的扩展 */
public class RedDecorator extends AShapeDecorator
{

    RedDecorator(IShape shape)
    {
        super(shape);
    }

    @Override
    public void draw()
    {
        super.draw();
        System.out.println("Red Fill Decorator");
    }
}

/* Demo 使用装饰类完成对形状的扩展 */
public class Demo
{
    public static void main(String[] args)
    {
        IShape circle = new Circle();        
        IShape redCircle = new RedDecorator(circle);
        redCircle.draw();

        IShape rectangle = new Rectangle();        
        IShape redRectangle = new RedDecorator(rectangle);
        redRectangle.draw();
    }
}
```


以上Demo的输出结果

```
Circle drawing
Red Fill Decorator
Rectangle drawing
Red Fill Decorator
```


## 代理模式

代理模式指由代理主体操作真实主体，真实主体执行具体的业务操作，代理主体负责其他相关的业务处理。他将真实类的功能直接表现出来，同时对操作进行控制。代理模式可以将功能划分的更清晰，便于后期维护。

```java
package cn.xiaobaidonghui.structural.proxy;

/**
 * Real类完成真实的网络操作，而Proxy作为代理完成业务处理，他们都实现了INetwork接口。
 * @author baidonghui
 *
 */

public interface INetwork
{
    public abstract void browse();
}

public class Real implements INetwork
{

    @Override
    public void browse()
    {
        System.out.println("browsing");
    }
}

public class Proxy implements INetwork
{
    private INetwork network; 

    public Proxy()
    {
        network = new Real();
    }

    public void check()
    {
        System.out.println("check user");
    }

    @Override
    public void browse()
    {
        check();
        network.browse();
    }
}

public class Demo
{
    public static void main(String[] args)
    {
        INetwork network = new Proxy();
        network.browse();
    }

}
```


以上Demo的输出结果

```
check user
browsing
```


## 外观模式

外观模式为用户提供了一组高层接口来操作子系统，同时降低了子系统的复杂性。外观模式即一个类代表用户向系统发出一系列请求。

```java
package cn.xiaobaidonghui.structural.facade;

public interface IShape
{
    public abstract void draw();
}

public class Circle implements IShape
{

    @Override
    public void draw()
    {
        System.out.println("Circle drawing");
    }
}

public class Rectangle implements IShape
{

    @Override
    public void draw()
    {
        System.out.println("Rectangle drawing");       
    } 
}

public class ShapeFacade
{
    IShape circle = null;
    IShape rectangle = null;

    public ShapeFacade()
    {
        circle = new Circle();
        rectangle = new Rectangle();
    }

    public void drawCircle()
    {
        circle.draw();
    }

    public void drawRectangle()
    {
        rectangle.draw();
    }
}

public class Demo
{
    public static void main(String[] args)
    {
        ShapeFacade facade = new ShapeFacade();
        facade.drawCircle();
        facade.drawRectangle();
    }
}
```


以上Demo输出结果

```
Circle drawing
Rectangle drawing

```


## 组合模式

组合模式将一组对象构成树形结构，使得一部分和整体的结构一致。使得单个对象和组合对象具有一致性。通常是建立一个包含有一组自身类的对象的类，并提供一些操作这些对象的方法。

```java
package cn.xiaobaidonghui.structural.composite;

import java.util.ArrayList;

public class Employee
{
    private String mName;
    private ArrayList<Employee> mSubordinates = null;

    public Employee(String name)
    {
        mName = name;
        mSubordinates = new ArrayList<Employee>();
    }

    public String getName()
    {
        return mName;
    }

    public ArrayList<Employee> getSubordinates()
    {
        return mSubordinates;
    }

    public void addSubordinate(Employee e)
    {
        mSubordinates.add(e);
    }

    public void print()
    {
        System.out.print(getName());
        System.out.print(":  ");

        for(Employee e:mSubordinates)
        {
            System.out.print(e.getName());
            System.out.print("  ");
        }

        System.out.println();
    }

}

public class Demo
{
    public static void main(String[] args)
    {
        Employee ceo = new Employee("CEO");
        Employee leader = new Employee("Leader");
        Employee leader2 = new Employee("Leader2");
        Employee tmper = new Employee("Tmper");

        ceo.addSubordinate(leader);
        ceo.addSubordinate(leader2);

        leader.addSubordinate(tmper);

        ceo.print();
        leader.print();
        leader2.print();
        tmper.print();

    }
}
```


以上Demo的输出结果

```
CEO:  Leader  Leader2
Leader:  Tmper
Leader2:
Tmper:
```


## 桥接模式

当我们需要将抽象部分与实现部分分离，使它们都可以独立的变化时，可以使用桥接模式。

```java
package cn.xiaobaidonghui.structural.bridge;

public interface IRealize
{
    public abstract void method();
}

public class RealizeA implements IRealize
{

    @Override
    public void method()
    {
        System.out.println("the first realize");
    }
}

public class RealizeB implements IRealize
{

    @Override
    public void method()
    {
        System.out.println("the second realize");
    }
}

public abstract class ABridge
{
    private IRealize mRealize;

    public void setRealize(IRealize realize)
    {
        mRealize = realize;
    }

    public IRealize getRealize()
    {
        return mRealize;
    }

    public abstract void method();
}

public class Bridge extends ABridge
{

    @Override
    public void method()
    {
        getRealize().method();
    }
}

public class Demo
{
    public static void main(String[] args)
    {
        ABridge bridgeA = new Bridge();
        bridgeA.setRealize(new RealizeA());
        bridgeA.method();

        ABridge bridgeB = new Bridge();
        bridgeB.setRealize(new RealizeB());
        bridgeB.method();
    }
}
```


以上Demo的输出结果

```
the first realize
the second realize
```


## 享元模式

当创建大量的对象时，使用享元模式可以减小内存的开销。享元模式通过存储相似的对象达到重用的目的，但当没有相似的对象时就重新创建对象，达到减小对象数目的。

```java
package cn.xiaobaidonghui.structural.flyweight;

public interface IShape
{
    public abstract void draw();
}

public class Circle implements IShape {
    private String color;
    private int x;
    private int y;
    private int radius;

    public Circle(String color){
       this.color = color;       
    }

    public void setX(int x) {
       this.x = x;
    }

    public void setY(int y) {
       this.y = y;
    }

    public void setRadius(int radius) {
       this.radius = radius;
    }

    @Override
    public void draw() {
       System.out.println("Circle: Draw() [Color : " + color + ", x : " + x + ", y :" + y + ", radius :" + radius);
    }
 }

public class ShapeFactory {
   private static final HashMap<String, IShape> circleMap = new HashMap<String, IShape>();

   public static IShape getCircle(String color) {
       IShape circle = circleMap.get(color);

      if(circle == null) {
         circle = new Circle(color);
         circleMap.put(color, circle);
         System.out.println("Creating circle of color : " + color);
      }
      return circle;
   }
}

public class Demo
{
    private static final String colors[] = { "Red", "Green", "Blue"};
    public static void main(String[] args) {

       for(int i=0; i < 5; ++i) {
          Circle circle = (Circle)ShapeFactory.getCircle(getRandomColor());
          circle.setX((int)(Math.random()*100));
          circle.setY((int)(Math.random()*100));
          circle.setRadius(100);
          circle.draw();
       }
    }
    private static String getRandomColor() {
       return colors[(int)(Math.random()*colors.length)];
    }
}
```


以上Demo输出结果

```
Creating circle of color : Green
Circle: Draw() [Color : Green, x : 82, y :23, radius :100
Circle: Draw() [Color : Green, x : 31, y :89, radius :100
Creating circle of color : Red
Circle: Draw() [Color : Red, x : 78, y :39, radius :100
Circle: Draw() [Color : Red, x : 66, y :1, radius :100
Creating circle of color : Blue
Circle: Draw() [Color : Blue, x : 79, y :44, radius :100
```

