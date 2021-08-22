// miniprogram/pages/index/index.js
import task from "../../utils/request.js"
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 默认主页面id为3
    id: 3,
    list: [],
    page: 1,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    // 每次拉取eachData条数据
    eachData: 4,
  },
  /**
   * 页面滚动事件
   */
  onPageScroll(e) {
    let op
    op = e.scrollTop / 200
    this.setData({
      hd_op: op
    })
  },
  /**
   * 主页底部tab事件，id由前端wxml传回
   */
  changeTab: function (e) {
    var id = e.currentTarget.dataset.id
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.setData({
      id: id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      page: 1
    })
    this.initial()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 初始化页面
   */
  initial(e) {
    // 加载中 标志
    if (this.data.page == 1) {
      this.setData({
        loding: true
      })
    }
    console.log(e)
    if (e) {
      this.setData({
        page: 1
      })
      if (e.detail == "全部") {
        e.detail = ""
      }
    }
    // 从press拉取数据，一次拉取eachData条
    let data = {
      size: this.data.eachData,
      page: this.data.page,
      Type: e ? e.detail : "",
      database: "press"
    }
    // 调用云函数，获取eachData条press数据
    task.Tree_cloud("list", data).then(res => {
      let data = res.data.data
      let list = this.data.list
      if (this.data.page == 1) {
        this.setData({
          list: data,
          loding: false,
          count: res.count
        })
      } else {
        data.forEach(res => {
          list.push(res)
        })
        this.setData({
          list,
          count: res.count,
          loding: false
        })
      }
    })
  },

  index_initial(options) {
    if (options.id) {
      wx.navigateTo({
        url: "../../pages/work/details_work/index?id=" + options.id
      })
    }
    if (options.sign) {
      wx.navigateTo({
        url: "../../pages/user/sign/index"
      })
    }
    if (options.id_index) {
      this.setData({
        id: 2
      })
    }
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.id == 3) {
      if (app.globalData.type == 0) {
        if (this.data.count >= this.data.page * this.data.eachData) {
          this.setData({
            page: this.data.page + 1,
          })
          this.initial()
        }
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (this.data.id == 2) {
      return {
        path: '/pages/index/index?id_index=' + this.data.id,
        imageUrl: "../../images/logo.jpg",
      }
    } else {
      return {
        title: '获取校招资讯、内推，简历模板、在线刷题等',
        imageUrl: "../../images/logo.jpg",
      }
    }
  }
})