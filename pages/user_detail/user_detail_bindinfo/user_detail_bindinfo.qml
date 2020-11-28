<view class="container">
<view qq:if="{{noneInfo}}" style="display:block;width:100%">
    <!--设置信息查询，并绑定-->
    <view qq:if="{{!next}}" class="box">
        <view class="bindinfo_inquire">
            <label class="bindinfo_inquire_label form" for="inquire">学号:</label>
            <input class="bindinfo_inquire_input form" id="inquire" placeholder="请输入学号" bindblur="hasInputed" type="number" />
            <button type="mini" bindtap="inquire" class="bindinfo_inquire_button form">查询</button>
            <view class="bindinfo_inquire_tip" wx:if="{{hasError}}"><text>tips:</text>{{tip}}</view>
        </view>
        <view class="bindinfo_show" qq:if="{{hasInquired}}">
            <view class="bindinfo_show_detail"><text class="label">姓名:</text>{{student.name}}</view>
            <view class="bindinfo_show_detail"><text class="label">手机:</text>{{student.phone}}</view>
            <view class="bindinfo_show_detail"><text class="label">宿舍:</text>{{student.dormitory}}</view>
            <button class="next" bindtap="onNext">下一步</button>
        </view>
    </view>
    <view qq:if="{{next}}" class="box">
        <view class="bindinfo_bind">
        <view style="height: 100rpx;width: 100%;margin-top: 50rpx">
                <label class="bindinfo_bind_qq">
                    <text class="qq_form">QQ：</text>
                    <input class="qq_input qq_form" type="number" placeholder="请输入QQ" bindblur="qqInputed" />
                </label>
                <button class="qq_button qq_form" type="mini" bindtap="sendqqVcode" >验证</button>
            </view>
            <label class="bindinfo_bind_vcode">
                <text class="qq_form">验证码：</text>
                <input class="vcode_input qq_form" type="number" placeholder="请输入验证码" bindblur="vcodeInputed" />
            </label>
            <view class="bindinfo_bind_tip" wx:if="{{hasError}}"><text>tips:</text>{{tip}}</view>
            <button class="bindinfo_bind_confirm" bindtap="bindqq">绑定</button>
        </view>
    </view>
</view>
<view qq:if="{{!noneInfo}}" class="msg"><text>恭喜您！绑定成功！</text></view>
</view>