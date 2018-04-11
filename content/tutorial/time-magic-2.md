+++
catalogues = ["教程"]
date = "2014-07-22T19:21:00+08:00"
draft = false
series = ["TIME MAGIC"]
tags = ["源代码", "正则表达式", "Java"]
thumbnail = "//orbr3yvrc.bkt.clouddn.com/50862544_p0.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "正则表达式匹配字符串的 Java 源码"
description = "Java基于正则表达式实现查找匹配的文本功能,Java实现字符串匹配基于正则_java,java 字符串匹配函数_正则表达式,java使用正则表达式查找包含的字符串示例_java,Java使用正则表达式(regex)匹配中文实例代码_java"
+++

```java
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 利用正则表达式子处理分析页面
 * 提取出关键字符串
 * @author MIKUScallion
 */
public class PageUtil {
	/**
	 * 在html代码中查找符合正则表达式子的字符
	 * @param htmlCode  html代码
	 * @param regex       正则表达式
	 * @return                 符合条件的字符串集
	 */
	public  static ArrayList<String> findHtml(   String htmlCode,String regex){
			ArrayList<String> urls1=new ArrayList<String>();
			Pattern p =Pattern.compile(regex);
			Matcher m =p.matcher(htmlCode);
			while(m.find()){
				urls1.add(new String(m.group()));
			}
		return urls1;
	}
}
```

---

<small>PS: [TIME MAGIC](/series/time-magic/) 系列文章年代久远，无法保证其完全正确性。</small>


1.  <small>封面图来自：[砂時計](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=50862544) <small>
