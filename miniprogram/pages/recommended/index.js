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
    loading: true,
    iconList: [{
      icon: 'favorfill',
      color: 'yellow',
      badge: 0,
      name: '我的收藏',
      data_page: "user/collect/index",
      bindtap: "bindCollect"
    }, {
      icon: 'appreciatefill',
      color: 'red',
      badge: 0,
      name: '我的点赞',
      data_page: "user/star/index",
      bindtap: "bindZan"
    }, {
      icon: 'noticefill',
      color: 'orange',
      badge: 0,
      name: '我的题库',
      data_page: "user/problem_list/index",
      bindtap: "bindNotice"
    }, {
      icon: 'goodsfavor',
      color: 'green',
      badge: 0,
      name: '我的笔记',
      data_page: "user/note/index",
      bindtap: "bindPoint"
    }]
  },
  created() {
    this.post()
    wx.setNavigationBarTitle({
      title: "内推"
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
      db.collection('recommended').orderBy('_createTime', 'asc').limit(4).get().then(res => {
        this.setData({
          xw_list: res.data,
        })
        console.log(this.data.xw_list)
      })
      db.collection('salary').orderBy('_createTime', 'asc').limit(4).get().then(res => {
        this.setData({
          salary_list: res.data,
        })
        console.log(this.data.salary_list)
      })
    },
  }
})