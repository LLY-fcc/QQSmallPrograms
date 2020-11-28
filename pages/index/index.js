const app = getApp();
Page({
    data: { 
    },
    navigateTo(e) {
        qq.showLoading();
        var tag = e.currentTarget.dataset.index;
        if (tag == "gll") {
            qq.navigateTo({
                url: "../page_gll/page_gll"
            })
        } else if (tag == "gclx") {
            qq.navigateTo({
                url: "../page_gclx/page_gclx"
            })
        } else if (tag == "en") {
            qq.navigateTo({
                url: "../page_en/page_en"
            })
        }
    },
    /*定义加载动画*/
    makeAnimation: function(x) {
        var _that = this;
        var animate_1 = qq.createAnimation({
            delay: 400,
            duration: 1000,
            timingFunction: 'ease'
        });
        var animate_2 = qq.createAnimation({
            delay: 400,
            duration: 1000,
            timingFunction: 'ease'
        });
        animate_1.translateX(x).step();
        animate_2.translateX(-x).step();
        _that.setData({
            animate_1: animate_1,
            animate_2: animate_2
        });
    },
    onLoad() {
    },
    onReady() {
        this.makeAnimation((app.globalData.screenInfo / 4 + 35));
    },
    onPullDownRefresh() {
    }
})