+++
catalogues = ["教程"]
date = "2017-06-26T00:51:00+08:00"
draft = false
author = "JackLiu"
series = ["CSS TUTORIAL"]
tags = ["CSS权威指南", "CSS"]
thumbnail = "http://oqzceoiaz.bkt.clouddn.com/timg.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "CSS权威指南（一）css样式的引入"

+++

## 一、引入一个外部的css文件

```html
<link rel=“stylesheet" type="text/css" href="sheetl.css" media="all"/>
```

rel表示关系，在这里关系是stylesheet。type总是设置为text/css。加载的数据类型。
href属性是样式表的url。可以是相对的URL也可以绝对的URL，media属性说明该样式表应用于的媒体：

| All	 | 所有表现媒体 |
| :----- | :-- | 
| Aural	| 语音合成器、屏幕阅读器和文档的其他声音表现
| Braille | 用bralille设备表现文档时
| Embossed | 用braille打印时
| Handheld | 手持设备
| Print | 打印文档，打印预览
| Projection | 用于投影媒体
| Screen  | 屏幕媒体
| Tty | 在固定间距环境显示文档
| Tv | 电视上显示文档

### 候选样式表

将rel属性的值值为alternate stylesheet，就可以定义候选样式表，只有在用户选择这个样式表时才会用于文档表现。

```html
<link rel="alternate stylesheet" type = "text/css"
 href="bigtext.css" "title="bigTitle"/>
```

用户会在浏览器上选择候样式表

## 二、嵌套样式表

   
```html
<style type="text/css">这里是样式</style>
```
必须有type="text/css"

### @import指令
   
```html
<style type="text/css">
    @import url(styles.css);/*其他样式*/
</style>
```

* 必须在style内使用 
* 必须在其他css样式前

### 向后可访问性

可以将声明包含在一个注释标记中，例如：

```html
<style type="text/css">
    <!--@import url(sheet2.css); h1 {} -->
</style>
```
这样使较老的浏览器会自动将style标记完全忽略，还会忽略声明，与此同时，能够理解css的浏览器会正常读取样式表。

### css注释

用/*  */的方式包围注释的代码，注意不能嵌套注释。

## 内联样式

```html
<p style="color:gray;">The most wonderful of all breakfast food is the waffle!</p>
```

与其他样式表相比，区别在于`{ }`换成了 `""`。





---



<small>PS: [CSS TUTORIAL](/series/css-tutorial/) 系列文章来源于《CSS权威指南-第三版》，由本站整理，无法保证其完全正确性。</small>



1.  <small>封面图来自：[CSS权威指南](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498485389309&di=978e56f83d06f62c85861f9a370bb163&imgtype=0&src=http%3A%2F%2Fimages2015.cnblogs.com%2Fblog%2F925891%2F201605%2F925891-20160528091148866-714277288.jpg) <small>
