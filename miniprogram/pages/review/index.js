// pages/recommended/index.js
import envId from "../../utils/config.js"
const db = wx.cloud.database({
  env: envId.envId
})
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: true
  },
  created() {
    this.post()
    wx.setNavigationBarTitle({
      title: "笔试面试"
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id + "&limt=" + e.currentTarget.dataset.limt
      })
    },
    post() {
      // db.collection('press').where({
      //   Type: "ms"
      // }).orderBy('_createTime', 'desc').limit(4).get().then(res => {
      //   console.log(res)
      //   this.setData({
      //     wz_list: res.data,
      //   })
      // })
      // db.collection('interview').aggregate().sample({
      //   size: 2
      // }).end().then(res => {
      //   console.log('***************************');
      //   console.log(res.list[0].concent);
      //   console.log(res.list);
      //   this.setData({
      //     xw_list: res.list,
      //   })
      // })
      db.collection('interview').orderBy('_createTime', 'asc').where({
        select: false,
        kind: 'inte'
      }).limit(4).get().then(res => {
        this.setData({
          xw_list: res.data,
        })
        console.log(this.data.xw_list)
      })
      // db.collection('interview').orderBy('_createTime', 'asc').where({
      //   select: true,
      //   kind: 'c++'
      // }).limit(4).get().then(res => {
      //   this.setData({
      //     c_list: res.data,
      //   })
      //   console.log(this.data.c_list)
      // })
      db.collection('interview').where({
        select: true,
        kind: 'c++'
      }).count().then(res => {
        this.setData({
          js_L: res.total
        })
      })
      db.collection('interview').where({
        select: true,
        ly: 'CSS'
      }).count().then(res => {
        this.setData({
          CS_L: res.total
        })
      })
    },
  }
})