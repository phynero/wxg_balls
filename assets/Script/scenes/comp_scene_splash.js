// var self = null
cc.Class({
    extends: cc.Component,

    properties: {
        userInfo : null
    },

    onLoad () {
        // self = this
    },

    start () {
        // this.getAuthSetting()
    },

    // getAuthSetting(){
    //     console.log("===== splash getAuthSetting()")
    //     wx.getSetting({
    //         success: function(res){
    //             if (res.authSetting['scope.userInfo']) {
    //                 console.log("res.authSetting userInfo ok")
    //                 // self.getUserInfo()
    //             }else{
    //                 console.log("res.authSetting userInfo not")
    //                 wx.authorize({
    //                     scope: 'scope.userInfo',
    //                     success() {
    //                         // self.getUserInfo()
    //                     }
    //                 })
    //             }
    //         },
    //         fail: function(res){
    //             // console.log("wx.getSetting  fail")
    //         },
    //         complete: function(res){
    //             // g_data.firstFlag = false
    //         }
    //     })
    // },
    // getUserInfo(){
    //     console.log("===== splash getUserInfo()")
    //     self.userInfo = {}
    //     wx.getUserInfo({
    //         success: function(res) {
    //             self.userInfo.nickName = res.userInfo.nickName
    //             self.userInfo.country = res.userInfo.country
    //             self.userInfo.city = res.userInfo.city
    //             self.userInfo.gender = res.userInfo.gender
    //             self.userInfo.avatarUrl = res.userInfo.avatarUrl
    //             self.userInfo.language = res.userInfo.language
    //             self.userInfo.province = res.userInfo.province
    //             self.getSystemInfo()
    //         }
    //     })
    // },
    // getSystemInfo(){
    //     console.log("===== splash getSystemInfo()")
    //     wx.getSystemInfo({
    //         success: function(res) {
    //             self.userInfo.platform = res.platform
    //             self.userInfo.brand = res.brand
    //             self.userInfo.model = res.model
    //             self.userInfo.system = res.system
    //             self.userInfo.windowHeight = res.windowHeight
    //             self.userInfo.windowWidth = res.windowWidth
    //             self.userInfo.screenHeight = res.screenHeight
    //             self.userInfo.screenWidth = res.screenWidth
    //             self.userInfo.pixRatio = 640 / res.windowWidth
    //             self.getWxcode()
    //         }
    //     })
    // },
    // getWxcode(){
    //     console.log("===== splash getWxcode()")
    //     wx.login({
    //         success: function(wxres) {
    //             if (wxres.code) {
    //                 console.log("  ========= "+wxres.code)
    //             }else{
    //             console.log('微信登录失败！' + wxres.errMsg)
    //             }

    //             cc.director.loadScene("maingame")
    //         }
    //     });
    // },
});
