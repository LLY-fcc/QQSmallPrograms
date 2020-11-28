Page({
    data: {
        //设置过滤器开启的标志
        open_filter: false,
        //过滤器关键信息
        capterInfo: [],
            //过滤器页面设置的数据,默认章节为1
        capterOrder: 1,
            //查询用
        sectionOrder: [],
            //渲染用section列表
        sectionInfo: [],
            //状态
        questions_status: 'placeholder',
            //设置信息查询的标志
        queryTag: 'wosfl',
        //信息展示页面设置
        questions_info: [],
        //动态信息展示框
        showToast: false,
        toast: '',
        //上传时间戳标志
        //timeStamp: 0
    },
    /*过滤器*/
    onQuery: function() {
        var _that = this;
        var _sectionOrder = _that.data.sectionOrder;
        var _status = _that.data.questions_status;
        if (_sectionOrder.length != 0) {
            if (_status != 'placeholder') {
                qq.showLoading();
                _that.setData({
                    questions_info: []
                });
                if (!_status) {
                    //不会做查询
                    _that.setData({
                        queryTag: 'wosfl_in'
                    });
                    _that.getSpecialInfo();
                } else {
                    //会作查询
                    _that.setData({
                        queryTag: 'wosfl_nin'
                    });
                    _that.getSpecialInfo();
                };
            } else {
                qq.hideLoading();
                qq.showToast({
                    title: '请选择状态!',
                    icon: 'none'
                });
            };
        } else {
            qq.hideLoading();
            qq.showToast({
                title: '请选择题号!',
                icon: 'none'
            });
        }
    },
    //获筛选信息
    getSpecialInfo: function() {
        var _that = this;
        var _data = {
            tag: _that.data.queryTag,
            _chapter: _that.data.capterOrder.toString(),
            _sections: _that.data.sectionOrder,
            _order_field: 'upTime',
            _order_dir: 'desc',
            _skip_num: _that.data.questions_info.length,
            _field: {
                qq: true,
                sections: true,
                user: true,
                _id: false
            },
            _limit: 10
        }
        qq.cloud.callFunction({
            name: 'readDb',
            data: _data,
            success(res) {
                qq.hideLoading();
                var _info = _that.data.questions_info;
                _info.push.apply(_info,res.result.data);
                _that.setData({
                    questions_info: _info
                });
            },
            fail(err) {
                qq.hideLoading();
                qq.showToast({
                    title: '系统错误!请稍后再试!!',
                    icon: 'none'
                });
            },
        });
    },
    //设置过滤器功能
    forStatus: function(e) {
        var _status = e.currentTarget.dataset.tag;
        if (_status == 'ok') {
            this.setData({
                questions_status: true
            });
        } else {
            this.setData({
                questions_status: false
            });
        };
    },
    //过滤题号
    chooseSection: function(e) {
        var _index = e.index;
        var _that = this;
        var _section = _that.data.sectionOrder;
        var order = _section.indexOf(_index);
        if (order != -1) {
            _section.splice(order,1);
            _that.setData({
                sectionOrder: _section
            });
        } else {
            _section.push(_index);
            _that.setData({
                sectionOrder: _section
            })
        };
    },
    //过滤章节
    chooseCapter: function(e) {
        qq.showLoading();
        var _index = e.currentTarget.dataset.index;
        //重新提交查询,信息独立不会影响动态查询功能
        var _that = this;
        //清楚class状态
        _that.setData({
            sectionInfo: [],
            sectionOrder: []
        });
        var num = _that.data.capterInfo[_index - 1].section_num;
        var _sectionInfo = [];
        //生成渲染用列表
        try {
            for (var i=1;i<Number(num)+1;i++) {
                _sectionInfo.push(i.toString());
            };
            _that.setData({
                sectionInfo: _sectionInfo
            });
        } catch(err) { console.log(err)};
        //重置本地数据
        _that.setData({
            capterOrder: _index,
            questions_info: [],
            queryTag: 'wosfl'
        });
        var _data = {
            tag: 'wosfl',
            _collection_name: 'student_questions',
            _where:{chapter: _that.data.capterOrder.toString()},
            _order_field: 'upTime',
            _order_dir: 'desc',
            _skip_num: _that.data.questions_info.length,
            _limit: 10
        };
        qq.cloud.callFunction({
            name: 'readDb',
            data: _data,
            success(res) {
                qq.hideLoading();
                _that.setData({
                    questions_info: res.result.data
                });
            },
            fail(err) {
                qq.hideLoading();
                qq.showToast({
                    title: '系统错误!请稍后再试!!',
                    icon: 'none'
                });
            },
        })
    },
    //获取章节信息用于渲染选择器
    getChapter: function() {
        var _that = this;
        //云环境已经初始化
        var db = qq.cloud.database();
        db.collection('gll_sectionsInfo')
        .get().then(res => {
            _that.setData({
                capterInfo: res.data
            });
        }).catch(err => {
        });
    },
    /*展示框触底*/
    whenScrollToLower: function() {
        qq.showLoading();
        var tag = this.data.queryTag;
        var _where = this.data.capterOrder.toString();
        if (tag == 'wosfl') {
            this.getInfo(_where);
        } else {
            this.getSpecialInfo();
        }
    },
    /*动态展示框*/
    onToast: function(name) {
        var _toast = name + '刚刚上传了习题';
        console.log(_toast)
        var _that = this;
        var toastAnimate = qq.createAnimation({
            duration: 400,
            delay: 0,
            timingFunction: 'ease'
        });
        toastAnimate.translateY(42).step();
        _that.setData({
            toast: _toast,
            toastAnimate: toastAnimate.export()
        });
        console.log('执行了')
        toastAnimate.translateY(-42).step();
        setTimeout(function(){
            _that.setData({
                toastAnimate: toastAnimate,
                toast: ''
            });
        }.bind(this),2000);
    },
    /*过滤器动画*/
    /*关闭*/
    closeFilter: function() {
        var _that = this;
        var animate = qq.createAnimation({
            duration: 400,
            delay: 0,
            timingFunction: 'linear'
        });
        animate.translateX(-280).step();
        _that.setData({
            open_filter: false,
            animate: animate.export(),
            //状态清楚
            questions_status: 'placeholder'
        });
    },
    /*打开*/
    openFilter: function() {
        var _that = this;
        var animate = qq.createAnimation({
            duration: 600,
            delay: 0,
            timingFunction: 'ease'
        });
        animate.translateX(280).step();
        _that.setData({
            open_filter: true,
            //class清除
            sectionOrder: [],
        });
        setTimeout(function(){
            _that.setData({
                animate: animate.export()
            });
        }.bind(this),600)
    },
    /*设置数据对比*/
    /*数据对比中转函数*/
    setCycle: function() {
        var _that = this;
        var timeStamp = _that.data.timeStamp;
        if (timeStamp) {
            _that.compareInfo(timeStamp);
        }
    },
    /*对比函数*/
    compareInfo: function(timeStamp) {
        var _that = this;
        //进行条件查询,成功则提示
        if (timeStamp) {
            var $ = qq.cloud.database().command;
            var _data = {
                tag: 'wfl',
                _collection_name: 'student_questions',
                _where: {upTime: $.gt(timeStamp)},
                _order_field: 'upTime',
                _order_dir: 'desc',
                _field: {
                    upTime: true,
                    user: true,
                    _id: false
                },
                _limit: 5
            };
            //已经初始化
            qq.cloud.callFunction({
                name: 'readDb',
                data: _data
            }).then(res => {
                var new_list = res.result.data;
                if (new_list.length != 0) {
                    _that.setData({
                        timeStamp: new_list[0].upTime
                    });
                    var i = 0;
                    do {
                        _that.onToast(new_list[i].user);
                        i++;
                    } while (i<new_list.length)
                    setTimeout(function(){
                        _that.setCycle()
                    }.bind(this),120000)
                } else {
                    setTimeout(function(){
                        _that.setCycle()
                    }.bind(this),120000)
                };
            }).catch(err => {
                qq.showToast({
                    title: '系统错误!请稍后再试!!',
                    icon: 'none'
                });
            });
        };
    },
    /*获取最新时间戳*/
    getMaxInfo: function() {
        var _that = this;
        var _data = {
            tag: 'ofl',
            _collection_name: 'student_questions',
            _order_field: 'upTime',
            _order_dir: 'desc',
            _field: {
                upTime: true,
                user: true,
                _id: false
            },
            _limit: 1
        }
        //前面已经初始化
        qq.cloud.callFunction({
            name: 'readDb',
            data: _data
        }).then(res => {
            var timeStamp = res.result.data[0].upTime;
            _that.setData({
                timeStamp: timeStamp
            });
            _that.compareInfo(timeStamp);
        }).catch(err => {
        });
    },
    /*设计数据加载函数*/
    getInfo: function(_where) {
        var _that = this;
        var info = _that.data.questions_info;
        //设置数据字典
        var _data = {
            tag: 'wosfl',
            _collection_name: 'student_questions',
            _where: {chapter: _where},
            _order_field: 'upTime',
            _order_dir: 'asc',
            _skip_num: info.length,
            _field: {
                qq: true,
                sections: true,
                user: true,
                _id: false
            },
            _limit: 10
        };
        //解决权限问题，改用云函数
        //onLoad已经初始化
        qq.cloud.callFunction({
            name: 'readDb',
            data: _data
        }).then(res => {
            //查询列表相加
            info.push.apply(info,res.result.data)
            _that.setData({
                questions_info: info
            });
            qq.hideLoading();
        }).catch(err => {
            qq.hideLoading();
            qq.showToast({
                title: '加载出错!',
                icon: 'none'
            });
        });
    },
    onLoad() {
        //初始化云环境
        qq.cloud.init({env:'intwrite-database-ee368e'});
        var _that = this;
        _that.getInfo('1');
        _that.getChapter();
        _that.getMaxInfo();
        qq.hideLoading();
    },
    onUnload() {
        //终止递归
        this.setData({
            timeStamp: 0
        });
    }
})