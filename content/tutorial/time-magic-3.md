+++
catalogues = ["教程"]
date = "2014-07-22T19:26:00+08:00"
draft = false
series = ["TIME MAGIC"]
tags = ["源代码", "字符串处理", "Java"]
thumbnail = "//orbr3yvrc.bkt.clouddn.com/50862544_p0.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "字符串处理函数集合的 Java 源码"
description = "Java字符串处理工具类,Java删除字符串中的某些字符,Java删去文本里的HTML标签"
+++

```java
import java.util.ArrayList;

/**
 * 字符串处理类
 * @author MIKUScallion
 *
 */
public class StringUtil {
	/**
	 * 删除字符串中的某些字符
	 * @param s   字符串
	 * @param cs   要删去的字符
	 * @return     新字符串
	 */
	public static String delChars(String s,char...cs){
		String temp=s;
		for(char c: cs){
			//注意这个函数的返回值才是修改后的
			temp=temp.replace(c,' ');
		}
		StringBuilder sb =new StringBuilder();
		for(int i=0;i<temp.length();i++){
			char t =temp.charAt(i);
			if(t!=' '){
				sb.append(t);
			}
		}
		return sb.toString();
	}
	/**
	 * 删去文本里的HTML标签
	 * @param s   文本
	 * @return     除去标签的文本
	 */
	public static String delHtmlFlag(String s){
		//<.+?>
		ArrayList<String> dels=PageUtil.findHtml(s, "<.+?>");
		for(String del:dels){
			s=StringUtil.delChars(s, del.toCharArray());
		}
		return s;
	}
}
```

---

<small>PS: [TIME MAGIC](/series/time-magic/) 系列文章年代久远，无法保证其完全正确性。</small>


1.  <small>封面图来自：[砂時計](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=50862544) <small>
