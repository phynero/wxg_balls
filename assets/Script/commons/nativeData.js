/**
 * 
 * "sid"
 * "cfgOil_Max"
 * "cfgOil_Spend"
 * "cfgOil_Addshow"
 * "cfg_version"
 * ""
 * ""
 */
    var   _getAllValue_asyn = function(call){
        wx.getStorageInfo({
            success	: function(res){call(res)},
            fail: function(res){console.error("error! getAllValue_asyn failed "+res);},
            complete: function(res){console.info("success! getAllValue_asyn complete")},
        });
    }
    var   _getAllValue = function(){
        try {
            var res = wx.getStorageInfoSync()
            return res
        } catch (e) {
            console.error("error! getAllValue_asyn failed "+e);
            return null
        }
    }

    var   _getValue_asyn = function(key_,call){
        wx.getStorage({
            key	: key_,
            success	: function(res){call(res)},
            fail: function(res){console.error("error! getAllValue_asyn failed "+res);},
            complete: function(res){console.info("success! getAllValue_asyn complete")},
        });
    }
    var   _getValue = function(key){
        try {
            var res = wx.getStorageSync(key)
            return res
        } catch (e) {
            console.error("error! getAllValue_asyn failed "+e);
            return null
        }
    }

    var   _setValue_asyn = function(key_,value_){
        wx.setStorage({
            key : key_,
            data : value_
        });
    }
    var   _setValue = function(key_,value_){
        wx.setStorageSync(key_,value_);
    }
    
    var   _removeValue_asyn = function(key_,call){
        wx.removeStorage({
            key	: key_,
            success	: function(res){call(res)},
            fail: function(res){console.error("error! getAllValue_asyn failed "+res);},
            complete: function(res){console.info("success! getAllValue_asyn complete")},
        });
    }
    var   _removeValue = function(key_){
        try {
            wx.removeStorageSync(key_)
        } catch (e) {
            console.error("error! getAllValue_asyn failed "+e)
        }
    }

    var   _clearValue_asyn = function(){
        wx.clearStorage();
    }
    var   _clearValue = function(){
        try {
            wx.clearStorageSync()
        } catch(e) {
            console.error("error! clearStorageSync failed "+e)
        }
    }
// };

module.exports = {
    getAllValue_asyn  : _getAllValue_asyn ,
    getAllValue  : _getAllValue ,
    getValue_asyn  : _getValue_asyn ,
    getValue  : _getValue ,
    setValue_asyn  : _setValue_asyn ,
    setValue  : _setValue ,
    removeValue_asyn  : _removeValue_asyn ,
    removeValue : _removeValue,
    clearValue_asyn : _clearValue_asyn,
    clearValue : _clearValue,
};