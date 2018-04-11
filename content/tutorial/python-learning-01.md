+++
catalogues = ["教程"]
date = "2017-09-21T00:52:00+08:00"
draft = false
author = "JackLiu"
series = ["Python"]
tags = ["python入门"]
thumbnail = "http://oqzceoiaz.bkt.clouddn.com/python-1.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "人生苦短，我学Python —— 胡扯篇"

+++
# 人生苦短，我学Python —— 胡扯篇

> 如果什么都像Python一样单纯就好了

<img src="http://oqzceoiaz.bkt.clouddn.com/python.jpg">

人生苦短，我学Python。欢迎来到Python从入门到放弃的博客。

学习Python之前，可能早就听说过Python的大名。别人用几百行的代码，Python十几行就搞定了。没错，这就是Python，简洁！还有，不知道是否听说过一个笑话，学习python前需要买一个游标卡尺，你问我为什么？教材上的代码翻页的时候你就知道了。

## Python是什么

Python是什么，英文中是大蟒蛇的意思，难怪那么多图书都是以大蟒蛇作为封面。看看[官网](https://www.python.org/),对的，都是英文的，看不了吧，看不懂就让我来瞎几把乱扯。

Python是一门优秀的高级编程语言，应用十分广泛，在各个领域都能见到它的身影，网络应用、脚本工具、胶水语言、数据分析、大数据处理等等。它的特点就是“优雅”、“明确”、“简单”。



## python之禅

来我们看看python之禅,安装完python，输入：


```python
import this
```

    The Zen of Python, by Tim Peters

    Beautiful is better than ugly.
    Explicit is better than implicit.
    Simple is better than complex.
    Complex is better than complicated.
    Flat is better than nested.
    Sparse is better than dense.
    Readability counts.
    Special cases aren't special enough to break the rules.
    Although practicality beats purity.
    Errors should never pass silently.
    Unless explicitly silenced.
    In the face of ambiguity, refuse the temptation to guess.
    There should be one-- and preferably only one --obvious way to do it.
    Although that way may not be obvious at first unless you're Dutch.
    Now is better than never.
    Although never is often better than *right* now.
    If the implementation is hard to explain, it's a bad idea.
    If the implementation is easy to explain, it may be a good idea.
    Namespaces are one honking great idea -- let's do more of those!


这就是Python之禅：中文翻译：

- Beautiful is better than ugly. 优美胜于丑陋（Python 以编写优美的代码为目标）


- Explicit is better than implicit. 明了胜于晦涩（优美的代码应当是明了的，命名规范，风格相似）


- Simple is better than complex. 简洁胜于复杂（优美的代码应当是简洁的，不要有复杂的内部实现）


- Complex is better than complicated. 复杂胜于凌乱（如果复杂不可避免，那代码间也不能有难懂的关系，要保持接口简洁）


- Flat is better than nested. 扁平胜于嵌套（优美的代码应当是扁平的，不能有太多的嵌套）


- Sparse is better than dense. 间隔胜于紧凑（优美的代码有适当的间隔，不要奢望一行代码解决问题）


- Readability counts. 可读性很重要（优美的代码是可读的）


- Special cases aren't special enough to break the rules.Although practicality beats purity. 即便假借特例的实用性之名，也不可违背这些规则（这些规则至高无上）


- Errors should never pass silently.Unless explicitly silenced. 不要包容所有错误，除非你确定需要这样做（精准地捕获异常，不写 except:pass 风格的代码）


- In the face of ambiguity, refuse the temptation to guess. 当存在多种可能，不要尝试去猜测


- There should be one-- and preferably only one --obvious way to do it. 而是尽量找一种，最好是唯一一种明显的解决方案（如果不确定，就用穷举法）


- Although that way may not be obvious at first unless you're Dutch. 虽然这并不容易，因为你不是 Python 之父（这里的 Dutch 是指 Guido ）


- Now is better than never. Although never is often better than right now.做也许好过不做，但不假思索就动手还不如不做（动手之前要细思量）


- If the implementation is hard to explain, it's a bad idea.If the implementation is easy to explain, it may be a good idea.  如果你无法向人描述你的方案，那肯定不是一个好方案；反之亦然（方案测评标准）


- Namespaces are one honking great idea -- let's do more of those! 命名空间是一种绝妙的理念，我们应当多加利用（倡导与号召）

对了，有兴趣的可以google下怎么产生这段Python之禅的。[伸手党进!](https://www.zhihu.com/question/29537417/answer/126739983)

## 版本选择

目前存在两个版本，Python 2.x 和 Python 3.x 。两者由于设计上故意不兼容语法，所以令很多人无从下手，到底选择哪个版本入门，各说风云。那么我们作为新手，如何选择呢？听我的，抛个硬币然后就开始学吧，学哪个不重要，着手开始学习才重要。

知乎上有一个很经典的问答：

Q:现在开始学XXX语言还来得及吗？

A:学习一样东西，最好的时间当然是几年前，但是实际上最好的只有现在。

## 如何入门

这里推荐一下入门的视频，这里推荐[小甲鱼老师的视频](https://edu.aliyun.com/course/137/lesson/list?spm=5176.8764728.aliyun-edu-course-tab.2.YoXBX3&previewAs=guest#modal)，入门的书籍推荐[《Python核心编程（第二版）》](https://book.douban.com/subject/3112503/)、[《父与子的编程之旅》](https://book.douban.com/subject/26005639/)、[《笨方法学 Python》](https://book.douban.com/subject/26264642/)还有[英文原文](http://learnpythonthehardway.org/book/)和[中文翻译](https://flyouting.gitbooks.io/learn-python-the-hard-way-cn/content/)英语好忽略中文翻译。

还有推荐是廖雪峰老师的博客[3.x版本](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)当然还有[2.7版本](https://www.liaoxuefeng.com/wiki/001374738125095c955c1e6d8bb493182103fac9270762a000)。

资源都有，学不学看你 : ）

> Life is short. Use Python.
