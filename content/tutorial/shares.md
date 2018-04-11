+++
catalogues = ["教程"]
date = "2017-11-19T15:18:56+08:00"
draft = false
series = ["股票"]
tags = ["股票"]
thumbnail = "http://or30hhqjk.bkt.clouddn.com/timg.jpg"
thumbnail_absolute = true
thumbnail_qiniu = true
title = "获取近三年股票走势"

+++

<audio src="http://or30hhqjk.bkt.clouddn.com/%E6%9D%8E%E5%BF%97%20-%20%E7%B1%B3%E5%BA%97.mp3" autoplay="autoplay" loop="loop" controls="controls">

<div style="width:100px; display: inline;padding: 10px">
   <input type="text" id="input" style="width: 300px;" placeholder="请输入股票号码,例如sz002183">
    <button type="button" onclick="getCode()">确定</button>
</div>
<div style="width:100%;overflow:auto;margin-top:20px;">
  <div
    id="moniShare"
    style="min-width:500px;max-width:100%; height:500px;background-color:lightgray;color:white;">
  股票监控
  </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/3.7.2/echarts.js"></script>
<script src="/js/shares.js"></script>