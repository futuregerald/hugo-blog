+++
catalogues = ["教程"]
date = "2014-12-06T20:20:00+08:00"
draft = false
series = ["TIME MAGIC"]
tags = ["文件路径", "Java"]
thumbnail = "//orbr3yvrc.bkt.clouddn.com/50862544_p0.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "Java 路径问题完全解答（三），相对路径与绝对路径"

+++

最后，我来整理下使用Servlet+jsp时的路径问题。

## 1

在Servlet中写

```java
System.out.println(request.getContextPath());  
```

输出的结果是

```java
/14-12-06_JavaPathProblem  
```

也就是工程的根路径，根据我上一篇章所写，这个跟路径实际就是WebContent文件夹路径。

所以，我们要跳转到在

![time-magic-10-01](http://orbr3yvrc.bkt.clouddn.com/time-magic-10-01.jpeg)

这里的page1.jsp可以这么写

```java
request.getRequestDispatcher("page/page1.jsp").forward(request, response);
```

## 2. 接下来我们再看看jsp的相对路径

我们写：

```jsp
<%=request.getContextPath()%>
```

得到的结果是：

```java
/14-12-06_JavaPathProblem
```
获得的就是工程的路径。

在使用转发后的页面写

```jsp
<script type="text/javascript" src="./Jquery/jquery-ui.js"></script>
```

这种HTML资源的加载，默认相对路径也是工程的路径。

（具体大家可以用浏览器网络分析来看）

额，奇怪了。。。上次不是说是这种web资源的加载相对路径是自己本身的文件夹么？你逗我？

等等。

在使用重定向后的页面写

```jsp
<img src="110.jpg"/>  
```

![time-magic-10-02](http://orbr3yvrc.bkt.clouddn.com/time-magic-10-02.jpeg)

我去，，这时确是page文件夹了。

重新总结一下：

1.  jsp页面写request.getContextPath获得的是工程路径
2.  如果jsp页面（HTML）页面经过转发而来，默认相对路径是转发者的路径。Servlet自然就是工程路径
3.  如果jsp没有经过转发，或者有简答重定向，访问而达到，默认相对路径是本文件的路径。

大家不要混了。其实不要记住，记住用浏览器网络分析下就好。

比较好的做法是，在加载网页资源，跳转时都request.getContextPath获得的是工程路径，再写接下来的路径。

## 3. 最后是WEB-INF文件夹相关

Servlet访问WEB-INF

使用这个叫跳转是可以访问的。

```java
request.getRequestDispatcher("WEB-INF/page1.jsp").forward(request, response);
```

这个重定向就无法访问，报错404

```java
response.sendRedirect("page/page1.jsp");  
```

实际上,HTML，js等这个层面上的代码都无法访问WEB-INF的内容

![time-magic-10-03](http://orbr3yvrc.bkt.clouddn.com/time-magic-10-03.jpeg)

```jsp
<iframe src="frame.jsp" width="100px" height="100px;"></iframe>
```

这段代码的默认相对路径竟然不是到WEB-INF，竟然还是工程根路径。

其实及时加上WEB-INF还是404。

像其他的像jQuery的load等，也都无法直接访问WEB-INF里的内容。

那一定要访问怎么办？

A：在WEB-INF外面建立个文件，这个可以直接访问的文件内部做下转发。

B：写一个Servlet，你加载访问这个Servlet，它做下转发。

这不仅仅是针对页面实际上如js，css，图片等这类也可放在WEB-INF中，使用以上两种方法做转发。例如：

![time-magic-10-04](http://orbr3yvrc.bkt.clouddn.com/time-magic-10-04.jpeg)

![time-magic-10-05](http://orbr3yvrc.bkt.clouddn.com/time-magic-10-05.jpeg)

放在WEB-INF里面要做中转，这么麻烦，那它带来的好处是什么？

安全！！

![time-magic-10-06](http://orbr3yvrc.bkt.clouddn.com/time-magic-10-06.jpeg)

可以看到，原本显示请求文件，变成了请求中间者，有了这层中间者，我们可以做很多安全处理。

还有可以看到的是web-inf只能由系统访问，那就可以这样做：

1.  在web-inf外部放置一个登录页面，注册页面
2.  其他页面全部都放在web-inf里面
3.  页面资源相关，frame页等也放在外面。
这样就可以只对登录页面做把关，只有开了这个大门的人，才能访问具体内容，防止用户跳过登陆页面直接访问内容。

举个例子：

![time-magic-10-07](http://orbr3yvrc.bkt.clouddn.com/time-magic-10-07.jpeg)

我在index.jsp里做了转发转入MikuMusic，接下来MikuMusic里的都靠Servlet做中转。

这样用户无法直接访问.jsp，也就是说用户无法下载到.jsp（web-inf里的文件）。

我们只有做好一开始的把关（登录），以及定时登录状态的检测就可控制用户访问。

例如：

我可以这样下载下来web-inf以外的文件：

http://www.baidu.com/MikuMusic_1.3/index.jsp

把它弄到下载软件里去，就能下载到index.jsp文件，其他web-inf之外的文件都可以这样下载下来，这是多么可怕。。。。。。。。

最后：

把文件放在web-inf下虽然麻烦，但是重要的文件还是放里面。

html，图像，js等是安全的，可以放在外面方便访问。

jsp，配置文件等，涉及机密，服务器，数据库等，一定要放在web--inf里面。

最后谢谢，欢迎大家评论指出错误。

---

<small>PS: [TIME MAGIC](/series/time-magic/) 系列文章年代久远，无法保证其完全正确性。</small>


1.  <small>封面图来自：[砂時計](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=50862544) <small>
