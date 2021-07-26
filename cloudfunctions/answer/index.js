const cloud = require('wx-server-sdk')
cloud.init({
  env: "test-4gn9gu0ucc6657ba",
})
const db = cloud.database({
  env: "test-4gn9gu0ucc6657ba",
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
        "templateId": 'bRnTQ46RrclaDPUWMWcuViqJmO3vfaolXzT9JVhUGJc',
        "miniprogramState": 'developer'
      })
    return result
  } catch (err) {
    return err
  }
}