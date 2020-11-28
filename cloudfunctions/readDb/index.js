// 云函数入口文件
const cloud = require('qq-server-sdk');
cloud.init({
  env: 'intwrite-database-ee368e'
});
const db = cloud.database();
const $ = db.command;

// 云函数入口函数
exports.main = async (event) => {
  const _e = event;
  //根据传入参数选择查询方式
  if (_e.tag == 'wosfl') {
    //用于onLoad
    return await db.collection(_e._collection_name)
    .where(_e._where)
    .orderBy(_e._order_field,_e._order_dir)
    .skip(_e._skip_num)
    .field(_e._field)
    .limit(_e._limit)
    .get()
  } else if (_e.tag == 'ofl') {
    //用于定时执行生成动态消息
    return await db.collection(_e._collection_name)
    .orderBy(_e._order_field,_e._order_dir)
    .field(_e._field)
    .limit(_e._limit)
    .get()
  } else if (_e.tag == 'wfl') {
    return await db.collection(_e._collection_name)
    .where(_e._where)
    .orderBy(_e._order_field,_e._order_dir)
    .field(_e._field)
    .limit(_e._limit)
    .get()
  } else if (_e.tag == 'wosfl_in') {
    //用于题号筛选
    return await db.collection('student_questions')
    .where({
      chapter: _e._chapter,
      sections: $.all(_e._sections)
    })
    .orderBy(_e._order_field,_e._order_dir)
    .skip(_e._skip_num)
    .field(_e._field)
    .limit(_e._limit)
    .get()
  } else if (_e.tag == 'wosfl_nin') {
    //用于题号筛选
    console.log(_e._sections)
    return await db.collection('student_questions')
    .where({
      chapter: _e._chapter,
      sections: $.nin(_e._sections)
    })
    .orderBy(_e._order_field,_e._order_dir)
    .skip(_e._skip_num)
    .field(_e._field)
    .limit(_e._limit)
    .get()
  } else {
    return {'errMsg': 'noneTag'};
  };
}
