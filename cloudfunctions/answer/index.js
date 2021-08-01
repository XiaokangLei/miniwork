const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
})
exports.main = async (event, context) => {
 
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        "touser": cloud.getWXContext().OPENID,
        "page": 'index',
        "lang": 'zh_CN',
        "page":"pages/index/index?sign=true",
        "data": {
          "name2": {
            "value": event.name
          },
          "phrase1": {
            "value": '签到成功'
          },
          "date3": {
            "value": event.date
          },
          "thing14": {
            "value": '欢迎使用小贝校招，明天也记得签到哦！'
          }
        },
        "templateId": 'K7WmbKR5PRE_8c8Rv674eHXGayNyC4DHi1GrAs4exp4',
        "miniprogramState": 'developer'
      })
    return result
  } catch (err) {
    return err
  }
}