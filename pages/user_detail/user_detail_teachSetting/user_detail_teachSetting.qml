<view class="container">
    <!--导航条-->
    <view class="tab_box">
        <view class="tab" bindtap="onshow" data-tag="gll">概率论（设置开放的章节）  </view>
        <view class="tab" bindtap="onshow" data-tag="gclx">工程力学</view>
        <view class="tab" bindtap="onshow" data-tag="en">英语</view>
    </view>
    <!--设置对应的二级页面-->
    <view class="box" qq:if="{{tag == 'gll'}}">
        <!--遮罩层-->
        <view class="setting_cover" bindtap="onhide"><!--点击取消--></view>
        <view class="gll_setting" >
            <!--列表渲染-->
            <view class="gll_setting_chapter">
                <view class="gll_setting_chapter_open" qq:for="{{chapterInfo}}" qq:key="{{index}}" data-index="{{index}}">
                    <text class="gll_setting_chapter_text">{{item.section_order}}</text>
                    <button class="gell_setting_chapter_button" size="mini" type="primary" bindtap="setChapter" data-index="{{index}}" data-status="{{item.status}}">{{item.status == 'off'?'开启':'关闭'}}</button>
                </view>
            </view>
        </view>
    </view>
</view>