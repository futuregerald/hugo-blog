+++
catalogues = ["教程"]
date = "2014-07-22T17:17:00+08:00"
draft = false
series = ["TIME MAGIC"]
tags = ["源代码", "爬虫", "Java"]
keyword = ["1源代码", "2爬虫", "3Java"]
thumbnail = "//orbr3yvrc.bkt.clouddn.com/50862544_p0.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "根据 URL 地址获取其页面的 HTML 文本的 Java 源码"
description = "java简单网页抓取的实现方法,java 抓取网页内容实现代码,JAVA使用爬虫抓取网站网页内容的方法,java抓取网页数据示例,java利用url实现网页内容的抓取,java使用htmlparser提取网页纯文本例子,基于Java HttpClient和Htmlparser实现网络爬虫代码,教你如何编写简单的网络爬虫_java,java正则表达式简单使用和网页爬虫的制作代码,java利用htmlparser获取html中想要的代码具体实现,使用java将动态网页生成静态网页示例"
+++

```java
import java.net.*;
import java.io.*;

/**
 * HTML工具类
 * @author MIKUScallion
 *
 */
public class Html {
 private static URL url;
 private static URLConnection cnet;
 private static InputStream is;
 private static BufferedInputStream bis;
 private static StringBuilder sb;
 private static String result;
 /**
  * 输入url地址获得页面的HTML代码
  * @param url  url地址
  * @return       大String（HTML代码）
  * @throws IOException
  */
 public  static String getHtmlCode(String str){
  try {
   url = new URL(str);
      cnet =url.openConnection();
   is =cnet.getInputStream();
   bis =new BufferedInputStream(is);
   byte [] bytes =new byte[512];
   int len =-1;
   sb =new StringBuilder();
   while((len=bis.read(bytes))!=-1){
    sb.append(new String(bytes,0,len));
   }
   is.close();
   bis.close();
   result=sb.toString();
   return result;
  } catch (MalformedURLException e) {
   e.printStackTrace();
  } catch (IOException e) {
   e.printStackTrace();
  }
  return null;
 }
}
```

---

<small>PS: [TIME MAGIC](/series/time-magic/) 系列文章年代久远，无法保证其完全正确性。</small>


1.  <small>封面图来自：[砂時計](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=50862544) <small>
