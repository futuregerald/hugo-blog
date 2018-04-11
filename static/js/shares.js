function getCode() {
    var code = document.getElementById('input').value || 'sh600519'
    if (code && code.length > 6 && code.length <= 8) {
        // http://api.dddog.com.cn/proxy/shares/akdaily?code=sz002183&type=last
        var kind = 'akdaily'
        var baseUrl = "http://api.dddog.com.cn/proxy/shares"
        var url = baseUrl + '/' + kind + '?code=' + code + '&' + 'type=last'
        loadXMLDoc(url, function (data) {
            drawEcharts(
                document.getElementById('moniShare'),
                dataCantrol(JSON.parse(data).record, code).result, 
                dataCantrol(JSON.parse(data).record, code).allDay, {
                    title: {
                        text: code,
                        subtext: '股票监控 -- 来自 dddog.com.cn - 大刀分享站'
                    }
                }
            )
        })
    } else {
        alert("请输入正确的股票代码")
    }

}
getCode()

function loadXMLDoc(url, cb) {
    var xmlhttp, jsonData
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest()
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            jsonData = xmlhttp.responseText
            return cb(jsonData)
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function dataCantrol(data, name) {
    var result = [],
        allDay = []
    var years = [2014, 2015, 2016, 2017]
    for (let j = 0; j < years.length; j++) {
        var temArr = []
        for (var i = 0; i < data.length; i++) {
            if (data[i][0].slice(0, 4) == years[j]) {
                var date = data[i][0].slice(5)
                var open = data[i][1]
                var high = data[i][2]
                var close = data[i][3]
                var low = data[i][4]
                var chg = data[i][5]
                var p_chg = data[i][6]
                var ma5 = data[i][7]
                var ma10 = data[i][8]
                var ma20 = data[i][9]
                var vma5 = data[i][10]
                var vma10 = data[i][11]
                var vma20 = data[i][12]
                var turnover = data[i][13]
                temArr.push([date, open, close])
                var isExist = false
                for (var k = 0; k < allDay.length; k++) {
                    if (allDay[k] == date) {
                        isExist = true
                    }
                }
                if (!isExist){
                    allDay.push(date)
                }
            }
        }
        result.push(temArr)
    }
    var allDay = allDay.sort()
    return {result,allDay}
}

function drawEcharts(el, data,date, option) {
    // console.log(data)
    var chart = echarts.dispose(el)
    var chart = echarts.init(el)
    var resizeTimer = null
    var option = {
        title: {
            text: option.title.text,
            subtext: option.title.subtext,
        },
        tooltip: {
            trigger: 'axis',
        },
        toolbox: {
            show: true,
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                },
            }
        },
        legend: {
            data: [{
                name: '2015股价走势'
            },{
                name: '2016股价走势'
            },{
                name: '2017股价走势'
            }]
        },
        grid: {
            y2: 80
        },
        xAxis: [{
            type: 'category',
            splitNumber: 10,
            name: '时间',
            data: (function () {
                return date
            })()
        }],
        yAxis: [{
            type: 'value',
            // min: function (value) {
            //     // 曲线高度占3/5
            //     return Math.round(value.min - (value.max - value.min) / 3)
            // }
        }],
        dataZoom: [{
                type: 'inside',
                xAxisIndex: 0,
                start: 80,
                end: 100,
                minSpan: 15
            },
            {
                type: 'slider',
                xAxisIndex: 0,
                start: 60,
                end: 100
            }
        ],
        series: [{
            name: '2015股价走势',
            type: 'line',
            data: (function () {
                return data[1]
            })()
        },{
            name: '2016股价走势',
            type: 'line',
            data: (function () {
                return data[2]
            })()
        },{
            name: '2017股价走势',
            type: 'line',
            data: (function () {
                return data[3]
            })()
        }]
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