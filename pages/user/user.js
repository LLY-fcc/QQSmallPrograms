const app = getApp();
Page({
    data:{
        //是否为管理员
        isSupper: false,
        //是否上传信息
        hasBind: false,
        //是否读取到信息
        hasinfo: true,
        userinfo: {
            "name": "鸭梨山大",
            "avatarUrl": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1441836571,2166773131&fm=26&gp=0.jpg"
        },
        canIUse: qq.canIUse('button.open-type.getUserInfo')
    },
    /*设置页面导航*/
    navToDetail: function(e) {
        var suffix = e.currentTarget.dataset.tag;
        var _url = "../../user_detail/user_detail_"+suffix+"/user_detail_"+suffix;
        if (!app.globalData.userInfo) {
            qq.navigateTo({
                url: _url
            });
        };
    },
    navToDetailTwo: function(e) {
        qq.showLoading();
        var suffix = e.currentTarget.dataset.tag;
        var _url = "../../user_detail/user_detail_"+suffix+"/user_detail_"+suffix;
        qq.navigateTo({
            url: _url
        });
    },
    /*登陆事件*/
    userLogin: function() {
        const _that = this;
        qq.getUserInfo({
            success(res) {
                var _userinfo = res.userInfo;
                _that.setData({
                    "userinfo.name": _userinfo.nickName,
                    "userinfo.avatarUrl": _userinfo.avatarUrl,
                    hasinfo: true
                });
            }
        });
    },
    onLoad() {
        const _that = this;
        //加载时检查是否已经授权
        qq.getSetting({
            success(res){
                if (res.authSetting['scope.userInfo']) {
                    //已经授权，获取头像昵称
                    qq.getUserInfo({
                        success(res) {
                            var _userinfo = res.userInfo;
                            _that.setData({
                                "userinfo.name": _userinfo.nickName,
                                "userinfo.avatarUrl": _userinfo.avatarUrl,
                                hasinfo: true
                            });
                        }
                    });
                } else {
                    _that.setData({
                        hasinfo: false
                    })
                };
            },
        });
    },
    onShow(){
        //检查是否已经绑定QQ
        if (app.globalData.userInfo) {
            this.setData({
                hasBind: true
            });
        };
        //检查是否为管理员
        if (app.globalData.userInfo) {
            if (app.globalData.userInfo.name == '李阳辉' || app.globalData.userInfo._id == '201916020217') {
                this.setData({
                    isSupper: true
                });
            };
        };
    },
    onPullDownRefresh() {
    }
})