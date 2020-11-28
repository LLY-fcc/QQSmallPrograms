// 云函数入口文件
const cloud = require('qq-server-sdk');
cloud.init({
  env: 'intwrite-database-ee368e'
});
//指定数据库
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const {collection_name,_condition,_update} = event;
  //_condition为条件对象,_updata为更新对象,collection_name为表名
  const result = await db.collection(collection_name)
  .where(_condition)
  .update(_update)
  return result
}
