<view class="container">
    <qs module="user_detail_LSQ" src="./user_detail_LSQ.qs"></qs>
    <!--动态提示框-->
    <view class="toast" animation="{{toastAnimate}}"><text class="toast_text">{{toast}}</text></view>
    <!--三大框，tab\展示\筛选-->
    <view class="lsq_tab">
        <view class="lsq_tab_title" style="background: rgba(0,0,0,0.1);" bindtap="openFilter">筛选</view>
        <view class="lsq_tab_title" style="margin-left: 50rpx">{{capterInfo[capterOrder-1].section_order}}——{{capterInfo[capterOrder-1].section_name}}</view>
    </view>
    <view class="lsq_filter" qq:if="{{open_filter}}">
        <view class="lsq_filter_tab" animation="{{animate}}">
            <!--过滤器的内容区域-->
            <view class="lsq_filter_tab_title">选择章节</view>
            <scroll-view scroll-x="true" class="lsq_filter_tab_chapter">
                <text class="lsq_filter_tab_chapter_order {{capterOrder == index+1 ? 'ontap':''}}" qq:for="{{capterInfo}}" qq:key="{{index}}" data-index="{{item._id}}" bindtap="chooseCapter">{{item.section_order}}
                </text>
            </scroll-view>
            <view class="lsq_filter_tab_title">选择题号</view>
            <scroll-view class="lsq_filter_tab_section" scroll-y="true">
                <text class="lsq_filter_tab_section_order" qq:for="{{sectionInfo}}" qq:key="{{index}}" data-index="{{item}}" bindtap="{{user_detail_LSQ.bindtap}}">{{item}}</text>         
            </scroll-view>
            <view class="lsq_filter_tab_title">选择状态</view>
            <view class="lsq_filter_tab_status">
                <view class="lsq_filter_tab_status_tag {{questions_status == true ? 'ontap':''}}" bindtap="forStatus" data-tag="ok">会作</view>
                <view class="lsq_filter_tab_status_tag {{questions_status ==false ? 'ontap':''}}" bindtap="forStatus" data-tag="no">不会</view>
            </view>
            <button class="lsq_filter_tab_button" type="primary" bindtap="onQuery">查询</button>
        </view>
        <!--过滤器遮罩层-->
        <view class="lsq_filter_cover" bindtap="closeFilter"></view>
    </view>
    <scroll-view scroll-y="true" class="lsq_show" lower-threshold="1px" bindscrolltolower="whenScrollToLower">
        <!--数据展示,一次不加载那么多-->
        <view class="lsq_show_detail" qq:for="{{questions_info}}" qq:key="{{index}}" data-index="{{index}}">
            <text class="lsq_show_detail_user">姓名：{{item.user}} 上传习题：</text><text qq:for="{{item.sections}}" qq:key="{{index}}" class="lsq_show_detail_order">{{item}}、</text>
        </view>
    </scroll-view>
</view>