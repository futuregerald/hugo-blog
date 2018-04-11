+++
catalogues = ["教程"]
date = "2017-11-01T00:51:00+08:00"
draft = true
author = "JackLiu"
series = ["JS"]
tags = ["了不起的Node.js", "JS"]
thumbnail = "http://oqzceoiaz.bkt.clouddn.com/timg.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "了不起的Node.js--初学篇"

+++

---

&emsp;&emsp;趁着京东图书活动，买了这本[《了不起的Node.js ：将JavaScript进行到底》](https://book.douban.com/subject/25767596/)（下称白宝书），准备一边更新博客一边学习Node.js。边学习边记录，也算是种监督学习的方式。


## JavaScript基础
&emsp;&emsp;看到这章，默默地拿起了红宝书——[《JavaScript高级程序设计（第三版）》](https://book.douban.com/subject/10546125/)
这本书之前看过两遍，看不懂的地方很多，当时遇到不懂的地方都是跳过跳过，跳着跳着一本书就结束，这种态度不可取。

## 类型
白宝书说JavaScript的类型简单的分为两组：基本类型和复杂类型。访问基本类型，访问的是值，而访问复杂类型，访问的是对值的引用。

- 基本类型包括：number、boolearn、string、null以及undefined
- 复杂类型包括array、function以及object

而红宝书说复杂类型其实是ECMAScript的引用类型，包括Object类型、Array类型、Data类型、RegExp类型、Function类型、基本包装类型（Boolean类型、Number类型、String类型）、单体内置对象（Global对象、Math对象）。如何理解，ECMAScript是JavaScript的标准，所以是js的粑粑！粑粑说什么就是什么！

### 类型的困惑
先看例子：
```js
var a = 'woot'
var b = new String('woot')
a + b // 'wootwoot'
//吐槽下白宝书是'woot woot'，报告老板找到一个bug，申请午饭加鸡腿
typeof a // "string"
typeof b // "object"
a instanceof String // false
b instanceof String // true
a.substr === b.substr //true
a == b  // true
a === b  // false
```
是不是看的晕XX的。typeof 操作符是用来检测给定变量的数据类型的，instanceof 运算符用于判断一个变量是否是某个对象的实例，简单来说a与b的值相等，但是因为创建方式不同,a是基本类型string，b是引用类型object，就是同源不同宗。这里深入要研究原型模式。

## 函数

### js中创建函数的方式

```js
// 第一种（函数声明式）：
function sum1(num1,num2){
   return num1+num2;
}
// 第二种（函数表达式）：
var sum2 = function(num1,num2){
   return num1+num2;
}
// 第三种（函数对象方式）：
var sum3 = new Function("num1","num2","return num1+num2");  // 参数必须加引号
```
| 注意：函数声明式在代码执行前被加载到作用域中，函数表达式则是在代码执行到那行时才会有定义

### 改变this的指向
```js
function a() {
    window == this  // true
}
a()
```
可以通过 .call和 .apply方法可以改变 this的值
```
function a(c) {
    this.a == 'b'  // true
    c == 'c'  // true
}
a.call({a: 'b'}, 'c')
a.apply({a: 'b'}, ['c'])
```
.call 与 .apply方法作用相同，只是传参方式不同，call接收参数列表，apply结束参数数组。

### 函数的参数数量
看下面两个例子，了解如何得到函数的参数数量
~~~js
var a = function(a, b, c) {}
a.length == 3  // true

var foo = function(){
   return arguments.length
}
foo('ac', 12) // 2
foo() // 0
foo(12) // 1
~~~
