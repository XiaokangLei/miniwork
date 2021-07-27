const api = require('../../../utils/api.js');
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
  },
  onLoad: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // api.addViewNum()
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});