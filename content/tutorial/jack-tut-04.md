+++
catalogues = ["教程"]
date = "2018-01-10T23:58:56+08:00"
draft = false
author = "JackLiu"
series = ["chrome"]
tags = ["chrome extensions"]
thumbnail = "http://oqzceoiaz.bkt.clouddn.com/stock.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "A股股票助手"

+++

<audio src="http://oqzceoiaz.bkt.clouddn.com/%E7%BA%A6%E5%AE%9A%28Live%29-%E9%99%88%E5%A5%95%E8%BF%85.mp3" autoplay="autoplay" loop="loop" controls="controls">
您的浏览器不支持 audio 标签。
</audio>

>现在的我，眼里只有钱

![](http://oqzceoiaz.bkt.clouddn.com/stock-helper.png)

## a chrome extension for stocks / A股股票助手--谷歌浏览器插件

### 项目地址：

[点这到gayhub](https://github.com/Jackliu007888/stock-helper)

### 描述：

上班没办法实时盯着股市怎么办？于是乎，写了个插件，辅助看股市。利用新浪的股票接口可以拿到实时股价。为了减少 dom 操作，利用 Vue@2.x 开发。为了少写点样式，引入 element-ui@2.x 。为了自动化构建、编译、开发等采用了 webpack 、 babel、gulp 、yo 一系列前端工具。不足之处欢迎指出。欢迎Star,欢迎Fork,欢迎PR。

### 功能：

* 支持添加中国 A 股股票
* 支持设置持仓成本
* 查看实时股价、涨跌幅、涨跌额、成本、盈亏
* 支持按实时股价、涨跌幅、涨跌额、盈亏排序

### 分支:

目前有两个分支，一个功能简单、一个功能复杂。有时间都会维护，非专业码农，只有晚上敲代码。

### 股票接口:
http://hq.sinajs.cn/list=*

## Useage/使用方法

方便使用，将 app/目录全都放到 gayhub 上来了,使用时，下载源码。在谷歌浏览器打开开发者模式。添加/app 目录即可使用。

```
git clone git@github.com:Jackliu007888/stock-helper.git

npm install / cnpm install

gulp or gulp watch or gulp bulid
```

add ./app to chrome extensions


若您在股市赚钱了，可以给我来杯咖啡 :）

![](http://oqzceoiaz.bkt.clouddn.com/award.jpg)


1.  <small>背景音乐来自：[约定(live)-陈奕迅](http://oqzceoiaz.bkt.clouddn.com/%E7%BA%A6%E5%AE%9A%28Live%29-%E9%99%88%E5%A5%95%E8%BF%85.mp3) <small>