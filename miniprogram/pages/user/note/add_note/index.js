// miniprogram/pages/note/add_note/index.js
import time from "../../../../utils/time.js"
import envId from "../../../../utils/config.js"
const db = wx.cloud.database({
  env: envId.envId
})
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: "",
    html: "",
    tille: "",
  },
  add() {
    db.collection('note').add({
      data: {
        time: this.data.time,
        html: this.data.html,
        title: this.data.tille,
        press_id: this.data.press_id || null,
        ly: this.data.ly || null
      },
      success: function (res) {
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 2000,
          mask: true
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  onClickIcon() {
    wx.navigateTo({
      url: "../../../pages/work/details_work/index" + "?id=" + this.data.press_id
    })
  },
  initial(id) {
    db.collection('note').where({
      _id: id
    }).get().then(res => {
      console.log(res.data)
      this.setData({
        tille: res.data[0].tille,
        time: res.data[0].time,
        html: res.data[0].html,
        ly: res.data[0].ly,
        press_id: res.data[0].press_id
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "笔记"
    })
    if (options.id) {
      this.initial(options.id)
    }
    if (options.wzid) {
      this.setData({
        press_id: options.wzid
      })
      db.collection('press').doc(options.wzid).get().then(res => {
        console.log(res.data)
        this.setData({
          ly: res.data.tille
        })
      })
      console.log(this.data.press_id)
    }
    this.setData({
      time: time.formatTime(new Date()),
    })
    console.log(this.data.time)
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