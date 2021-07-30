// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 初始化数据库
// 云函数入口函数
const _ = db.command
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let data = event.press
  data._openid = wxContext.OPENID
  let start_data = await db.collection('statr').where({press_id: data._id,_openid:wxContext.OPENID}).get()
  if (start_data.data.length == 0) {

    await db.collection('press').doc( data._id).update({
      data: {
        statr: _.inc(1),
      },
    })
    data._id=data._id+wxContext.OPENID
    await db.collection('statr').add({
      data
    })

    return "点赞成功"
  } else {
    await db.collection('statr').where({press_id: data._id,_openid:wxContext.OPENID}).remove()
    await db.collection('press').doc(data._id).update({
      data: {
        statr: _.inc(-1),
      },
    })
    return "取消点赞"
  }

}