+++
catalogues = ["教程"]
date = "2014-10-10T23:21:00+08:00"
draft = false
series = ["TIME MAGIC"]
tags = ["源代码", "数据结构", "矩阵", "Java"]
thumbnail = "//orbr3yvrc.bkt.clouddn.com/50862544_p0.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "使用简单工厂与模版方法实现普通矩阵与稀疏矩阵的矩阵转置、矩阵加法与矩阵乘法的 Java 源代码"
description = "矩阵稀疏矩阵(Java),三元组表压缩存储稀疏矩阵实现稀疏矩阵的快速转置,java稀疏矩阵快速转置,数据结构_稀疏矩阵转置(trans_sparse_matrix)"
+++

---

## 1. 首先，我们先看下要实现的功能。我比较喜欢自顶向下的设计。

```java
package com.mikuscallion.matrix;

/**
 *矩阵应用类的用户接口
 * @author MIKU
 *
 */
public interface IMatrix {
	/**
	 * 转置矩阵
	 * @param matrix 二维数组矩阵
	 * @return 转置后的二维数组矩阵
	 */
	double[][] transpose(double [] []matrix);
	/**
	 * 矩阵加法
	 * @param matrixA
	 * @param matrixB
	 * @return
	 */
	double[][] add(double [] []matrixA,double [] []matrixB);
	/**
	 * 矩阵乘法
	 * @param matrixA
	 * @param matrixB
	 * @return
	 */
	double[][] multiply(double [] []matrixA,double [] []matrixB);
}

```

我的目的就是提供矩阵转置，矩阵加法，矩阵乘法这三个接口。对于普通矩阵使用普通矩阵的系列方法，对于稀疏矩阵使用稀疏矩阵系列方法。这里运用到了简单工厂，使得客户端不必显示指定矩阵类型。

## 2. 矩阵抽象类

```java
package com.mikuscallion.matrix;

/**
 * 抽象矩阵类
 * @author MIKU
 *
 */
public abstract class Matrix {

 /**
  * 将当前矩阵字段转换成标准二维数组矩阵
  * 并返回
  * @return
  */
 public abstract double[][] toNormalMatrix();
 /**
  *将具体矩阵类中的矩阵字段进行转置
  * @return
  */
 public abstract double[][] doTranspose();
 /**
  * 以具体矩阵类中的矩阵字段作为A
  * 加上
  * 作为参数传入的矩阵B
  * @param bMatrix
  * @return
  */
 public abstract double[][] doAdd(Matrix matrixB);
 /**
  *
  * @param matrixB
  * @return
  */
 public abstract double[][] doMultiply(Matrix matrixB);
 public double[][] add(Matrix a, Matrix b) {
  MatrixFilter mf =new MatrixFilter();
  double [][]result = null;
  if(mf.canAdd(a, b)){
   result=doAdd(b);
  }
  return result;
 }
 public double[][] multiply(Matrix a, Matrix b) {
  MatrixFilter mf =new MatrixFilter();
  double [][]result = null;
  if(mf.canMultiply(a, b)){
   result=doMultiply(b);
  }
  return result;
 }
}
```

在矩阵抽象类中，运用模板方法。在基类中做掉了，非法矩阵的过滤，而具体实现矩阵操作这延迟给子类。

## 3. 具体矩阵类 - 正常矩阵

```java
package com.mikuscallion.matrix;

/**
 * 具体矩阵类之
 * 正常矩阵
 * @author MIKU
 *
 */
public class NormalMatrix extends Matrix {
	//普通矩阵，直接使用二维数组存储矩阵数据
	private double [][] data =null;
	public NormalMatrix(double [][] matrix){
		this.data=matrix;
	}
	@Override
	public double[][] toNormalMatrix() {
		return data;
	}
	@Override
	public double[][] doTranspose() {
		return temp;
	}

	@Override
	public double[][] doAdd(Matrix matrixB) {
	}
	@Override
	public double[][] doMultiply(Matrix matrixB) {

	}
}
```

## 4. 具体矩阵类 - 稀疏矩阵

```java
package com.mikuscallion.matrix;

import java.util.ArrayList;
import java.util.List;

/**
 * 具体矩阵类之 稀疏矩阵
 *
 * @author MIKU
 *
 */
public class SparseMatrix extends Matrix {
	// 稀疏矩阵使用一个三元组集合储存数据
	private List<TriNode> data = null;
	// 原矩阵信息
	private int m, n;

	public SparseMatrix(double[][] matrix) {
	}

	@Override
	public double[][] toNormalMatrix() {
		return toNormalMatrix(this.data,this.m,this.n);
	}

	@Override
	public double[][] doTranspose() {

	}

	@Override
	public double[][] doAdd(Matrix matrixB) {
	}

	@Override
	public double[][] doMultiply(Matrix matrixB) {

	}
}

// 三元组内部类
class TriNode {
	public int row;
	public int col;
	public double value;

	public TriNode(int row, int col, double value) {
		super();
		this.row = row;
		this.col = col;
		this.value = value;
	}
}
```

## 5. 最后

普通矩阵的操作方法此处省略，我觉得稀疏矩阵的操作还是比较复杂的（下面补充），难点在，为什么这样做好，怎么想到这么做的。单纯模仿固然不难，但是那坑爹的数据结构教程是用 C++ 写的，把她好好理解后，换 Java 写也是可以的。

```java
@Override
	public double[][] doTranspose() {
		// 辅助数组
		// 转置前，原矩阵每列的非0元素个数
		int[] rowSize = new int[n];
		int[] rowStart = new int[n];
		// 计算辅助数组
		for (TriNode tn : data) {
			// System.out.println(tn.col);
			rowSize[tn.col]++;
		}
		rowStart[0] = 0;
		for (int i = 1; i < n; i++) {
			rowStart[i] = rowStart[i - 1] + rowSize[i - 1];
		}
		List<TriNode> trans = new ArrayList<TriNode>(this.data);
		for (TriNode n : data) {
			// 直接转置调换
			TriNode temp = new TriNode(n.col, n.row, n.value);
			// 获得存储位置
			int index = rowStart[temp.row];
			trans.set(index, temp);
			rowStart[temp.row]++;
		}
		return toNormalMatrix(trans,this.n,this.m);
	}
```

```java
@Override
	public double[][] doAdd(Matrix matrixB) {
		// 转换matrixB为稀疏矩阵
		SparseMatrix smb = new SparseMatrix(matrixB.toNormalMatrix());
		List<TriNode> result = new ArrayList<TriNode>();
		int i = 0, j = 0;
		while (i < this.data.size() && j < smb.data.size()) {
			int indexA = n * this.data.get(i).row + this.data.get(i).col;
			int indexB = n * smb.data.get(j).row + smb.data.get(j).col;
			if (indexA < indexB) {
				result.add(this.data.get(i));
				i++;
			} else if (indexA > indexB) {
				result.add(smb.data.get(j));
				j++;
			} else {
				result.add(new TriNode(this.data.get(i).row,
						this.data.get(i).col, this.data.get(i).value
								+ smb.data.get(j).value));
				i++;
				j++;
			}
		}
		// 复制剩下的元素
		for (; i < this.data.size(); i++) {
			result.add(this.data.get(i));
		}
		for (; j < smb.data.size(); j++) {
			result.add(smb.data.get(j));
		}
		return toNormalMatrix(result,this.m,this.n);
	}
```
```java
@Override
	public double[][] doMultiply(Matrix matrixB) {
		List<TriNode> result =new ArrayList<TriNode>();
		// 将b矩阵转化为稀疏矩阵并且创建辅助数组
		SparseMatrix smb = new SparseMatrix(matrixB.toNormalMatrix());
		// 重新计算辅助数组
		int[] rowSize = new int[smb.m + 1];
		int[] rowStart = new int[smb.m + 1];
		for (TriNode tnb : smb.data) {
			rowSize[tnb.row]++;
		}
		rowStart[0] = 0;
		for (int i = 1; i < rowStart.length; i++) {
			rowStart[i] = rowStart[i - 1] + rowSize[i - 1];
		}
		for (int resultRow = 0; resultRow < this.m; resultRow++) {
			// 对a稀疏矩阵做遍历
			double[] temp = new double[smb.n];
			for (TriNode tna : this.data) {
				if(resultRow==tna.row){
				// 取出区间
				for (int i = rowStart[tna.col]; i < rowStart[tna.col + 1]; i++) {
					// 利用i
					TriNode tnb = smb.data.get(i);
					temp[tnb.col] = temp[tnb.col] + tna.value * tnb.value;
				}
				}
			}
			//将temp存入result
			for(int t=0;t<temp.length;t++){
				if(temp[t]!=0){
					TriNode tn =new TriNode(resultRow, t, temp[t]);
					result.add(tn);
				}
			}
		}
		return toNormalMatrix(result,this.m,smb.n);
	}

```

---

<small>PS: [TIME MAGIC](/series/time-magic/) 系列文章年代久远，无法保证其完全正确性。</small>


1.  <small>封面图来自：[砂時計](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=50862544) <small>
