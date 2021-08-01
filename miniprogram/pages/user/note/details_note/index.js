import envId from "../../../../utils/config.js"
const db = wx.cloud.database({
  env: envId.envId
})
const _ = db.command
const app = getApp()
import task from "../../../../utils/request.js"
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
  xq: function (id) {
    var that = this
    db.collection('note').where({
      _id: id
    }).get().then(res => {
      let result = res.data[0].html
      that.setData({
        html: result,
        xw_list: res.data[0]
      })
      console.log(this.data.xw_list)
    })
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      limt: Number(options.limt)
    })
    console.log(options.id)
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