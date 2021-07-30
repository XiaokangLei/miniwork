const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 初始化数据库


exports.main = async (event, context) => {
  // 先取出集合记录总数
  return await db.collection('user').limit(10).orderBy('sign', 'desc').get()


}