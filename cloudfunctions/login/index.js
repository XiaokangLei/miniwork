// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')
cloud.init({
  env: "test-4gn9gu0ucc6657ba",
})
const db = cloud.database({
  env: "test-4gn9gu0ucc6657ba",
}) // 初始化数据库


exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
  }
}

