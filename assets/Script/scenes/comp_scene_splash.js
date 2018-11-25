// appid
// wxa13bad66882314ba
// appkey
// ad3b1e33a767643835a052018ac1efdc
var g_data = require("globalData")
var n_data = require("nativeData")
var self = null
cc.Class({
    extends: cc.Component,

    properties: {
        userInfo : null
    },

    onLoad () {
        self = this
    },

    start () {
        setTimeout(function(){
            cc.director.loadScene("maingame")
        },3000)
    },
});
