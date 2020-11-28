Page({
    data: {
        //设置显示的二级框
        tag: '',
        //设置二级框渲染的内容
        chapterInfo: []
    },
    /*根据相应的标签进行不同的设置*/
    onhide: function() {
        this.setData({
            tag: ''
        });
    },
    onshow: function(e) {
        var tag = e.currentTarget.dataset.tag;
        this.setData({
            tag: tag
        });
    },
    /*设置章节信息*/
    setChapter: function(e) {
        var _that = this;
        //加载框
        qq.showLoading();
        var index = e.currentTarget.dataset.index;
        var status = e.currentTarget.dataset.status;
        var info = _that.data.chapterInfo;
        //逻辑判断
        if (status == 'off') {
            //更改数据库
            qq.cloud.callFunction({
                name: 'changeDb',
                data: {
                    collection_name: 'gll_sectionsInfo',
                    _condition: {_id: info[index]._id},
                    _update: {data: {status: 'on'}}
                }
            }).then(res=>{
                //接口调用成功
                if (res.result.stats) {
                    //更新成功
                    //执行更改
                    info[index].status = 'on';
                    _that.setData({
                        chapterInfo: info
                    });
                    qq.hideLoading();
                    qq.showToast({
                        title: '开启成功!'
                    });
                } else {
                    //更新失败
                    qq.hideLoading();
                    qq.showToast({
                        title: '开启失败!',
                        icon: 'none'
                    });
                }
            }).catch(err=>{
                console.log(err);
                qq.hideLoading();
                qq.showToast({
                    title: '系统错误!稍后再试!!',
                    icon: 'none'
                });
            });
        } else {
            //更改数据库
            qq.cloud.callFunction({
                name: 'changeDb',
                data: {
                    collection_name: 'gll_sectionsInfo',
                    _condition: {_id: info[index]._id},
                    _update: {data: {status: 'off'}}
                },
            }).then(res=>{
                if (res.result.stats) {
                    //更改成功
                    //执行更改
                    info[index].status = 'off';
                    _that.setData({
                        chapterInfo: info
                    });
                    qq.hideLoading();
                    qq.showToast({
                        title: '关闭成功!'
                    });
                } else {
                    //更改失败
                    qq.hideLoading();
                    qq.showToast({
                        title: '关闭失败!',
                        icon: 'none'
                    });
                };
            }).catch(err=>{
                qq.hideLoading();
                qq.showToast({
                    title: '系统错误!请稍后再试!!',
                    icon: 'none'
                });
            });
        };
    },
    /*从数据库读取章数信息用于渲染*/
    getInfo: function() {
        var _that = this;
        //初始化云环境
        qq.cloud.init({env:'intwrite-database-ee368e'});
        //连接数据库
        var db = qq.cloud.database();
        db.collection('gll_sectionsInfo').field({
            section_order: true,
            status: true
        }).get().then(res=>{
            var _info = res.data;
            //直接写入数据
            _that.setData({
                chapterInfo: _info
            });
            qq.hideLoading();
        }).catch(err=>{
            qq.hideLoading();
            qq.showToast({
                title: '系统错误!请稍后再试!',
                icon: 'none'
            });
        });
    },
    onLoad() {
        this.getInfo();
    }
})