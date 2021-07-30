import envId from "../../../utils/config.js"
const db = wx.cloud.database({
  env: envId.envId
})
const app = getApp()
Page({
  data: {
    loding: true,
    page: 1
  },
  onLoad: function (e) {
    this.post()
    wx.setNavigationBarTitle({
      title: "我的题库"
    })
  },
  onReachBottom: function () {
    if (this.data.pro_length >= this.data.page * 10) {
      this.setData({
        page: this.data.page + 1,
      })
      this.post()
    }
  },

  post() {
    db.collection('interview').count().then(res => {
      this.setData({
        pro_length: res.total,
      })
    })
    db.collection('interview_collect').orderBy('_createTime', 'asc').skip((this.data.page - 1) * 10).limit(10).get().then(res => {
      if (this.data.page > 1) {
        let data = this.data.xw_list
        res.data.forEach(res2 => {
          console.log(res2)
          data.push(res2)
        })
        this.setData({
          xw_list: data
        })
      } else {
        this.setData({
          xw_list: res.data,
          loding: false
        })
      }
    })
  },

  tz: function (e) {
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.a)
    console.log(e.currentTarget.dataset.limt)
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id + "&limt=" + e.currentTarget.dataset.limt
    })
  },
})