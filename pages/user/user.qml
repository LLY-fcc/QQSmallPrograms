<view class="container">
    <!--最底层用于放置背景-->
    <view class="back_end"></view>
    <!--第二层，用于放置旋转遮罩层-->
    <view class="back_up"></view>
    <!--用户登录信息展示-->
    <view class="userinfo">
        <view class="infoshow hasinfo" qq:if="{{hasinfo}}">
            <image src="{{userinfo.avatarUrl}}" class="userinfo_head"/>
            <text class="userinfo_name">{{userinfo.name}}</text>
        </view>
        <view class="infoshow noneinfo" qq:if="{{!hasinfo && canIUse}}">
            <button class="userinfo_login" size="mini" bindgetuserinfo="userLogin" open-type="getUserInfo">立即登录</button>
        </view>
    </view>
    <!--用户页功能区-->
    <view class="option_plate">
        <view class="option_plate_bindinfo" data-tag="bindinfo" bindtap="navToDetail">信息绑定<text qq:if="{{hasBind}}" >(已绑定)</text></view>
        <view class="option_plate_bindinfo" data-tag="teachSetting" bindtap="navToDetailTwo" qq:if="{{isSupper}}">教学设置</view>
        <!--LSQ为learningStatusQuery-->
        <view class="option_plate_bindinfo" data-tag="LSQ" bindtap="navToDetailTwo" qq:if="{{isSupper}}">学况查询</view>
    </view>
</view>