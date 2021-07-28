var task = require("./request.js")
const app = getApp()
const db = wx.cloud.database({
  env: "test-4gn9gu0ucc6657ba"
})
const _ = db.command

module.exports = {
  GET_press: task.Tree_get(db.collection('press').limit(20).orderBy('browse', 'desc').orderBy('_createTime', 'asc').where({
    browse: _.gt(10)
  })),
  GET_news: task.Tree_get(db.collection('news').limit(20).orderBy('browse', 'desc').orderBy('_createTime', 'asc').where({
    // browse: _.gt(10)
  })),
  GET_news_top: task.Tree_get(db.collection('news').where({
    Top: true
  })),
  GET_press_top: task.Tree_get(db.collection('press').where({
    Top: true
  })),
  GET_swiper: task.Tree_get(db.collection('mini_swiperList')),
  GET_news_swiper: task.Tree_get(db.collection('news_swiperList')),
  GET_answer: task.Tree_get(db.collection('answer').orderBy('_createTime', 'desc')),
  GET_Book: task.Tree_get(db.collection('Book')),
  GET_teachin: task.Tree_get(db.collection('teachin').orderBy('_createTime', 'desc')),
  GET_press_browse: task.Tree_get(db.collection('press').limit(20).orderBy('browse', 'desc')),
}