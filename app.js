//app.js
App({
  onLaunch: function () {
    var _that = this;
    //获取屏幕的宽度信息
    qq.getSystemInfo({
      success(res) {
        _that.globalData.screenInfo= res.screenWidth
      }
    });
    //应用加载时将从数据库读取个人信息并存入本地
    qq.getStorage({
      key: 'userinfo',
      success(res) {
        //小程序端读取数据库
        if (res.data) {
          qq.cloud.init({env: 'intwrite-database-ee368e'});
          var db = qq.cloud.database();
          db.collection('user_info').where({
            _id: res.data._id
          }).get().then(ok =>{
            if (ok.data.length != 0) {
                _that.globalData.userInfo = res.data;
            } else {
                qq.removeStorage({
                  key: 'userinfo'
                });
            };
          }).catch(err => {console.log(err)});
        };
      },
    });
  },
  globalData: {
    userInfo: null
  }
})
