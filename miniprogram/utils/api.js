var task = require("./request.js")
import envId from "./config.js"
import time from "./time.js"

const app = getApp()
const db = wx.cloud.database({
  env: envId.envId
})
const _ = db.command

module.exports = {
  GET_press: task.Tree_get(db.collection('press').limit(4).orderBy('_createTime', 'asc')),
  GET_news_top: task.Tree_get(db.collection('news').limit(3).orderBy('browse', 'desc')),
  GET_news: task.Tree_get(db.collection('news').orderBy('add_time', 'desc')),
  // GET_press_top: task.Tree_get(db.collection('press').where({
  //   Top: true
  // })),
  GET_swiper: task.Tree_get(db.collection('mini_swiperList')),
  GET_news_swiper: task.Tree_get(db.collection('news_swiperList')),
  GET_Book: task.Tree_get(db.collection('Book')),
  GET_Resume: task.Tree_get(db.collection('Resume')),
  GET_teachin: task.Tree_get(db.collection('teachin').orderBy('_createTime', 'desc')),
  GET_press_browse: task.Tree_get(db.collection('press').limit(20).orderBy('browse', 'desc')),
  GET_press_cutdown: task.Tree_get(db.collection('press').limit(20).where({
    end: _.gte(time.formatTimeOnly(new Date(Date.now())))
  }).orderBy('end', 'asc')),
}