+++
catalogues = ["随笔"]
date = "2018-04-05T11:00:00+08:00"
draft = false
series = ["share"]
keyword = ["兴趣", "微信小程序", "wescale", "音阶训练"]
tags = ["分享", "随笔"]
thumbnail = "http://p5uhbmr9q.bkt.clouddn.com/wescale.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "WeScale 技术篇 —— mpvue 与微信小程序的火花"
description = "WeScale 是一款音阶（乐理）训练小程序，提供多种训练模式来帮助记忆相关知识，希望对音乐初学者能有所帮助。"
author = "JackLiu"
+++

## 介绍

### 项目介绍
WeScale 定位为音乐训练小程序，初期规划了基础音阶的三个训练，以及他们的镜像模式。

- 数字简谱
- 字母简谱
- 数字简谱对字母简谱

后期看情况更新追加其他训练。

### 产品展示
扫描下方小程序码或在微信小程序中搜索 WeScale，即可使用。
<!-- ![](http://p5uhbmr9q.bkt.clouddn.com/gh_f96575da2c8b_860.jpg) -->
<div><img src="http://p5uhbmr9q.bkt.clouddn.com/gh_f96575da2c8b_1280.jpg" width="50%" height="50%"></div>

### 人员介绍

- [Myou Aki](https://github.com/Akimyou)：明神，北漂前端，总有奇奇怪怪的想法想要实现，适合做产品的前端

- [Dr.Chan](https://github.com/isdrchan)：老陈，后端、前端通吃，长得帅说话又好听的茂名吃货

- [Jackliu](https://github.com/Jackliu007888)：大坚，产品、伪前端，不想做前端的产品不是好司机

## 缘起

明神每晚都要练着他的电吉他，敲着他的木鱼，突然一道光在脑海中闪过，机智的他迅速捕获到，当晚凌晨三点做完了这次小程序的原型。

之前和老陈搞了个 [A股股票助手 --- stock-helper](https://github.com/Jackliu007888/stock-helper) ，这次有明神带路，我们都想积累点小程序开发的经验，于是我和老陈就上车了。（滴~~学生卡）

恰逢美团刚刚开源了 [mpvue](https://github.com/Meituan-Dianping/mpvue)，短短几周就迅速获得几千个 star，在 mpvue 开源前，最流行的应该是 [wepy](https://github.com/Tencent/wepy) 。据说用 mpvue，能够像德芙一样顺滑地使用 vue 写微信小程序，于是我们开始了踩坑之路。

## 项目统计
预计一周完成，毕竟是大家都有正经事要做，硬是拖到了两周才完成。四个分支，总计提交 51次，越到 deadline 提交越多，目前已发布 v1.0.0 版本，已审核上线。
![](http://oqzceoiaz.bkt.clouddn.com/repo.png)

## 踩到的坑

- 微信小程序不能使用本地资源

这个坑很常见，微信小程序不支持本地引用图片、音频、视频，所以需要外链。对于图片还可以使用 Base64 编码，直接在 html 或 css 中引用。根据图片根据图片体积或者可维护性考虑，酌情使用外链或者Base64编码。

- 新增页面需要 npm run dev

这个是 mpvue 的问题。[常见问题](http://mpvue.com/qa/)可以发现。解决的方法就是手动 npm run dev 一下。

- 生命周期问题

mpvue 是兼容微信小程序的生命周期与 vue 的生命周期，也就是 vue 实例会接管小程序 Page 实例的生命钩子，因此需要使用到小程序的生命周期钩子时，可将相应的钩子方法定义在 vue 实例中，如定义当前Page的分享标题内容图片：
```js
new Vue({
  data () {
    return {
      score: ''
    }
  },
  onShareAppMessage (res) {
    return {
      title: '我获得 ' + this.score + ' 分，快来一起掌握基础音阶知识吧！',
      path: '/pages/index/index',
      imageUrl: 'https://wechat.dddog.com.cn/static/wescale.jpg'
    }
  }
})
```
这个不知道如何描述，大致是非当前页面的 create() 会在当前页面执行，解决方法，用小程序的 onload()/ vue 的 mounted()，遇到问题看图就好：

![lifecycle](http://mpvue.com/assets/lifecycle.jpg)

- Class 与 Style 绑定

不支持 [vue 官方文档：Class 与 Style 绑定](https://cn.vuejs.org/v2/guide/class-and-style.html)中的 classObject 和 styleObject 
语法。
暂不支持在组件上使用 Class 与 Style 绑定

不支持就不用咯~

- 没有 BOM／DOM 操作

mpvue 使得开发者可以使用标准 html、css 去编写小程序，当我们查看 mpvue 项目中的 dist 文件夹时可以发现，编写的 html、css 被解析成了小程序的 wxml、wxss ，固然小程序的运行环境也就是非标准的 WebView 了。因此我们web开发进行经常使用的 browser、navigator 实例自然是无法使用了，取而代之的是使用小程序浏览器提供的API —— wx实例去操作native元素。至于 DOM 操作，即使在vue中也是不建议使用的，还是用数据驱动去转化吧。也就是说所有关于 BOM / DOM 的操作都不行。用 vue 第三方 UI库时要注意， Dom 和 Bom 相关的 API 操作都无法实现。
解决方案： 这块主要是动画不能用，那就用 css3 咯~

- 组件名不要和微信的组件名重名

试着写一个 swicth 的组件，发现渲染结果不对，查了原因才发现，微信小程序也有个 switch 的组件。
解决方案： 改名字啊。命名规范！

- 微信小程序多声道

按正常的套路去使用小程序的 api —— [wx.createInnerAudioContext()](https://developers.weixin.qq.com/miniprogram/dev/api/createInnerAudioContext.html) 是无法创建多声道的。本次技术的难点也在于如何创建微信小程序的多声道。查了一圈的资料，关于这点的资料甚少。查到一篇[博客](https://blog.csdn.net/weixin_41710574/article/details/79256935)，通过创建多个 innerAudioContext 实例化对象，轮流调用的方式。对于原作者说小程序只能同时存在5个音频实例这一定，不敢苟同。毕竟我直接创建了 30个都没问题，哈哈
``` js
const audioContextNum = 30
let globalAudioContext = Array.from({ length: audioContextNum },
  (v, k) => wx.createInnerAudioContext())
```

如何寻找当前可用的声道，也是个难点，大致的思想是，把正在播放的实例封锁，待实例的 onEnded() 回调执行时取消封锁，使用时需要遍历所有实例，寻找当前可用的实例，看实例代码(与实际代码有删改)：

``` js
// 自动寻找一个当前可用的 audioContext 实例
export function playedMusic (url) {
  let contextList = store.getters.globalAudioContext

  while (contextList !== store.getters.audioContextStatus.map(item => item === false).length) {
    let audioContextStatus = store.getters.audioContextStatus
    let index = store.getters.currentAudioIndex
    // 如果当前可用，封锁
    if (audioContextStatus[index]) {
      store.commit('setAudioContextStatus', {index, status: false})
      break
    } else {
      // 否则 ++index
      store.commit('setCurrentAudioIndex', ++index)
    }
  }

  const resultPromise = new Promise((resolve, reject) => {
    contextList[index].onPlay(() => {})
    contextList[index].onError((res) => {
      reject(res)
    })
    contextList[index].onEnded((res) => {
      reset(resolve)
    })
  })

  return resultPromise
}
```

- 微信小程序的缓存

实际开发过程中发现。如果不预先对音频进行缓存，实际播放时会有一定的延迟，视网络情况。解决方案是先预加载，然后存在小程序的缓存中，官网介绍缓存有 10 M，足够用了。
首先是下载文件 wx.downloadFile()，得到 tempFilePath，再把临时文件保存为本地文件 wx.saveFile(),得到 savedFilePath，再将本地文件的的路径保存在缓存中 wx.setStorage()。这么多异步操作，当然用 Promise 再封装一下啦。

多文件的下载、保存、缓存, 回调、递归的思想：
``` js
  // 加载资源, 加载完隐藏loading
  _load(0, () => {
    // 更改Audio.js的config对象属性。
    config.musicUrl = JSON.parse(musicUrlTemp)

    const temp = JSON.parse(musicUrlTemp)
    temp.tempVerison = tempVerison
    wx.setStorage({key: 'musicUrl', data: temp})
    wx.hideLoading()
  })
  function _load (index, callback) {
    if (!musicUrlArr[index]) {
      callback()
    } else {
      downloadFile(musicUrlArr[index]).then((tempFilePath) => {
        saveFile(tempFilePath).then((savedFilePath) => {
          musicUrlTemp = musicUrlTemp.replace(
            musicUrlArr[index],
            savedFilePath
          )
          index++
          _load(index, callback)
        })
      })
    }
  }
```

缓存是否存在及缓存版本的判断：

``` js
  // 判断是否已有缓存且缓存版本正确
  if (temp && temp.tempVerison === tempVerison) {
    return false
  }
```

- 全局变量

遇到很多需要全局变量，特别是状态的，最好统一管理。vue 的 [vuex](https://vuex.vuejs.org/zh-cn/intro.html) 是专为 Vue.js 应用程序开发的状态管理模式。使用过程遇到的坑是无法使用它的辅助函数 mapState、 mapGetters、 mapActions、 mapMutations 等。看下 mpvue 的 [issue](https://github.com/Meituan-Dianping/mpvue/issues/35#issuecomment-376843361) 感觉是 mpvue 的问题。
解决方案： 用最原始的 store.commit()、 store.getter

- 数据分析及合法域名

调用微信小程序的网络请求 wx.request()、 wx.downloadFile() 之类 都需要 https 协议。 调微信的数据分析还要隔两个小时获取 access_token, 这些就是要服务器端的配置了。

条件： 域名及域名证书、服务器

获取 token 及 服务器写接口返回静态文件及微信的数据分析接口 可以参考[这个](https://coding.net/u/jackliu007888/p/wechat-server), node.js 写的，写的很随意，随便看看。

- ES6 的模块动态引用

参考[博客](https://www.cnblogs.com/unclekeith/archive/2017/10/17/7679503.html):

1. ES6 模块中的值属于【动态只读引用】。只说明一下复杂数据类型。
2. 对于只读来说，即不允许修改引入变量的值， import 的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到 import 命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
3. 对于动态来说，原始值发生变化， import 加载的值也会发生变化。不论是基本数据类型还是复杂数据类型。

``` js
// b.js
export let counter = {
  count: 1
}
setTimeout(() => {
  console.log('b.js-1', counter.count)
}, 1000)

// a.js
import { counter } from './b.js'
counter = {}
console.log('a.js-1', counter)

// Syntax Error: "counter" is read-only
```

虽然不能将 counter 重新赋值一个新的对象，但是可以给对象添加属性和方法。此时不会报错。这种行为类型与关键字 const 的用法。

``` js
// a.js
import { counter } from './b.js'
counter.count++
console.log(counter)

// 2
```

### 致谢
致谢所有参与产品、开发、测试，贡献出创意想法与建议的小伙伴。

我们有个小团队，自嘲为“咸鱼科技”，谁说咸鱼不能有梦想，哈哈。我们还需要 UI、运营等，如果你有想法、有创意、有技能可以加入我们的小团队！2333~