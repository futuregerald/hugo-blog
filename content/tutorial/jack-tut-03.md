+++
catalogues = ["教程"]
date = "2017-09-25T00:51:00+08:00"
draft = false
author = "JackLiu"
series = ["NodeJs"]
tags = ["自动部署"]
thumbnail = "http://oqzceoiaz.bkt.clouddn.com/cyx-09.jpeg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = " 利用Nodejs实现WebHook自动部署git项目"

+++

<audio src="http://oqzceoiaz.bkt.clouddn.com/%E6%9D%AD%E5%B7%9E_%E6%9D%8E%E5%BF%97.mp3" autoplay="autoplay" loop="loop" controls="controls">
您的浏览器不支持 audio 标签。
</audio>

>年纪大了，有些事可以忘记，有些事还是记下吧

## 需求背景

如果你有代码托管在git托管网站上，比如说全球最大的同性交友网站[GitHub](https://github.com/),国内的有[开源中国](https://gitee.com/)、[Coding](https://coding.net/)等等。因为程序员总想偷懒，想要实现部署代码到生产环境的服务器，都要让代码自己干活。下面以Coding为例，利用Nodejs来实现自动部署。

## 准备工作

- 在Coding上有一个私有仓库
- 安装了web服务的服务器
- NodeJs环境
- 以上自行处理，如有问题概不负责！2333

![](http://oqzceoiaz.bkt.clouddn.com/cyx-10.jpeg)

## 服务器端

远程登陆服务器。ps(我偷懒，以下命令均以root用户实现)

### 生成git用户公钥（git clone 时需要认证）

~~~
ssh -keygen -t rsa -C "yourEmailName@XXX.com"
# 然后一直回车就行了
# 生成的文件一般在 /root/.ssh/id_rsa  目录
~~~

### 添加用户公钥

复制/root/.ssh/id_rsa.pub内容到个人设置页的SSH公钥里添加即可。[点这里直接到](https://coding.net/user/account/setting/keys)

### 修改git配置和保存git用户名密码

~~~
git config --global credential.helper store # 永久保存
git config --global user.name "Bantes"
git config --global user.email "xxx@xxx.com" # 邮箱请与conding上一致
~~~

### 准备钩子文件
钩子文件可以用世界上最好的语言PHP写，也可以用Ruby啊，之类写。我这里用Node.js，为什么？基友机神强烈要求。。后面发现好处在于不用像PHP一样新建一个部署用的用户，再去生成它的公钥，还有，这个钩子写在哪都也可以。

Coding上给出了[示例代码，see一下](https://open.coding.net/webhooks/code/#nodejs-示例代码)

~~~
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var process = require('child_process');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data


app.post('/webhook', function(req,res){
    console.log('print', req.body);
    console.info(req.body["token"]);
    if('xxx' === req.body['token'] ){
    # 1、把xxx改成你在Coding设置的token
    console.info(process);
    process.exec('git pull', {'cwd':'/home/coding/workspace'},
            # 2. 设置下代码部署在服务器的位置
            function (error, stdout, stderr) {
                console.log('stdout========================\n' + stdout);
                console.log('stderr========================\n' + stderr);
                if (error !== null) {
                    res.send('<pre>fail!!!\n' + stdout + error + '</pre>');
                } else {
                    res.send('<pre>done!!!\n' + stdout + '</pre>');
                }
            });
    } else {
        console.log(' failed token ')
        res.send('<pre>token不正确?</pre>');
    }
});

app.set('port', 8080);

var server = app.listen( 8080, function() {
    console.log('Listening on port %d', server.address().port);
})
~~~


有人看到这段代码又要mmp了，官网给的示例代码竟然有错！！
重复引入multer、body-parser。扣工资！能不能想我一样心思缜密心灵手巧:)

![](http://oqzceoiaz.bkt.clouddn.com/cxy-11.jpg)


大概意思，我翻译一下，就是引入express模块，body-parser模块，multer模块，child_process模块，然后去解析Coding发来的post请求。如果你设置的token跟请求的token对应了，那么执行git pull操作，否则response token不正确。最后起一个8080端口的服务器，并监听它。道理我都懂，可是如何去做？忍不住又是一个mmp。

![](http://oqzceoiaz.bkt.clouddn.com/cxy-02.jpg)

别急，有代码了还不会写，我神哥忍不住就是一巴掌。


### 开撸

上面说了这个钩子是监听8080端口，所以跟你放哪个目录没多大关系。所以找个地方。新建个文件夹，再新建个js文件，像这样：

~~~
mkdir mmp
cd mmp
vim cptbtptp.js
~~~

先把代码拷贝进去再说。
然后需要对代码进行小小改动。标记在上面源码了

1. 设置下token：把token设置为你在Coding设置的token

2. 设置下代码部署在服务器的位置: 这里设置的位置在 /home/coding/workspace 这个根据实际设置就好了

3. 非必须修改项。比如8080端口被占用啦，安全组没开启8080端口啦，可以把8080改成可以用的端口。用下面的命令，查看端口没被占用且该端口安全组开放就行。

~~~
netstat -ntlp
~~~

改完代码 :wq 退出，运行下cptbtptp.js。一定会报错啦。。没装依赖包。

### 安装依赖包

项目目录下没有package.json这个文件。可以使用npm init -f命令生成一下

然后安装需要的包并保存在package.json中
~~~
npm install express --save
npm install body-parser --save
npm install multer --save
npm install child_process --save
~~~

然后

~~~
node cptbtptp.js
~~~
跑起来不报错就行。


调试这么跑可以，退出登录就结束进程了，因此要给它来个进程守护~~天使~~。

~~~
npm install -g forever
~~~

> 你说forever有多远？

~~~
forever start  -l mmp.log cptbtptp.js
~~~
安装forever进程守护，并让NodeJs跑起来，输出的日志默认在~/.forever/mmp.log,所以还要跟踪日志：

~~~
tail -f ~/.forever/mmp.log
~~~


再去Coding项目的WebHook设置中添加url。这里的url应该是 http://youwebsite.com:8080/webpack 。注意需要指定端口号，并且代码监听的是 /webhook目录。再设置token与钩子中一致就好。用test测试是否跑通。



## 初始化
先要在服务器上clone一次，以后就能开开心心的自动部署了：

~~~
git clone git@git.coding.net:XXXXXX.git
~~~

# 最后在coding上提交代码看是否自动部署。一般长得~~像我一样~~帅的都能成功！

![](http://oqzceoiaz.bkt.clouddn.com/cxy-01.jpg)

1.  <small>背景音乐来自：[杭州-李志](http://oqzceoiaz.bkt.clouddn.com/%E6%9D%AD%E5%B7%9E_%E6%9D%8E%E5%BF%97.mp3) <small>