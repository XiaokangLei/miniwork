const cloud = require('wx-server-sdk')
cloud.init({
  env: "test-4gn9gu0ucc6657ba",
})
const db = cloud.database({
  env: "test-4gn9gu0ucc6657ba",
}) // 初始化数据库

exports.main = async (event, context) => {
  return   await    db.collection('dictionaries').get()
}