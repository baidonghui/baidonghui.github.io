---
layout: post
title:  "JAVA中的设计模式"
categories: java
tags: 数据结构与算法
---

* content
{:toc}

## 四人组 （Gang of Four）

1994年，四位作家Erich Gamma, Richard Helm, Ralph Johnson 和 John Vlissides 出版了一本名为《Design Patterns - Elements of Reusable Object-Oriented Software》的书籍，首次提出了软件开发中设计模式的概念。因此这四位作家被共同的称为**Gang of Four (GOF)**，他们认为，设计模式主要基于下列面向对象的原则：

> In 1994, four authors Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides published a book titled **Design Patterns - Elements of Reusable Object-Oriented Software** which initiated the concept of Design Pattern in Software development.


- 面向接口编程，而不仅仅是实现（Program to an interface not an implementation）
- 使用对象合成方式，而不是继承（Favor object composition over inheritance）


## 设计模式的作用 （Usage of Design Pattern）


### 提供通用的平台 （Common platform for developers）


每个模型都有一个标准的术语名词 ，可以降低开发者之间的交流成本。

> Design patterns provide a standard terminology and are specific to particular scenario. For example, a singleton design pattern signifies use of single object so all developers familiar with single design pattern will make use of single object and they can tell each other that program is following a singleton pattern.

### 提供最佳的方案 （ Best Practices）

设计模式已经经过了长期的发展，他们为软件开发中特定的问题提供最佳的解决方案。学习设计模式可以帮助没有经验的开发者快速的、容易的学习软件设计。

> Design patterns have been evolved over a long period of time and they provide best solutions to certain problems faced during software development. Learning these patterns helps unexperienced developers to learn software design in an easy and faster way.

## 设计模式的分类 （Types of Design Patterns）

在四人组出版的图书中，提出了23种设计模式，这些模式可以为三类。


| 设计模式 | 描述 |
| :---------:| :-----:|
| 创建型模式（Creational Patterns） | 这类模式不直接使用new关键字进行对象的实例化，可以根据不同的应用场景，灵活的管理对象的构造 |
| 结构型模式（Structural Patterns） | 这类模式关心类和对象的组合，将接口和定义实现对象的聚合以实现新功能 |
| 行为型模式（Behavioral Patterns） | 这类模式主要涉及对象间的信息交互 |


> **Creational Patterns** 
> These design patterns provide a way to create objects while hiding the creation logic, rather than instantiating objects directly using new opreator. This gives program more flexibility in deciding which objects need to be created for a given use case. |
> **Structural Patterns** 
> These design patterns concern class and object composition. Concept of inheritance is used to compose interfaces and define ways to compose objects to obtain new functionalities.
> **Behavioral Patterns** 
> These design patterns are specifically concerned with communication between objects. |
> **J2EE Patterns** 
> These design patterns are specifically concerned with the presentation tier. These patterns are identified by Sun Java Center. |

- 创建型模式：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式
- 结构型模式：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式
- 行为型模式：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式
