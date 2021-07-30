// miniprogram/pages/note/index.js
import envId from "../../../utils/config.js"
const db = wx.cloud.database({
  env: envId.envId
})
const app = getApp()
Component({

  /**
   * 页面的初始数据
   */
  data: {

  },
  created() {
    this.Load_list()
    wx.setNavigationBarTitle({
      title: "我的笔记"
    })
  },
  methods: {
    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        // url: "../../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
        url: "../../../pages/" + e.currentTarget.dataset.url
      })
    },
    Load_list() {
      let openid = wx.getStorageSync("openid")
      db.collection('note').where({
        _openid: openid
      }).get().then(res => {
        this.setData({
          note_list: res.data
        })
      })
    },
  },
})