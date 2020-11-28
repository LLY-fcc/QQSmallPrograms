//获取app实例
const app = getApp();
Page({
    data: {
        //用于渲染页面
        sections: [1]
    },
    /*页面路由函数*/
    navTo(e) {
        var tag = e.currentTarget.dataset.index;
        var status = e.currentTarget.dataset.status;
        var info = app.globalData.userInfo;
        if (info) {
            if (status == 'on') {
                qq.showLoading();
                var _url = '../page_gll_detail/page_gll_detail?id=' + tag + '&user=' + info.name + '&xuehao=' + info._id + '&qq=' + info.qq;
                qq.navigateTo({
                    url: _url
                });
            } else {
                qq.showToast({
                    title: '暂未开放!',
                    icon: 'none'
                });
            };
        } else {
            qq.showToast({
                title: '请先绑定个人信息!',
                icon: 'none'
            });
        }
    },
    /*从数据库读取章数信息*/
    getSectionsInfo: function () {
        //初始化云环境
        qq.cloud.init({
            env: 'intwrite-database-ee368e'
        });
        const db = qq.cloud.database();
        db.collection('gll_sectionsInfo').field({
            section_order: true,
            status: true
        }).get().then(
            res => {
                this.setData({
                    sections: res.data
                });
                //停止来自首页导航的加载动画
                qq.hideLoading();
            }
        ).catch(
            err => {
                qq.hideLoading();
                qq.showToast({
                    title: '加载失败!',
                    icon: 'none'
                })
            }
        )
    },
    onLoad() {
       this.getSectionsInfo(); 
    }
})