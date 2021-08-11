// pages/introduction/intr1.js
Page({
  //测试按钮被点击
  goToTest: function () {
    wx.redirectTo({
      url: '../test/test',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    strStart: "开始测试"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var mbti = wx.getStorageSync('MBTI')
    if (mbti) {
      this.setData({ strStart: "重新测试" })
    }
    if (wx.getStorageSync('eight')) {
      this.setData({ strStart: "继续测试" })
    }
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