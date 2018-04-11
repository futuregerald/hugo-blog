var authorList = {
    oll:[ {
        name: '支付宝(小蕾蕾)',
        content: 'HTTPS://QR.ALIPAY.COM/FKX09063SLBFS0JDLZ224F',
        desc: "支付宝打赏",
        className: "alipay",
        logo: ""
    },{
        name: '微信（***蕾）',
        content: 'wxp://f2f0yURxzTx9QaQZTYI_QypLoEQBQtwoT-w0',
        desc: "微信打赏",
        className: "wechat",
        logo: ""
    }],
    jackliu: [{
        name: '支付宝(大ai奕神)',
        content: 'HTTPS://QR.ALIPAY.COM/FKX04775JJLPLHW03GV321',
        desc: "支付宝打赏",
        className: "alipay",
        logo: ""
    },{
        name: '微信(大ai奕神)',
        content: 'wxp://f2f0FQyMGuEt3K-YvCtxx0Vu8A-XS3X92uE7',
        desc: "微信打赏",
        className: "wechat",
        logo: ""
        },
    ],
    gnxlt: [{
        name: '支付宝(林涛)',
        content: 'HTTPS://QR.ALIPAY.COM/FKX03012B3KEXYPFYBWT59?t=067SW',
        desc: "支付宝打赏",
        className: "alipay",
        logo: ""
    }, {
        name: '微信(**涛)',
        content: 'wxp://f2f0vnMEb-eWPS-lPczx_BF5P_G058DRe5_S',
        desc: "微信打赏",
        className: "alipay",
        logo: ""    
    }]
}

authorConfig = authorList[getAuthor()]
config = {
    appendName: "#dgAward",
    logoImage: "",
    showMes: '"If it can help you，you may buy me a coffee :)"',
    hideMes: '您的赞赏，是我创作的最大鼓励!',
    listConfig: authorConfig
}

dgAward.init(config)
    
function getAuthor() {
    var author = 'JackLiu'
    if (document.getElementById("auPa").children.length > 2) {
        author = document.getElementById("auPa").children[0].innerText || "JackLiu";
    }

    var isChineseName = true
    for (i = 0; i < author.length; i++) {
        if (author.charCodeAt(i) <= 256) {
            isChineseName = false;
        }
    }
    if (!isChineseName) {
        author = author.toLowerCase()
    }
    return author
}

