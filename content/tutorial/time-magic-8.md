+++
catalogues = ["教程"]
date = "2014-12-06T00:51:00+08:00"
draft = false
series = ["TIME MAGIC"]
tags = ["文件路径", "Java"]
thumbnail = "//orbr3yvrc.bkt.clouddn.com/50862544_p0.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "Java 路径问题完全解答（一），相对路径与绝对路径"

+++

每个程序员都会遇到读取文件时的路径问题，我在这里对 Java 路径问题做下较为全面的讲解，方便忘记的时候查看。

## JavaSE 路径问题

### 前提注意

1.  Java 中的 \ 表示转意字符，无法标识路径符号，如果需要表示路径要 \\（我推荐使用 / ）

### 相对路径

#### 相对路径的写法

```java
File file1 = new File("test.txt");
File file1 = new File("./test.txt");
```

相对路径的起点是工程目录，比如我的是：E:\JavaSeWorkspace\14-12-05_JavaSePathProblem。

这个路径是会随着，工程信息的变化自动适应的。

读取工程目录下，data 文件夹下的文件：

```java
File file1 = new File("data/test.txt");
```

读取 Src 下的文件:

```java
File file1 = new File("src/test.txt");
```

获取包路径下的文件，注意包的文件夹目录结构：

```java
File file1 = new File("src/com/mikuscallion/test/test.txt");
```

### 相对路径常见错误写法

```java
File file1 = new File("/test.txt");  //报错，找不到路径
File file1 = new File("\test.txt");  //报错，找不到路径,实际上 \t 变成了制表符号 tab
File file1 = new File("\\test.txt"); //报错，找不到路径
```

### 绝对路径

以这个 E:/（盘符）打头的路径就是绝对路径：

```java
File file1 = new File("E:/JavaSeWorkspace/14-12-05_JavaSePathProblem/test.txt");
```

绝对路径是写死的，最好别用。

## 总结

java 的相对路径，相对的是 .class，而不是 .java。因为实际运行的是 .class。

相对路径出错的时候，去看看实际工程的文件结构，看看 .class 的位置，一般都能解决。

---

<small>PS: [TIME MAGIC](/series/time-magic/) 系列文章年代久远，无法保证其完全正确性。</small>


1.  <small>封面图来自：[砂時計](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=50862544) <small>
