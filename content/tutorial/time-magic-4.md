+++
catalogues = ["教程"]
date = "2014-07-24T19:05:00+08:00"
draft = false
series = ["TIME MAGIC"]
tags = ["源代码", "Mysql", "Java"]
thumbnail = "//orbr3yvrc.bkt.clouddn.com/50862544_p0.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "连接 MySql 数据库工具类 Java 源码"
description = "java连接MySQl数据库实例代码_java,java连接mysql数据库的方法_java,Java通过JDBC连接Mysql数据库_java, java使用jdbc连接数据库工具类,java连接Mysql数据库的工具类_java"
+++

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


/**
 * 这个jdbc的一个类库，超级好用
 * 跟了我做了多个数据库项目
 * @author MIKUScallion
 *
 */
public class MyJdbc {
	/**
	 * 获取java的sql的连接对象
	 * @param driver   数据库驱动器路径
	 * @param url        数据库连接地址
	 * @param user     用户名
	 * @param password    密码
	 * @return            java的sql的连接对象
	 */
	public static Connection getSqlConnection(String driver,String url,String user,String password){
		try {
			//1.加载数据库驱动程序
			Class.forName(driver);
			//2.获取数据库连接（java）对象
			Connection connection=DriverManager.getConnection(url,user,password);
			//返回
			return connection;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 运行查询sql语句
	 * @param sql  查询sql语句
	 * @param conn  java的sql链接对象
	 * @return        结果集
	 */
	public static ResultSet runQuerySql(String sql,Connection conn){
		try {
			Statement state =conn.createStatement();
			ResultSet rs=state.executeQuery(sql);
			return rs;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 运行更新sql语句
	 * @param sql  更新sql语句
	 * @param conn  java的sql链接对象
	 * @return        影响记录数目
	 */
	public static int runUpDateSql(String sql,Connection conn){
		try {
			Statement state =conn.createStatement();
			int num =state.executeUpdate(sql);
			return num;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}
}
```

---

<small>PS: [TIME MAGIC](/series/time-magic/) 系列文章年代久远，无法保证其完全正确性。</small>


1.  <small>封面图来自：[砂時計](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=50862544) <small>
