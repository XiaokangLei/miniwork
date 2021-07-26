// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "test-4gn9gu0ucc6657ba",
})
const db = cloud.database({
  env: "test-4gn9gu0ucc6657ba",
})
const _ = db.command
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  async function pota() {
    let collect = await db.collection('collect').where({
 _id: event.id+wxContext.OPENID
    }).get()
    let statr = await db.collection('statr').where({
      _id:event.id+wxContext.OPENID
    }).get()
    return {
      collect: collect.data.length ? true : false,
      statr: statr.data.length ? true : false,
    }
  }
  return await pota()
}