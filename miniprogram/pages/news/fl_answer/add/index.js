// miniprogram/pages/note/add_note/index.js
import time from "../../../../utils/time.js"
import Notify from '/@vant/weapp/notify/notify';
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
    checked: true,
    time: "",
    html: "",
    tille: "",



  },
  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  add() {
  let  that=this
    wx.requestSubscribeMessage({
      tmplIds: ['7yCPpY4onzoFjULznrduxnrTaHzX_v2x_G4TS7ydW-c'],
      success (res) { 
        db.collection('answer').add({
          data: {
            ask: that.data.html,
            _createTime:new Date(that.data.time ).getTime()
          },
          success: function (res) {
            wx.navigateBack({delta: 1 })
          }
        })
      }
     })
     

  },
  onClickIcon(){
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
        press_id:res.data[0].press_id
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.id) {

      db.collection('answer').doc(options.id).get().then(res=>{
        console.log(res.data)
        this.setData({
          html:res.data.ask
        })
      })
      console.log(this.data.press_id)
    }


  
    

    this.setData({
      time: time.formatTime(new Date()),
    })


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