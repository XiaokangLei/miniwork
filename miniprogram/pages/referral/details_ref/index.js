// miniprogram/pages/details/index.js
import envId from "../../../utils/config.js"
const db = wx.cloud.database({
  env: envId.envId
})
const _ = db.command
const app = getApp()
import task from "../../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    deta: {},
    html: "",
    time: 180000,
    timeData: {},
    tz_list: []
  },
  top() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  tm() {
    this.setData({
      tm_show: true
    })
  },
  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },
  statr_sc(e) {
    let openid = wx.getStorageSync("openid")
    if (openid) {
      let that = this
      wx.showToast({
        title: "小贝加载中",
        icon: 'loading',
        mask: true,
        duration: 2000
      })
      let data = this.data.xw_list
      data.type = e.currentTarget.dataset.id
      data.press_id = data._id
      task.Tree_cloud('pro_'+e.currentTarget.dataset.id, {
        press: data
      }).then(res => {
        wx.showToast({
          title: res,
          duration: 1000,
          icon: 'none',
          mask: true
        })
        this.xq(that.data.id)
      })
    } else {
      wx.showToast({
        title: '您尚未登录',
        duration: 1000,
        icon: 'none',
        mask: true
      })
    }
  },
  xq: function (id) {
    var that = this
    db.collection('interview').where({
      _id: id
    }).get().then(res => {
      let result = res.data[0].html
      that.setData({
        html: result,
        xw_list: res.data[0]
      })
      console.log(this.data.xw_list.img)
    })

    wx.cloud.callFunction({
      name: "details_pro",
      data: {
        id: this.data.id,
      },
    }).then(res => {
      this.setData({
        sc_show: res.result.collect,
        dz_show: res.result.statr
      })
    })
  },
  fy() {
    db.collection('interview').skip(this.data.limt + 1).limit(1).get().then(res => {
      console.log(res.data[0])
      let result = res.data[0]
      this.setData({
        limt: this.data.limt + 1,
        xw_list: res.data[0]
      })
    })
  },
  sc() {
    let sc = {
      id: this.data.xw_list._id
    }
    db.collection('user').where({
    }).add({
      data: {
        sc_data: sc
      }
    }).get().then(res => {
      let result = res.data[0].html
      that.setData({
        html: result,
        xw_list: res.data[0]
      })
      console.log(this.data.xw_list)
    })
  },

  dz_l() {
    db.collection('press').where({
      _id: this.data.xw_list._id
    }).update({
      data: {
        statr: 10
      }
    }).then(res => {
      console.log(res)
      this.xq(this.data.id)
    })
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      limt: Number(options.limt)
    })
    console.log(options.limt)
    this.xq(options.id)
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  onShareTimeline: function (res) {
    if (res.from == 'button') {
      console.log(res.target)
    }
    return {
      title: this.data.deta.title,
      imageUrl: this.data.deta.preimage,
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})