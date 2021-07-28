// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "test-4gn9gu0ucc6657ba",
})
const db = cloud.database({
  env: "test-4gn9gu0ucc6657ba",
}) // 初始化数据库
// 云函数入口函数
const _ = db.command
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let data = event.press
  data._openid = wxContext.OPENID
  let statr_data = await db.collection('interview_statr').where({
    press_id: data._id,
    _openid: wxContext.OPENID
  }).get()
  if (statr_data.data.length == 0) {
    if (event.press.collect != null) {
      await db.collection('interview').doc(event.press._id).update({
        data: {
          statr: _.inc(1),
        },
      })
    } else {
      await db.collection('interview').doc(event.press._id).update({
        data: {
          statr: 1,
        }
      })
    }
    data._id = data._id + wxContext.OPENID
    await db.collection('interview_statr').add({
      data
    })
    return "推荐此题"
  } else {
    await db.collection('interview_statr').where({
      press_id: data._id,
      _openid: wxContext.OPENID
    }).remove()
    await db.collection('interview').doc(data._id).update({
      data: {
        statr: _.inc(-1),
      },
    })
    return "取消推荐"
  }

}