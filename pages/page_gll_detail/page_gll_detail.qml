<view class="container">
    <!--调用qs前端处理逻辑-->
    <qs module="page_gll_detail" src="./page_gll_detail.qs"></qs>
    <!--用于渲染表格方块-->
    <view class="detail_table">
        <view class="detail_show" qq:for="{{sectionsInfo}}" qq:key="{{index}}" data-index="{{index}}" bindtap="{{page_gll_detail.bindtap}}">
            {{item+1}}
        </view>
    </view>
    <!--设置提交按钮-->
    <button bindtap="onsubmit" class="detail_submit">提交</button>
    <!--设置遮罩层和信息确认框-->
    <view class="detail_cover_box" qq:if="{{submitting}}">
        <view class="detail_cover" bindtap="onhide"><!--点击此处取消展示--></view>
        <view class="detail_confirm" animation="{{animation}}">
            <!--展示用户选择的信息-->
            <view class="detail_confirm_show">
                <text class="detail_confirm_show_title">{{show_title}}</text>
                <view class="detail_confirm_show_content">
                    <text>您选择的题号为:</text>
                    <view class="detail_confirm_show_content_list">
                        <text qq:for="{{user_choose}}" qq:key="{{index}}" data-index="{{item}}" class="detail_confirm_show_content_list_child">{{item}}</text>
                    </view>
                    <text style="text-align: center;display: block;margin-top: 60rpx">----请您确定选择----</text>
                    <view class="detail_confirm_show_button">
                        <button type="mini" class="button_exit" type="default" bindtap="onhide">取消</button>
                        <button type="mini" class="button_ok" type="primary" bindtap="submit">确认</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</view>