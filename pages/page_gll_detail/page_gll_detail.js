Page({
    data: {
        //设置题号信息
        sectionsInfo: [1,2,3,4],
        //设置提交标志
        submitting: false,
        //设置展示的信息
        show_title: '',
        user_choose: [],
        //上传到数据库的信息
        questions: null,
        //是否可上传?
        tar: ''
    },
    /*已经确认准备上传到数据库*/
    /*2020/11/12新加功能,提交前先检查数据库是否已经要求关闭*/
    submit: function() {
        var _that = this;
        //开始加载
        qq.showLoading();
        var info = _that.data.user_choose;
        //页面加载时已经初始化云环境
        var db = qq.cloud.database();
        if (info.length != 0) {
            var _info = _that.data.questions;
            if (_that.data.tar == 'on') {
                _info['sections'] = info;
                //创建一个时间戳
                _info['upTime'] = new Date().getTime();
                //检查数据库是否有重复数据，如果有提示更新，无则加入
                db.collection('student_questions').where({
                    xuehao: _that.data.questions.xuehao,
                    chapter: _that.data.questions.chapter
                }).get({
                    success(res) {
                        if (res.data.length != 0) {
                            qq.hideLoading();
                            var id = res.data[0]._id;
                            //原来有数据
                            qq.showModal({
                                title: '请确定选择',
                                content: '系统检测您已上传,是否重新上传?',
                                success(res) {
                                    if (res.confirm) {
                                        qq.showLoading();
                                        db.collection('student_questions').where({
                                            _id: id
                                        }).update({
                                            data: {
                                                sections: _info.sections
                                            },
                                            success(res)  {
                                                if (res.stats.updated != 0) {
                                                    qq.hideLoading();
                                                    qq.showToast({
                                                        title: '更新成功!',
                                                        icon: 'success',
                                                        duration: 2000
                                                    });
                                                    qq.redirectTo({
                                                        url: '../page_gll/page_gll'
                                                    });
                                                } else {
                                                    qq.hideLoading();
                                                    qq.showToast({
                                                        title: '无需重复提交!!',
                                                        icon: 'none'
                                                    });
                                                    //关闭确认框
                                                    _that.setData({
                                                        submitting: false
                                                    });
                                                };
                                            },
                                            fail() {
                                                qq.hideLoading();
                                                qq.showToast({
                                                    title: '系统错误!请稍后再试!!',
                                                    icon: 'none'
                                                });
                                            },
                                        });
                                    } else {
                                        qq.showLoading();
                                        qq.redirectTo({
                                            url: '../page_gll/page_gll'
                                        });
                                    };
                                },
                            });
                        } else {
                            //原来无数据
                            if (_info.sections && _info.upTime) {
                                db.collection('student_questions').add({
                                    data: _info,
                                    success() {
                                        qq.hideLoading();
                                        qq.showToast({
                                            title: '上传成功!',
                                            icon: 'success',
                                            duration: 2000
                                        });
                                        qq.redirectTo({
                                            url: '../page_gll/page_gll'
                                        });
                                    },
                                    fail(err) {
                                        qq.hideLoading();
                                        qq.showToast({
                                            title: '系统错误!请稍后再试!',
                                            icon: 'none'
                                        });
                                    },
                                });
                            } else {
                                qq.hideLoading();
                                qq.showToast({
                                    title: '系统错误!请稍后尝试!',
                                    icon: 'none'
                                });
                            };
                        };
                    },
                    fail(err) {
                        qq.hideLoading();
                        qq.showToast({
                            title: '系统错误!请稍后再试!!',
                            icon: 'none'
                        });
                    },
                });
            } else {
                qq.hideLoading();
                qq.showToast({
                    title: '该章节已被管理员关闭!',
                    icon: 'none'
                });
                //离开页面
                setTimeout(function() {
                    qq.redirectTo({
                        url: '../page_gll/page_gll'
                    });
                }.bind(this),1000);
            };
        } else {
            qq.hideLoading();
            qq.showToast({
                title: '请选择题号!',
                icon: 'none'
            });
        };
    },
    /*点击提交按钮开始动画&信息再次确认*/
    /*隐藏*/
    onhide: function() {
        var _that = this;
        //隐藏的动画
        var animation = qq.createAnimation({
            duration: 1000,
            delay: 200,
            timingFunction: 'linear'
        });
        animation.opacity(0).step();
        _that.setData({
            animation: animation.export(),
            submitting: false
        })
    },
    /*展现*/
    onsubmit: function() {
        var _that = this;
            var db = qq.cloud.database();
            var _info = _that.data.questions;
            //查询数据库是否已经设置关闭
            db.collection('gll_sectionsInfo').doc(
                _info.chapter
            ).get({
                success(res) {
                    var tar = res.data.status;
                    _that.setData({
                        tar: tar
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
        //设置动画,创建动画
        var animation = qq.createAnimation({
            delay: 200,
            timingFunction: 'linear'
        });
        animation.opacity(1).step();
        _that.setData({
            submitting: true
        });
        setTimeout(function(){
            _that.setData({
            animation: animation.export()
            });
        }.bind(this),400);
    },
    /*将习题号码保存到data*/
    /*定义一个排序函数将列表中的元素排序*/
    sortAttr: function(list) {
        return list
    },
    setInfo: function(d) {
        var _that = this;
        var list = _that.data.user_choose;
        var num = (d.index+1).toString();
        var index = list.indexOf(num);
        if (index == '-1') {
            list.push(num);
        } else {
            list.splice(index,1);
        };
        _that.setData({
            user_choose: list
        });
    },
    /*定义查表函数，并生成渲染列表*/
    getDetailInfo: function (id) {
        //初始化云环境
        qq.cloud.init({
            env: 'intwrite-database-ee368e'
        });
        //获取每章的小节数量的数据
        const db = qq.cloud.database();
        db.collection('gll_sectionsInfo').doc(id).field({
            section_num: true
        }).get().then(
            res => {
                //停止上一页的加载框
                qq.hideLoading();
                //提前转换为数值型,提升代码性能
                var _sectionNum = Number(res.data.section_num);
                var num = [];
                for (var i = 0;i<_sectionNum;i++) {
                    num.push(i);
                };
                this.setData({
                     sectionsInfo: num
                })
            }
        )
    },
    onLoad(q) {
        this.setData({
            'questions.chapter': q.id,
            'questions.qq': q.qq,
            'questions.user': q.user,
            'questions.xuehao': q.xuehao
        })
        //获取页面参数用于查表
        var _id = q.id;
        this.getDetailInfo(_id);
    }
})