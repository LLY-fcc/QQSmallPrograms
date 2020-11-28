function bindtap(e,i) {
    var _instance = e.instance;
    var _index = e.instance.getDataset().index;
    //首先调用逻辑层js代码将题号上传
    _instance.callMethod(
        'chooseSection',
        {
            index: _index
        }
    );
    if (!_instance.hasClass('ontap')) {
        _instance.addClass('ontap');
    } else {
        _instance.removeClass('ontap');
    };
};
module.exports = {
    bindtap: bindtap
}