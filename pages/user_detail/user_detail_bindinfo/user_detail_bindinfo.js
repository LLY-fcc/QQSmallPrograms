const app = getApp();
Page({
    data: {
        //表单提示信息
        hasError: false,
        tip: '',
        //查询前的信息
        noneInfo: true,
        //查询后的信息
        hasInquired: false,
        student: {},
        //下一步？
        next: false,
        //验证码正确标志
        vcodeTrue: false
    },
    /*QQ号码验证*/
    /*fourth绑定程序开始*/
    bindqq: function() {
        var _that = this;
        var info = _that.data.student;
        qq.showLoading({
            title: '绑定中…'
        });
        //先写入本地，成功后，在写入数据库
        qq.setStorage({
            key: 'userinfo',
            data: {
                _id: info.id.toString(),
                name: info.name,
                phone: info.phone.toString(),
                qq: _that.data._qq
            },
            success() {
                //条件判断成功后直接写入数据库
                if (_that.data.vcodeTrue) {
                    _that.setData({
                            hasError: false,
                            tip: ''
                        });
                    //连接数据库
                    var db = qq.cloud.database();
                    db.collection('user_info').add({
                        data: {
                            _id: info.id.toString(),
                            name: info.name,
                            phone: info.phone.toString(),
                            qq: _that.data._qq
                        },
                        success() {
                            qq.hideLoading();
                            qq.showToast({
                                title: '绑定成功!'
                            });
                            //设置本页面显示
                            _that.setData({
                                noneInfo: false
                            });
                            //临时更改全局数据
                            info.qq = _that.data._qq;
                            app.globalData.userInfo = info;
                        },
                        fail(err) {
                            qq.hideLoading();
                            if (err.errCode == '-502001') {
                                qq.showToast({
                                    title: '信息已存在！！',
                                    icon: 'none'
                                });
                                //不应该出现这种情况,以防万一
                                //临时更改全局数据
                                info.qq = _that.data._qq;
                                app.globalData.userInfo = info;
                            } else {
                                qq.showToast({
                                    title: '系统错误！请稍后再试!!',
                                    icon: 'none'
                                });
                            };
                        },
                    });
                } else {
                    //验证未通过
                    qq.hideLoading();
                    _that.setData({
                        hasError: true,
                        tip: '验证码错误!'
                    });
                };
            },
            fail() {
                //本地信息存储失败后
                qq.hideLoading();
                qq.showToast({
                    title: '系统错误，请稍后再试!',
                    icon: 'none'
                });
                qq.removeStorage({
                    key: 'userinfo'
                });
            },
        });
    },
    /*third验证码是否正确*/
    vcodeInputed: function(e) {
        var vcode = e.detail.value;
        if (!(vcode == this.data.randCode)) {
            this.setData({
                hasError: true,
                tip: '验证码错误!'
            });
        } else {
            this.setData({
                hasError: false,
                tip: '',
                //设置验证码正确标志
                vcodeTrue: true
            })
        }
    },
    /*second:调用云函数发送QQ验证码*/
    sendqqVcode: function() {
        var _that = this;
        //之前已经初始化云环境，无需初始化
        //先生成动态验证码和计时器
          //生成验证码
        var rand = Math.random();
        var _randCode = Math.floor(rand*1000000).toString();
        //存到本地等待验证
        _that.setData({
            randCode: _randCode
        })
        //调用云函数
        if (_that.data._qq) {
            //显示加载框
            qq.showLoading({
                title: '发送中…'
            });
            qq.cloud.callFunction({
            name: 'sendEmail',
            data: {
               _qq: _that.data._qq,
               _randCode: _randCode
            },
            success(res) {
                if (res.errMsg == "ok") {
                    qq.hideLoading();
                    qq.showToast({
                        title: '发送成功！'
                    });
                } else {
                    qq.hideLoading();
                    qq.showToast({
                        title: '发送失败，请检查QQ号!',
                        icon: 'none'
                    });
                };
            },
            fail(err) {
                qq.hideLoading();
                qq.showToast({
                    title: '系统错误,稍后再试!',
                    icon: 'none'
                });
            },
        });
        } else {
            _that.setData({
                hasError: true,
                tip: '请输入QQ！'
            });
        };
    },
    /*first:正则表达式验证QQ号*/
    qqInputed: function(e) {
        var _that = this;
        var _value = e.detail.value;
        if (_value) {
            _that.setData({
            _qq: e.detail.value,
            hasError: false,
            tip: ''
        });
        } else {
            _that.setData({
                hasError: true,
                tip: 'QQ号码不能为空!'
            });
        };
    },
    /*查询后下一步动作*/
    onNext: function() {
        var _that = this;
        //弹出模态框，确认个人信息无误差
        qq.showModal({
            title: '请确认信息无误！',
            content: '信息仅可提交一次,请确认信息无误!!!',
            success(res) {
                //当用户点击确认,导航至下一框
                if (res.confirm == true) {
                    _that.setData({
                        next: true
                    });
                };
            },
        });
    },
    /*点击查询时进行查询数据库*/
    inquire: function() {
        var _that = this;
        if (_that.data.id) {
        qq.showLoading({
            title: '查询中'
        });
        //初始化云环境
        qq.cloud.init({env:'intwrite-database-ee368e'});
        const db = qq.cloud.database();
        db.collection('student_info').where({
            _id: Number(_that.data.id)
        }).get({
            success(res) {
                var info = res.data[0];
                if (res.data[0]) {
                    _that.setData({
                    'student.id': info._id,
                    'student.name': info.name,
                    'student.phone': info.phone,
                    'student.dormitory': info.dormitory,
                    hasInquired: true
                });
                qq.hideLoading()                
                } else {
                    qq.hideLoading();
                    qq.showToast({
                        title: '学号不存在!',
                        icon: 'none'
                    });
                    //学号不存在重置数据
                    _that.setData({
                        hasInquired: false
                    })
                };
            },
            fail(err){
                qq.hideLoading();
                qq.showToast({
                    title: '查询失败!',
                    icon: 'none'
                });
            },
        });
        };
    },
    /*输入完成时触发*/
    hasInputed: function(e) {
        var _value = e.detail.value;
        var reg = /^2019[0-9]{8}$/;
        if (!reg.test(_value)) {
            this.setData({
                hasError: true,
                tip: "学号格式错误!",
                id: '',
                hasInquired: false
            })
        } else {
            this.setData({
                id: _value,
                hasError: false,
                tip: ''
            })
        }
    },
    onInquire: function() {

    },
    onLoad(){

    }
})