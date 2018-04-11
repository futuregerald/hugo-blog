+++
catalogues = ["教程"]
date = "2014-12-06T15:56:00+08:00"
draft = false
series = ["TIME MAGIC"]
tags = ["文件路径", "Java"]
thumbnail = "//orbr3yvrc.bkt.clouddn.com/50862544_p0.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "Java 路径问题完全解答（二），相对路径与绝对路径"

+++

## JavaEE动态web工程路径问题

这个路径问题，特别是在做页面跳转，读取配置文件的时候经常会遇到，很恶心的。我在这里做下，较为完整的说明。

### 一：jsp文件路径相关

#### 1.jsp文件的默认相对路径

对于页面加载其他文件如：链接js库，css库，加载图片，加载其他页面等，我推荐用火狐浏览器的网络分析器，查看页面请求的详细信息，很直观的。

```html
<scripttype="text/JavaScript" src="test.js"></script>
```

上面这个语句位于一个在WebContent\page路径下的jsp文件上，他请求加载一个test.js的文件，用默认相对路径，它加载这个路径下的文件：

![time-magic-9-01](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-01.png)

（这个jsp是没有经过转发的，默认相对路径是自己的文件夹，详细的在第三篇路径文章里我有说）

这里很奇怪，如果默认相对路径是自己的路径的话，为什么不是WebContent\page\test.js

我在page下面，也就是与jsp文件同一路径下的地方放了个test.js

![time-magic-9-02](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-02.png)

于是

![time-magic-9-03](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-03.png)

如果我把WebContent写上会怎样？

![time-magic-9-04](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-04.png)

可以看出来，WebContent这个文件夹好像是假的，根本不要写！

去查看下真正部署到Tomcat上的文件后，可以看到压根没有WebContent这个文件夹

![time-magic-9-05](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-05.png)

那访问WebContent之外的文件可以吗？

![time-magic-9-06](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-06.png)
![time-magic-9-07](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-07.png)
![time-magic-9-08](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-08.png)

#### 小结

1.  对于页面所要的资源全部放在WebContent路径下，注意书写相对路径时不要再写WebContent。原因上面我已经说过了。

2.  页面的默认相对路径是本身页面所在的路径（未经过转发）：可以通过<%=request.getContextPath() %>获得工程路径，注意不要再写WebContent。

### 二：运行在服务器上面的Java读取文件的路径问题

注意：运行在服务器端的java类，他的运行路径环境与在IDE上的路径环境比较不一样，要多注意，这里的相对路径不能像javaSe程序那样写。

举个具体例子来说：普通java类，例如Dbutil读取dbInfo.xml配置文件时，配置文件放在哪里，路径怎么写？

配置文件放在哪里：

1.  不要放在工程跟路径下：因工程根路径下的文件不会被部署
2.  不要放在WebContent路径下：因为部署到服务器上后，文件夹结构会发生变化，不好写相对路径。而且实际上代码的运行时的地方也不一样了。具体你可以去Tomcat实际上的工程看看。更重要的是再WEB-INF外面的文件是可以直接下载到了，很不安全。
3.  对于普通java代码需要的配置文件，我建议放置在src目录下，或者是包路径下，还有web-inf下。

路径怎么写：

1.  实际上web java类没有正常相对路径可写，我们要用特殊的方法写。（因为在服务器上运行时路径与开发时不同了）
2.  就是你想获得文件，你得从最终生成的.class文件为着手点，不要以.java文件的路径为出发点，因为真正使用的就是.class，不会拿个.java文件就使用，因为java是编译型语言嘛
3.  使用DBUtil.class.getResource("").toString()获取使用类(.class)的相对路径，再使用这个相对路径去读取配置文件
4.  class.getResource("/") --> 返回class文件所在的顶级目录，一般为包名的顶级目录。
5.否则只能写绝对路径了。

给个实际的例子：

包结构

![time-magic-9-09](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-09.jpeg)

部署到Tomcat上的文件的结构

![time-magic-9-10](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-10.jpeg)

以DBUtil.class文件出发，开始读取文件

```java
DBUtil.class.getResource("").toString()+"/DBInfo.xml")
```

这样可以写成相对路径。
或者你就写死了：
像这样：


![time-magic-9-11](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-11.jpeg)
![time-magic-9-12](http://orbr3yvrc.bkt.clouddn.com/time-magic-9-12.jpeg)



其实，你可以看看strust2.0与hibernate，c3p0，它们的配置文件也是写在src或者包路径下的，不要写在WebContent下。

最后，路径有问题的话，多去看看部署到Tomcat上的工程，就会明白很多。

### 三：运行在IDE上的java类（没有部署的，单元测试等）

这个路径的书写就按照第一篇文章说的se的模式来写，这时要写WebContent哦。。。。

这两者不要搞混了，上次，我同学写的数据库部分，我叫他做单元测试，他写WebContent读取配置文件，结果实际部署时一直路径报错，现在知道怎么回事了吧。

## 总结

1.  出现路径问题，多看实际部署的Tomcat工程。
2.  WebContent这个文件夹只有在IDE里才有，实际部署工程是不存在的，但是它是个框架，他里面的东西才能被部署上去。总之，写相对路径时不要写它。
3.  java读取配置文件，数据文件路径问题，你要明白，相对路径相对的是.class文件的路径，不是.java。
4.  多比较实际部署文件，实际运行工程，使用火狐网络数据分析，能最快的解决路径问题。

---

<small>PS: [TIME MAGIC](/series/time-magic/) 系列文章年代久远，无法保证其完全正确性。</small>


1.  <small>封面图来自：[砂時計](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=50862544) <small>
