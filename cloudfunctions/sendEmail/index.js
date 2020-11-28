// 云函数入口文件
const cloud = require('qq-server-sdk');
//初始化云函数
cloud.init({env:'intwrite-database-ee368e'});
//引入发送邮件包
const nodemailer = require('nodemailer')
var config = {
  host: 'smtp.qq.com',//网易163邮箱 smtp.163.com
  port: 465,//网易邮箱端口
  auth: {
    user: '1772750193@qq.com',//邮箱账号
    pass: 'jnsjxytlsrsndbdf'//邮箱授权码
  }
};
//创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async (event, context) => {
  //获取参数
  const {_qq,_randCode} = event;
  //创建一个邮件对象
  var mail = {
    //发件人
    from: 'INT笔记 <1772750193@qq.com>',
    //主题
    subject: '欢迎使用INT笔记',
    //收件人
    to: _qq+'@qq.com',
    //邮件内容
    text: '劝君莫惜金缕衣，劝君惜取少年时！欢迎使用INT笔记，在这里，看得见进步的痕迹！\n您正在进行学号-QQ号码绑定操作，您的验证码为：'+ _randCode
  };
  let res = await transporter.sendMail(mail);
  return res;
}