// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
}) 
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  function  b (i) {
    if (i >= 0 && i <= 9) {
      return "0" + i;
    } else {
      return i;
    }
  }
  function a() {
    var date = new Date(); //当前时间
    var month = b(date.getMonth() + 1); //月
    var day = b(date.getDate()); //日
    var curTime = date.getFullYear() + "-" + month + "-" + day 
    return curTime;
  }
  var today =  a()
  let data= await db.collection('user').where({
    endtime:_.and(_.gte(today+" 00:00:00"),_.lte(today+" 23:59:59"))
  }).count()


  return data

   
  

}