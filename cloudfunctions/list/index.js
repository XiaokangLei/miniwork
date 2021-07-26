const cloud = require('wx-server-sdk')
cloud.init({
  env: "test-4gn9gu0ucc6657ba",
})
const db = cloud.database({
  env: "test-4gn9gu0ucc6657ba",
}) // 初始化数据库

exports.main = async (event, context) => {
  // 先取出集合记录总数
  if (event.Type) {
    const countResult = await db.collection(event.database).where({Type:event.Type}).count()
    const total = countResult.total
      return {
        total: total,
        data: await db.collection(event.database).where({Type:event.Type}) .skip(event.size * (event.page - 1)).orderBy('_createTime','desc').limit(event.size).get()
      }
  } else {
    const countResult = await db.collection(event.database).count()
    const total = countResult.total
    return {
      count: total,
      data:await db.collection(event.database).skip(event.size * (event.page - 1)).orderBy('add_time','desc').limit(event.size).get()
    }
  }
}