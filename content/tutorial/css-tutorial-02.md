+++
catalogues = ["教程"]
date = "2017-06-27T00:51:00+08:00"
draft = false
author = "JackLiu"
series = ["CSS TUTORIAL"]
tags = ["CSS权威指南", "CSS"]
thumbnail = "http://oqzceoiaz.bkt.clouddn.com/timg.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "CSS权威指南（二）选择器"

+++
<h1 style="font-size:1.5rem">选择器</h1>

通过选择器（selector）和声明块（declaration block）的结构，来定义被选中元素的样式。声明块是由一个或多个声明组成，每个声明则是一个属性-值对（property-value）。

```
// 选择器 + 声明块
h1 {
  color:  red ;//声明1 属性：值
  background: yellow;//声明2 属性：值
  }
```

---

## 一、元素选择器


最常见的选择器往往是元素选择器。换句话说，文档的元素就是最基本的选择器。

如果设置 HTML 的样式，选择器通常将是某个 HTML 元素，比如p、h1、em、a，甚至可以是 html 本身：

~~~css
html {color:black;}
h1 {color:blue;}
h2 {color:silver;}
~~~

### 选择器分组

~~~css
body,html {mrgin:0;}
~~~
像这样可以对body和html一起设置样式。

#### 通配选择器

~~~
* {color: red;}
~~~
这个universal selector用*表示，表示所有的元素；

#### 综合选择器和声明的分组

我们可以在一个规则中结合选择器分组和声明分组，就可以使用很少的语句定义相对复杂的样式。
下面的规则为所有标题指定了一种复杂的样式：

~~~css
h1, h2, h3, h4, h5, h6 {
  color:gray;
  background: white;
  padding: 10px;
  border: 1px solid black;
  font-family: Verdana;
  }
~~~


---

## 二、类选择器

### 类选择器（class selector）
使用前先在html中的加入class="类名"，然后在css中使用时用 .类名{}表示

例如：

~~~
<div class="contain">
    <p class="p-tag"></p>
</div>
~~~

~~~
.contain{
    text-align: center;
}
.p-tag {
    font-size:18px;
}
~~~

### 综合元素选择器

您可能希望只有段落显示为红色文本：

~~~
<p class="important">只有段落显示为红色文本</p>
~~~

~~~
p.important {color:red;}
~~~

```html
<link rel=“stylesheet" type="text/css" href="sheetl.css" media="all"/>
```


### css多类选择器

~~~
<p class="important warning">
    This paragraph is a very important warning.
</p>
~~~
这两个词的顺序无关紧要，写成 warning important 也可以。
我们假设 class 为 important 的所有元素都是粗体，而 class 为 warning 的所有元素为斜体，class 中同时包含 important 和 warning 的所有元素还有一个银色的背景 。就可以写作：

~~~
   .important {font-weight:bold;}
   .warning {font-style:italic;}
   .important.warning {background:silver;}
~~~

通过把两个类选择器链接在一起，仅可以选择同时包含这些类名的元素（类名的顺序不限）。
如果一个多类选择器包含类名列表中没有的一个类名，匹配就会失败。请看下面的规则：

~~~
.important.urgent {background:silver;}
~~~
不出所料，这个选择器将只匹配 class 属性中包含词 important 和 urgent 的 p 元素。因此，如果一个 p 元素的 class 属性中只有词 important 和 warning，将不能匹配。不过，它能匹配以下元素：
~~~
<p class="important urgent warning">
    This paragraph is a very important and urgent warning.
</p>
~~~

---

## 三、ID选择器


### ID选择器

ID选择器与类选择器相似，前面是一个#号，html中加入id="id名"

~~~
*#first-para {font-weight：bold；}
// 这个规则会让id属性中包含值为first-para的所有元素都显示为粗体文本，
// 同时注意可以省略通配符,效果相同
#first-para {font-weight：bold；}
~~~

> 类选择器和id选择器是区分大小写的，id选择器最好唯一，浏览器不检查唯一性，但是会造成样式混乱

> 对于css样式尽量使用类选择器，对于js使用id选择器

---

## 四、属性选择器


### CSS 2 引入了属性选择器

属性选择器可以根据元素的属性及属性值来选择元素。

#### 简单属性选择

如果希望选择有某个属性的元素，而不论属性值是什么，可以使用简单属性选择器。
如果您希望把包含标题（title）的所有元素变为红色，可以写作：

~~~
*[title] {color:red;}
~~~

与上面类似，可以只对有 href 属性的锚（a 元素）应用样式：

~~~
a[href] {color:red;}
~~~

还可以根据多个属性进行选择，只需将属性选择器链接在一起即可。
例如，为了将同时有 href 和 title 属性的 HTML 超链接的文本设置为红色，可以这样写：

~~~
a[href][title] {color:red;}
~~~

#### 子串匹配属性选择器

| 类型 | 描述 |
| :----------- | :--- |
| [abc^="def"] | 选择 abc 属性值以 "def" 开头的所有元素
| [abc$="def"] | 选择 abc 属性值以 "def" 结尾的所有元素
| [abc*="def"] | 选择 abc 属性值中包含子串 "def" 的所有元素
| [abc~="def"] | 选择 abc 属性值中包含单词 "def" 的每个元素
| [abc*="def"] | 选择 abc 属性值中包含子串 "def" 的所有元素
| [abc*="def"] | 选择 abc 属性值中包含子串 "def" 的所有元素
| [abc\|="def"] | 选择 abc 属性值中以 "def"整个单词开头的所有元素


#### 特定属性选择类型

~~~
*[lang|="en"] {color: red;}
~~~



上面这个规则会选择 lang 属性等于 en 或以 en- 开头的所有元素。因此，以下示例标记中的前三个元素将被选中，而不会选择后两个元素：

~~~
<p lang="en">Hello!</p>
<p lang="en-us">Greetings!</p>
<p lang="en-au">G'day!</p>
<p lang="fr">Bonjour!</p>
<p lang="cy-en">Jrooana!</p>
~~~

---

## 五、后代选择器


### 后代选择器descendant selector

首先理解父子关系，html文档以元素的一种层次结构为基础，如果一个元素出现在现在文档层次结构中另一个元素的上一层，则称前者是后者的父元素。

选择h1元素后代的em元素的文本变成灰色：

```
<h1><em>abc</em></h1>
```

```
h1 em {color:gray;}
```

> 有关后代选择器有一个易被忽视的方面，即两个元素之间的层次间隔可以是无限的。

例如，如果写作 ul em，这个语法就会选择从 ul 元素继承的所有 em 元素，而不论 em 的嵌套层次多深。
因此，ul em 将会选择以下标记中的所有 em 元素：

~~~
<ul>
  <li>List item 1
    <ol>
      <li>List item 1-1</li>
      <li>List item 1-2</li>
      <li>List item 1-3
        <ol>
          <li>List item 1-3-1</li>
          <li>List item <em>1-3-2</em></li>
          <li>List item 1-3-3</li>
        </ol>
      </li>
      <li>List item 1-4</li>
    </ol>
  </li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>

~~~

---

## 六、子元素选择器

### 选择子元素

如果并不想选择一个任意的后代元素，而是希望缩小范围，只选择另一个元素的子元素。例如想要选择只作为h1元素子元素（而不是后代元素）的strong元素，可以使用子结合符，即大于号>

~~~
h1>strong {color:red;}
~~~

---

## 七、相邻兄弟选择器


### 选择相邻兄弟元素

假设希望对一个标题后紧邻的段落应用样式，或者向后一个段落后紧接着的列表指定特殊的外边距，要选择紧接在另一个元素后的元素，而且二者都有相同的父元素，可以使用相邻兄弟结合符，即为加号+

~~~
h1+p {margin-top:0;}
~~~

对于下面这段代码，div中包含两个列表，一个有序列表，一个无序列表。这两个列表都是相邻元素。用一个结合符只能选择两个相邻兄弟中的第二个元素。如果写作li+li只会悬着第二个和第三个列表项，第一个不会受到影响。

~~~
<div>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3</li>
  </ul>
  <ol>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3</li>
  </ol>
</div>
~~~



相邻兄弟结合符还可以结合其他结合符：

~~~
html > body table + ul {margin-top:20px;}
~~~

这个选择器解释为：选择紧接在 table 元素后出现的所有兄弟 ul 元素，该 table 元素包含在一个 body 元素中，body 元素本身是 html 元素的子元素。

--------------------------------------------------------------------------------------

## 八、伪类选择器和伪元素选择器


### 伪类和伪元素

利用这两个选择器，可以为文档中不一定具有存在的结构指定样式，或者为某些元素（甚至元素本身）的状态所指示的幻象类指定样式，换句话说，会根据另外某种条件而非文档结构向文档中的某些部分应用演示，而且无法通过研究文档的标记准确地推断出采用何种方式应用样式。

### 伪类选择器

~~~
a:visited {color :red;}
// 伪类的语法：
selector : pseudo-class {property: value}
// CSS 类也可与伪类搭配使用。
selector.class : pseudo-class {property: value}
~~~

#### 锚伪类

在支持 CSS 的浏览器中，链接的不同状态都可以不同的方式显示，这些状态包括：活动状态，已被访问状态，未被访问状态，和鼠标悬停状态。

~~~
a:link {color: #FF0000}	/* 未访问的链接 */
a:visited {color: #00FF00}	/* 已访问的链接 */
a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
a:active {color: #0000FF}	/* 选定的链接 */
~~~

#### 静态伪类
:link 和 :visited 是非常有用的，但他们是静态的。即第一次显示之后，他们一般不会再改变文档的样式。

- :link      指示作为超链接并指向一个未访问的地址锚
- :visited 指示作为以访问地址超链接的所有锚

#### 动态伪类

CSS 2.1定义 了3个动态伪类，他们根据用户行为改变文档的外观。

- :focus  指示当前拥有输入焦点的元素
- :active 指示被用户输入激活的元素
- :hover 指示鼠标指针停留在哪个元素上

> 注意：动态伪类可以应用到任何元素，对于非链接的元素应用动态样式通常很有用。例如：

~~~
input:focus { background: silver; font-weight: bold;}
// 突出显示一个有输入焦点的表单元素
~~~

#### first-child 伪类

您可以使用 :first-child 伪类来选择元素的第一个子元素。这个特定伪类很容易遭到误解，所以有必要举例来说明。考虑以下标记：

```
<div>
    <p>These are the necessary steps:</p>
    <ul>
        <li>Intert Key</li>
        <li>Turn key <strong>clockwise</strong></li>
        <li>Push accelerator</li>
    </ul>
    <p>Do <em>not</em> push the brake at the same time as the accelerator.</p>
</div>
```
在上面的例子中，作为第一个元素的元素包括第一个 p、第一个 li 和 strong 和 em 元素。
给定以下规则：
```
p:first-child {font-weight: bold;}
li:first-child {text-transform:uppercase;}
```
第一个规则将作为某元素第一个子元素的所有 p 元素设置为粗体。第二个规则将作为某个元素（在 HTML 中，这肯定是 ol 或 ul 元素）第一个子元素的所有 li 元素变成大写。


#### :lang伪类

:lang 伪类使你有能力为不同的语言定义特殊的规则。在下面的例子中，:lang 类为属性值为 no 的 q 元素定义引号的类型：

~~~
<html>
<head>
<style type="text/css">
q:lang(no)
   {
   quotes: "~" "~"
   }
</style>
</head>
<body>
<p>文字<q lang="no">段落中的引用的文字</q>文字</p>
</body></html>
~~~

### 伪元素选择器

就像伪类为锚指定幻象类一样，伪元素能够在文档中插入假想的元素，从而达到某种效果。CSS 2.1 定义了4个伪元素：设置首字母样式、设置第一行样式、设置之前和之后元素的样式。

## 设置首字母样式

~~~
p:first-letter { color: red;}
~~~

## 设置首行样式

~~~
p:first-line { color: red;}
~~~

## 设置之前和之后元素的样式

~~~
h2:before { content: "||";color: silver;}
// 在元素之前插入银色||

body:after { content; "The End";}
// 在body元素后插入字符串。
~~~


## 小结

用户代理通常必须慎用选择器，因为如果不能正确地解释选择器，会导致用户代理根本无法使用CSS。对于我们前端开发人员，更要正确地编写选择器，这很关键，因为一旦有错误，就无法按预想的方式显式应用样式。




---



<small>PS: [CSS TUTORIAL](/series/css-tutorial/) 系列文章来源于《CSS权威指南-第三版》，由本站整理，无法保证其完全正确性。</small>



1.  <small>封面图来自：[CSS权威指南](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498485389309&di=978e56f83d06f62c85861f9a370bb163&imgtype=0&src=http%3A%2F%2Fimages2015.cnblogs.com%2Fblog%2F925891%2F201605%2F925891-20160528091148866-714277288.jpg) <small>
