// miniprogram/pages/details/index.js
const db = wx.cloud.database({
  env: "test-4gn9gu0ucc6657ba"
})

const _ = db.command
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    deta: {},
    html: "",
    tz_list: [],
    sc_show: false,
    dz_show: false,
  },
  top() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },




  initial: function (id) {
    var that = this
    db.collection('teachin').doc(
      id
    ).get().then(res => {
      let result = res.data.html
      result = result.replace(/<img/gi, '<img class="img_yl" style="max-width:100%;height:auto;margin: 0 auto;display:block" ')
        .replace(/<code/gi, '<code  class="language-css" ')
        .replace(/<br\/>/g, "\n");

      console.log(result)
      that.setData({
        html: result,
        xw_list: res.data
      })
      db.collection('collect').doc(
        id
      ).get({
        success: function (res) {
          console.log("asd")
          that.setData({
            sc_show: true
          })
        },
        fail: function (res) {
          console.log("ab")
          that.setData({
            sc_show: false
          })
        },
      })
      db.collection('statr').doc(
        id
      ).get({
        success: function (res) {
          console.log("asd")
          that.setData({
            dz_show: true
          })
        },
        fail: function (res) {
          console.log("ab")
          that.setData({
            dz_show: false
          })
        },
      })


    })
  },


  tz: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.url + "?wzid=" + e.currentTarget.dataset.id
    })
  },


  onLoad: function (options) {
    console.log(app.globalData.openid)
    this.setData({
      id: options.id
    })
    this.initial(options.id)
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  onShareAppMessage: function (res) {
    console.log(this.data.xw_list.img)
    return {
      title: this.data.xw_list.tille,
      path: '/pages/index/index?id=' + this.data.id + "&share=true",
      imageUrl: this.data.xw_list.img || "",
      success: function (res) {
        console.log('成功', res)
      }
    }
  },

  onShareTimeline: function (res) {
    if (res.from == 'button') {
      console.log(res.target)
    }
    return {
      title: "为美好世界而编程",
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

})