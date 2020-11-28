<view class="container">
    <view class="title">请选择章数</view>
    <scroll-view scroll-y="true" style="height:200px;width:70%;">
        <view class="tab" bindtap="navTo" data-index="{{index+1}}" data-status="{{item.status}}" qq:for="{{sections}}" qq:key="{{index}}">{{item.section_order}}{{item.status == 'off'?'(已关闭)':''}}</view>
    </scroll-view>
</view>