getVbData(function (data) {
    drawEcharts(
        document.getElementById('moniS91201El'),
        extractForEcharts(data, 'S9-1201'),
        {
            title: {
                text: 'S9-1201',
                subtext: '微比特云矿机合约预售状态监控，来自 dddog.com.cn - 大刀分享站'
            }
        }
    )
    drawEcharts(
        document.getElementById('moniL31201El'),
        extractForEcharts(data, 'L3-1201'),
        {
            title: {
                text: 'L3-1201',
                subtext: '微比特云矿机合约预售状态监控，来自 dddog.com.cn - 大刀分享站'
            }
        }
    )
}, function (error) {
    console.error(error)
})

function getVbData (callback, errorCb) {
    var headEl = document.getElementsByTagName('head')[0]
    var scriptEl = document.createElement('script')

    window.jsonpCallback = function (result) {
        window.jsonpCallback = null
        headEl.removeChild(scriptEl)
        if (result.code === '200') {
            callback(result.res)
        } else {
            errorCb(result)
        }
    }
    scriptEl.type ='text/javascript'
    scriptEl.src = 'http://api.dddog.com.cn/vb?token=dddog123&callback=jsonpCallback'
    headEl.appendChild(scriptEl)
}

function extractForEcharts (data, name) {
    var result = []

    for (var i = 0; i < data.length; i++) {
        var item = data[i]
        var needData = _get(item, name)
        var dateTime = item.time.replace('T', ' ').slice(0, -8).replace('43', '00').replace('37', '00')
        var price = needData.price
        var btc =  needData.btc
        var bcc =  needData.bcc
        var rest =  needData.left
        var publishDate = needData.date

        result.push([dateTime, rest, price, btc, bcc, publishDate])
    }

    return result

    function _get (item, name) {
        for (let j = 0; j < item.data.length; j++) {
            if (item.data[j].name === name) return item.data[j]
        }
    }
}

function drawEcharts (el, data, option) {
    var chart = echarts.init(el)
    var resizeTimer = null
    var option = {
        title: {
            text: option.title.text,
            subtext: option.title.subtext,
        },
        tooltip : {
            trigger: 'axis',
            formatter: function (params) {
                var data2=[]
                for(var i=0,len=data.length; i<len; i++){
                    data2.push(data[i][1])
                }
                return '时间：' + params[0].data[0] + '</br>'
                    + '剩余份额：' + params[0].data[1] + '</br>'
                    + '价格：$' + params[0].data[2] + '</br>' + ''
                    + params[0].data[3] + '</br>' + ''
                    + params[0].data[4] + '</br>'
                    + '收益起算日：' + params[0].data[5]
            }
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true },
            }
        },
        legend: { data: [{ name: '剩余份额' }] },
        grid: { y2: 80 },
        xAxis: [ { type: 'category', splitNumber: 10, name: '时间',
            data:(function () {
                var data1 = [];
                for(var i=0,len=data.length; i<len; i++){
                    data1.push(data[i][0])
                }
                return data1
            })()
        }],
        yAxis: [ { type : 'value',
            min: function (value) {
                // 曲线高度占3/5
                return Math.round(value.min - (value.max - value.min) / 3)
            }
        }
        ],
        dataZoom: [ { type: 'inside', xAxisIndex: 0, start: 60, end: 100, minSpan: 30 },
            { type: 'slider', xAxisIndex: 0, start: 60, end: 100 }
        ],
        series: [ { name: '剩余份额', type: 'line', showAllSymbol: true, smooth:true,
            symbolSize: function (value){
                return Math.round(Math.random() * 3 + 1)
            },
            data: (function () { return data })()
        }
        ]
    }

    chart.setOption(option)
    window.addEventListener('resize', function () {
        if (resizeTimer) return
        resizeTimer = setTimeout(function () {
            chart.resize()
            resizeTimer = null
        }, 300)
    })
}
