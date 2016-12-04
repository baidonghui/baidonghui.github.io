---
layout: post
title:  "JAVA中的设计模式 行为型模式"
categories: java
tags: 数据结构与算法
---
高内聚，低耦合才是真。

## 十一种行为型设计模式 


- 策略模式（Strategy Pattern） 
- 模板方法模式（Template Pattern） 
- 观察者模式（Observer Pattern） 
- 迭代子模式（Iterator Pattern） 
- 责任链模式（Chain of Responsibility Pattern） 
- 命令模式（Command Pattern） 
- 备忘录模式（Memento Pattern） 
- 状态模式（State Pattern） 
- 访问者模式（Visitor Pattern） 
- 中介者模式（Mediator Pattern） 
- 解释器模式（Interpreter Pattern） 

## 策略模式 [ˈstrætədʒi] 

策略模式中，一个类的算法和行为可以在运行时动态的变化。

它通常由三部分组成：抽象策略、具体策略和上下文。上下文中存在抽象策略的引用，负责用户和策略之间的交互。系统虽然提供不同的策略算法实现，但策略模式的决定权在用户，即允许用户修改上下文中策略的引用。

```java
package cn.xiaobaidonghui.behavioral.strategy;

/* 建立抽象策略，本例中用于完成二元计算 */
public interface IStrategy
{
    public abstract int calc(int num1, int num2);
}

/* 建立具体策略，本例中实现二元加法 */
public class CalcAdd implements IStrategy
{
    @Override
    public int calc(int num1, int num2)
    {
        return num1+num2;
    }
}

/* 建立具体策略，本例中完成二元减法 */
public class CalcMinus implements IStrategy
{
    @Override
    public int calc(int num1, int num2)
    {
        return num1 - num2;
    }  
}

/* 上下文 实现用户和策略交互 */
public class Context
{
    /* 包含抽象策略的引用 */
    private IStrategy mStrategy = null;

    /* 具体的策略由用户指定 */
    public Context(IStrategy strategy)
    {
        mStrategy = strategy;
    }

    /* 执行策略 实现用户和策略的交互 */
    public int exeStrategy(int num1, int num2)
    {
        return mStrategy.calc(num1, num2);
    }
}

/* Demo */
public class Demo
{
    public static void main(String[] args)
    {
        Context context = new Context(new CalcAdd());
        System.out.println("3 + 5 = " + context.exeStrategy(3, 5));

        context = new Context(new CalcMinus());
        System.out.println("3 - 5 = " + context.exeStrategy(3, 5));
    }
}
```

以上Demo的输出结果：

```
3 + 5 = 8
3 - 5 = -2
```

## 模板模式 

模板模式中，存在抽象模板类和具体类。抽象类中定义了需要被子类覆写的一个或多个算法步骤，以实现具体的操作；同时还存在一个基本方法，通常是被外界调用的用来引导一个流程，这个方法是不能被子类所覆写的。

```java
package cn.xiaobaidonghui.behavioral.template;

/* 游戏的抽象类 */
public abstract class AGame
{
    public abstract void init();
    public abstract void startPlay();
    public abstract void endPlay();

    /**
     * 定义为final的模板方法，不能被子类所覆写
     */
    public final void play()
    {
        init();
        startPlay();
        endPlay();
    }
}

/*  */
public class Basketball extends AGame
{
    @Override
    public void init()
    {
        System.out.println("Basketball Game init...");
    }

    @Override
    public void startPlay()
    {
        System.out.println("Basketball Game Playing...");
    }

    @Override
    public void endPlay()
    {
        System.out.println("Basketball Game Finished.");
    }
}

public class Football extends AGame
{
    @Override
    public void init() 
    {
        System.out.println("Football Game init...");
    }

    @Override
    public void startPlay()
    {
        System.out.println("Football Game Playing...");
    }

    @Override
    public void endPlay()
    {
        System.out.println("Football Game Finished.");
    }
}

public class Demo
{
    public static void main(String[] args)
    {
        AGame football = new Football();
        football.play();

        AGame basketball = new Basketball();
        basketball.play();
    }
}
```

以上Demo的输出结果：

```
Football Game init...
Football Game Playing...
Football Game Finished.
Basketball Game init...
Basketball Game Playing...
Basketball Game Finished.
```

## 观察者模式 

观察者被用在当一个对象发生变化时，依赖它的对象都会自动的收到通知，而且是一种一对多的关系。

观察者模式通常有三个部分组成：Subject、Observer和Client。Subject是主要的对象，也是触发对象；Observer是依赖与Subject的对象，在Subject中持有依赖自身的Observer的列表，Subject可以修改这个列表，如attach和detach操作；当Subject变化时，会通知Observer变化。

```java
package cn.xiaobaidonghui.behavioral.observer;

public interface IObserver
{
    public abstract void update();
}

public class XMLObserver implements IObserver
{
    private String mEmail;

    public XMLObserver(String email)
    {
        super();
        mEmail = email;
    }

    @Override
    public void update()
    {
        System.out.println(mEmail + " XML Updated.");
    }    
}

public class Subject
{
    private ArrayList<IObserver> mObservers;

    public Subject()
    {
        mObservers = new ArrayList<IObserver>();
    }

    public void attach(IObserver e)
    {
        mObservers.add(e);
    }

    public void detach(IObserver e)
    {
        mObservers.remove(e);
    }

    public void postSubject()
    {
        for(IObserver e : mObservers)
        {
            e.update();
        }
    }
}

public class Demo
{
    public static void main(String[] args)
    {
        Subject subject = new Subject();
        subject.attach(new XMLObserver("test1@xiaobaidonghui.cn"));
        subject.attach(new XMLObserver("test2@xiaobaidonghui.cn"));

        subject.postSubject();
    }
}
```

以上Demo的输出结果

```
test1@xiaobaidonghui.cn XML Updated.
test2@xiaobaidonghui.cn XML Updated.
```

## 迭代子模式 （Iterator /ɪtə'reɪtə/） 

这种模式可以按顺序地访问对象集合中每个对象的元素，而不需要知道数据的底层实现结构。

```java
package cn.xiaobaidonghui.behavioral.iterator;

public interface IIterator
{
    public abstract Object next();
    public abstract boolean hasNext();
}

public interface IContainer
{
    public IIterator getIterator();
}

public class EmailRepository implements IContainer
{
    private String[] mEmails = {"test1@xiaobaidonghui.cn", "test2@xiaobaidonghui.cn", "test3@xiaobaidonghui.cn"};

    @Override
    public IIterator getIterator()
    {
        return new EmailIterator();
    }

    public class EmailIterator implements IIterator{

        private int index = 0;

        @Override
        public Object next()
        {
            if(hasNext())
            {
                return mEmails[index++];
            }
            else
            {
                return null;
            }
        }

        @Override
        public boolean hasNext()
        {
            return index < mEmails.length;
        }

    }
}

public class Demo
{
    public static void main(String[] args)
    {
        EmailRepository repository = new EmailRepository();
        IIterator iterator = repository.getIterator();

        while(iterator.hasNext())
        {
            System.out.println(iterator.next());
        }
    }
}
```

以上Demo的输出结果：

```java
test1@xiaobaidonghui.cn
test2@xiaobaidonghui.cn
test3@xiaobaidonghui.cn
```

## 责任链模式 

责任链模式创建一接收者对象的链式结构，这种模式将请求的发送者和接收者解耦。通常情况下，每个接收者持有另一个接收者的引用，当一个对象不能处理这个请求，则它将这个请求传递给下一个接收者。

```java
package cn.xiaobaidonghui.behavioral.chain_of_responsibility;

public abstract class ALogger
{
    protected int mLevel = -1;

    private ALogger mNext;

    public void setNext(ALogger next)
    {
        mNext = next;
    }

    public ALogger getNext()
    {
        return mNext;
    }

    public void process(int level, String msg)
    {
        if (level <= mLevel)
        {
            System.out.println(getClass().getSimpleName() + ":  " + msg);
        }
        else
        {
            ALogger next = getNext();
            if (next != null)
            {
                next.process(level, msg);
            }
        }
    }
}

public class InfoLogger extends ALogger
{
    public InfoLogger()
    {
        mLevel = 1;
    }
}

public class WarnningLogger extends ALogger
{
    public WarnningLogger()
    {
        mLevel = 2;
    }
}

public class ErrorLogger extends ALogger
{
    public ErrorLogger()
    {
        mLevel = 3;
    }
}

public class Demo
{
    public static void main(String[] args)
    {
        ALogger infoLogger = new InfoLogger();
        ALogger warnLogger = new WarnningLogger();
        ALogger errorLogger = new ErrorLogger();

        infoLogger.setNext(warnLogger);
        warnLogger.setNext(errorLogger);


        ALogger logger = infoLogger;

        logger.process(3, "Fatal Error!");
        logger.process(1, "Information!");
        logger.process(2, "Warnning!");        
    }
}
```

以上Demo的输出结果

```
ErrorLogger:  Fatal Error!
InfoLogger:  Information!
WarnningLogger:  Warnning!
```

> 此处强调一点就是，链接上的请求可以是一条链，可以是一个树，还可以是一个环，模式本身不约束这个，需要我们自己去实现，同时，在一个时刻，命令只允许由一个对象传给另一个对象，而不允许传给多个对象。
> http://m.blog.csdn.net/blog/zhangerqing/8243942

## 命令模式 

命令模式是一种数据驱动的设计模式。它将一个请求包装成Command类的对象，

> Command：定义命令的接口，声明执行的方法。
> ConcreteCommand：命令接口实现对象，是“虚”的实现；通常会持有接收者，并调用接收者的功能来完成命令要执行的操作。
> Receiver：接收者，真正执行命令的对象。任何类都可能成为一个接收者，只要它能够实现命令要求实现的相应功能。
> Invoker：要求命令对象执行请求，通常会持有命令对象，可以持有很多的命令对象。这个是客户端真正触发命令并要求命令执行相应操作的地方，也就是说相当于使用命令对象的入口。
> Client：创建具体的命令对象，并且设置命令对象的接收者。注意这个不是我们常规意义上的客户端，而是在组装命令对象和接收者，或许，把这个Client称为装配者会更好理解，因为真正使用命令的客户端是从Invoker来触发执行。
> [百度百科](http://baike.baidu.com/view/1963264.htm)


```java
package cn.xiaobaidonghui.behavioral.command;

public interface ICommand
{
    public abstract void execute();
}

public class Receiver
{
    public void doAction()
    {
        System.out.println("Received");
    }
}

public class Command implements ICommand
{
    private Receiver mReceiver;

    public Command(Receiver receiver)
    {
        mReceiver = receiver;
    }

    @Override
    public void execute()
    {
        mReceiver.doAction();
    }    
}

public class Invoker
{
    private ICommand mCommand;

    public void setCommand(ICommand command)
    {
        mCommand = command;
    }

    public void doAction()
    {
        mCommand.execute();
    }
}

public class Demo
{
    public static void main(String[] args)
    {
        Receiver receiver = new Receiver();
        ICommand command = new Command(receiver);
        Invoker invoker = new Invoker();
        invoker.setCommand(command);

        invoker.doAction();
    }
}
```

以上Demo的输出结果：

```
Received
```

## 备忘录模式（Memento /mə'mentəʊ/） 

备忘录模式可以将一个对象的状态恢复到上一个状态。通常涉及三个类：原始类、备忘录类和存储类。

原始类中包含各种属性，并具有备份和还原两个方法，它可以决定将哪些属性备份返回一个备忘录类，也可以实现将备忘录中的数据还原。存储类中持有对备忘录数组的引用，可以增加一个备忘录条目，可以获取一个备忘录条目。

```java
package cn.xiaobaidonghui.behavioral.test;

public class Memento
{
    private int mState;

    public Memento(int state)
    {
        mState = state;        
    }

    public int getState()
    {
        return mState;
    }
}

public class Original
{
    private int mState;

    public Original(int state)
    {
        mState = state;
    }

    public int getState()
    {
        return mState;
    }

    public void setState(int state)
    {
        mState = state;
    }

    public Memento store()
    {
        return new Memento(mState);
    }

    public void restore(Memento m)
    {
        mState = m.getState();        
    }

}

public class Storage
{
    private ArrayList<Memento> mMemento;

    public Storage()
    {
        mMemento = new ArrayList<>();
    }

    public void add(Memento e)
    {
        mMemento.add(e);
    }

    public Memento get(int index)
    {
        return mMemento.get(index);
    }
}

public class Demo
{
    public static void main(String[] args)
    {
        Original org = new Original(5);
        System.out.println("State " + org.getState());

        Storage store = new Storage();
        store.add(org.store());

        org.setState(8);
        System.out.println("State " + org.getState());

        org.restore(store.get(0));
        System.out.println("State " + org.getState());
    }
}
```

以上Demo的输出结果

```
State 5
State 8
State 5
```

## 状态模式 

在状态模式中，一个类的行为和其状态有关，不同的状态其行为也不同。

```java
package cn.xiaobaidonghui.behavioral.state;

public interface IState
{
    public abstract void doAction();
}

public class StateOnline implements IState
{
    @Override
    public void doAction()
    {
        System.out.println("Online methods");
    }

}

public class StateOffline implements IState
{
    @Override
    public void doAction()
    {
        System.out.println("Offline methods");
    }
}

public class Context
{
    private IState mState;

    public void setState(IState state)
    {
        mState = state;
    }

    public IState getState()
    {
        return mState;
    }

    public void methods()
    {
        mState.doAction();
    }
}

public class Demo
{
    public static void main(String[] args)
    {
        Context context = new Context();

        context.setState(new StateOffline());
        context.methods();

        context.setState(new StateOnline());
        context.methods();
    }
}
```

以上Demo的输出结果

```
Offline methods
Online methods
```

## 访问者模式 

访问者类决定element类中的哪个算法被执行？（In Visitor pattern, we use a visitor class which changes the executing algorithm of an element class. ）。element必须可以接受访问者对象，以便于访问者能够处理element中的操作。


>  - Visitor 抽象访问者角色，为该对象结构中具体元素角色声明一个访问操作接口。该操作接口的名字和参数标识了发送访问请求给具体访问者的具体元素角色，这样访问者就可以通过该元素角色的特定接口直接访问它。 
> - ConcreteVisitor 具体访问者角色，实现Visitor声明的接口。 
> - Element 定义一个接受访问操作(accept())，它以一个访问者(Visitor)作为参数。 
> - ConcreteElement 具体元素，实现了抽象元素(Element)所定义的接受操作接口。 
> - ObjectStructure 结构对象角色，这是使用访问者模式必备的角色。它具备以下特性：能枚举它的元素；可以提供一个高层接口以允许访问者访问它的元素；如有需要，可以设计成一个复合对象或者一个聚集（如一个列表或无序集合）。 


```java
package cn.xiaobaidonghui.behavioral.visitor;

public interface IVisitor
{
    public abstract void visit(Element1 e);
    public abstract void visit(Element2 e);
}

public class Visitor implements IVisitor
{
    @Override
    public void visit(Element1 e)
    {
        e.doAction();
    }

    @Override
    public void visit(Element2 e)
    {
        e.doAction();        
    }    
}

public abstract class AElement
{
    public abstract void accept(IVisitor visitor);
    public abstract void doAction();
}

public class Element1 extends AElement
{
    @Override
    public void accept(IVisitor visitor)
    {
        visitor.visit(this);
    }

    @Override
    public void doAction()
    {
        System.out.println("This is Element1");
    }
}

public class Element2 extends AElement
{
    @Override
    public void accept(IVisitor visitor)
    {
        visitor.visit(this);
    }

    @Override
    public void doAction()
    {
        System.out.println("This is Element2");
    }
}

public class ObjectStructure
{
    public static ArrayList<AElement> getList(){
        ArrayList<AElement> list = new ArrayList<AElement>();

        list.add(new Element1());
        list.add(new Element2());
        list.add(new Element1());
        list.add(new Element1());
        list.add(new Element1());
        list.add(new Element2());
        list.add(new Element2());
        list.add(new Element1());
        list.add(new Element2());

        return list;
    }
}

public class Demo
{
    public static void main (String[]args){
        ArrayList<AElement> list = ObjectStructure.getList();
        for(AElement e:list){
            e.accept(new Visitor());
        }
    }
}
```

以上Demo的输出结果

```
This is Element1
This is Element2
This is Element1
This is Element1
This is Element1
This is Element2
This is Element2
This is Element1
This is Element2
```

## 中介者模式 

中介者模式用来减小多个对象或类之间通信的复杂度。这种模式提供了一个处理不同类之间通信的中介类，中介类中封装有一系列的对象，使得各对象不需要显式的相互引用，以实现松耦合，使得代码更易维护。

```java
package cn.xiaobaidonghui.behavioral.mediator;

public abstract class AStudent
{
    private AMediator mMediator;

    AStudent(AMediator mediator)
    {
        mMediator = mediator;
    }

    public abstract void work();

    public void workwith()
    {
        mMediator.workwith(this);
    }
}

public class StudentA extends AStudent
{
    StudentA(AMediator mediator)
    {
        super(mediator);
    }

    @Override
    public void work()
    {
        System.out.println("StudentA Comming");
    }

    @Override
    public String toString()
    {
        return "A";
    }
}


public class StudentB extends AStudent
{
    StudentB(AMediator mediator)
    {
        super(mediator);
    }

    @Override
    public void work()
    {
        System.out.println("StudentB Comming");
    }

    @Override
    public String toString()
    {
        return "B";
    }
}

public abstract class AMediator
{
    public abstract void workwith(AStudent self);
}

public class Mediator extends AMediator
{
    private AStudent mStuA;
    private AStudent mStuB;


    @Override
    public void workwith(AStudent self)
    {
        if(self.toString().equals("A"))
        {
            mStuB.work();
        }
        else if(self.toString().equals("B"))
        {
            mStuA.work();
        } 
    }


    public void setStuA(AStudent a)
    {
        mStuA = a;
    }


    public void setStuB(AStudent b)
    {
        mStuB = b;
    }
}

public class Demo
{
    public static void main(String[] args)
    {
        Mediator mediator = new Mediator();

        AStudent stuA = new StudentA(mediator);
        AStudent stuB = new StudentB(mediator);

        mediator.setStuA(stuA);
        mediator.setStuB(stuB);

        stuA.work();
        stuA.workwith();


        stuB.work();
        stuB.workwith();
    }

}
```

以上Demo的输出结果

```
StudentA Comming
StudentB Comming
StudentB Comming
StudentA Comming
```
[（Mediator）中介者模式的Java实现（加修改）](http://haolloyin.blog.51cto.com/1177454/333810/)

## 解释器模式 

解释器模式提供一种方法去解释语法或表示方法，不常用。

抽象解释器：抽象类或接口，其中最主要的是解释操作interpret()，具体解释由实现类（终结符解释器TerminalExpression和非终结符解释器NonterminalExpression）来完成。
终结符解释器：实现与文法中的元素相关联的解释操作，通常一个解释器模式中只有一个终结符表达式，但有多个实例，对应不同的终结符。终结符一半是文法中的运算单元，比如有一个简单的公式R=R1+R2，在里面R1和R2就是终结符，对应的解析R1和R2的解释器就是终结符表达式。
非终结符表达式：文法中的每条规则对应于一个非终结符表达式，非终结符表达式一般是文法中的运算符或者其他关键字，比如公式R=R1+R2中，+就是非终结符，解析+的解释器就是一个非终结符表达式。非终结符表达式根据逻辑的复杂程度而增加，原则上每个文法规则都对应一个非终结符表达式。
环境角色：这个角色的任务一般是用来存放文法中各个终结符所对应的具体值，比如R=R1+R2，我们给R1赋值100，给R2赋值200。这些信息需要存放到环境角色中，很多情况下我们使用Map来充当环境角色就足够了。
