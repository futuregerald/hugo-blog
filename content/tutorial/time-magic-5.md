+++
catalogues = ["教程"]
date = "2014-07-24T20:41:00+08:00"
draft = false
series = ["TIME MAGIC"]
tags = ["源代码", "文件操作", "Java"]
thumbnail = "//orbr3yvrc.bkt.clouddn.com/50862544_p0.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "常见IO操作如文件复制、文件夹复制、检测目录存在性以及读入与写入文本的 Java 源码"
description = "Java文件IO操作,Java文件复制,Java文件夹复制,Java检测目录是否存在,Java读入与写入文本"
+++

```java
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 我封装了一些IO的常用操作 例如： 文件复制，文件夹复制，
 *
 * @author MIKUScallion
 *
 */
public class MyIoUtil {

	private static BufferedReader br;

	public static void main(String[] args) {
//		List<String> lines;
//		try {
//			lines=MyIoUtil.readTextByLine("test.txt");
//			for(String s:lines){
//				System.out.println(s);
//			}
//		} catch (IOException e) {
//			e.printStackTrace();
//		}

	}
	/**
	 * 复制文件类
	 *
	 * @param sourceFile
	 *            源文件类
	 * @param targetFile
	 *            目标文件类
	 * @throws IOException
	 *             IO异常
	 */
	public static void copyFile(File sourceFile, File targetFile)
			throws IOException {
		// 输入流缓冲
		BufferedInputStream inBuff = null;
		// 输出流缓冲
		BufferedOutputStream outBuff = null;
		try {
			// 新建文件输入流并对它进行缓冲
			inBuff = new BufferedInputStream(new FileInputStream(sourceFile));

			// 新建文件输出流并对它进行缓冲
			outBuff = new BufferedOutputStream(new FileOutputStream(targetFile));

			// 文件读写copy操作
			byte[] b = new byte[1024 * 5];
			int len;
			while ((len = inBuff.read(b)) != -1) {
				outBuff.write(b, 0, len);
			}
			// 刷新此缓冲的输出流
			outBuff.flush();
		} finally {
			// 关闭流
			if (inBuff != null)
				inBuff.close();
			if (outBuff != null)
				outBuff.close();
		}
	}

	/**
	 * 运用递归算法复制整个文件夹
	 *
	 * @param sourceDir
	 *            源文件夹
	 * @param targetDir
	 *            目标文件夹
	 * @throws IOException
	 *             IO异常
	 */
	public static void copyDirectiory(String sourceDir, String targetDir)
			throws IOException {
		// 新建目标目录
		(new File(targetDir)).mkdirs();
		// 获取源文件夹当前下的文件或目录
		File[] file = (new File(sourceDir)).listFiles();
		for (int i = 0; i < file.length; i++) {
			// 是文件
			if (file[i].isFile()) {
				// 源文件
				File sourceFile = file[i];
				// 目标文件
				File targetFile = new File(
						new File(targetDir).getAbsolutePath() + File.separator
								+ file[i].getName());
				copyFile(sourceFile, targetFile);
			}
			if (file[i].isDirectory()) {// 递归算法
				// 准备复制的源文件夹
				String dir1 = sourceDir + "\\" + file[i].getName();
				// 准备复制的目标文件夹
				String dir2 = targetDir + "\\" + file[i].getName();
				copyDirectiory(dir1, dir2);
			}
		}
	}
	/**
	 * 检测目录是否存在
	 * @param path  被检测目录
	 * @return		是否存在
	 */
	public static boolean isExists(String path){
		//创建文件对象
		File f =new File(path);
		//检测文件对象是否存在
		if(f.exists()){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 检测文件是否符合指定后缀名
	 * @param f  文件
	 * @param suffix 后缀名
	 * @return   是否符合后缀名
	 */
	public static boolean ismachSuffix(File f,String suffix){
		if(f.getName().endsWith(suffix)){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 逐行读入文本
	 * @param text   需要读入的文本的路径
	 * @return  一行一行的字符串集合
	 * @throws IOException
	 */
	public static List<String> readTextByLine(String text) throws IOException{
		br = new BufferedReader(new FileReader(new File(text)));
		List<String> textLines =new ArrayList<String>();
		String temp=new String();
		while(temp!=null){
			temp=br.readLine();
			textLines.add(temp);
		}
		br.close();
		return textLines;
	}
	/**
	 * 逐行写入文本中（用于写入日志文件）
	 * @param text   日志文件的目录
	 * @param sb     日志文本的缓冲
	 * @throws IOException
	 */
	public static void writeTextByLine(String text,StringBuilder sb) throws IOException{
		BufferedWriter bw =new BufferedWriter(new FileWriter(text));
		bw.write(sb.toString());
		bw.close();
	}

}
```

---

<small>PS: [TIME MAGIC](/series/time-magic/) 系列文章年代久远，无法保证其完全正确性。</small>


1.  <small>封面图来自：[砂時計](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=50862544) <small>
