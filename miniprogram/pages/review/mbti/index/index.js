//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto1: 'MBTI',
    motto2: '迈尔斯-布里格斯类型指标',
    buttonText: '基本信息授权'
  },

  //从首页index进入intr页面（由于是TabBar页面，不能用redirect方法）
  goToIntr(){
    // wx.setStorageSync('gotUserInfo',true);
    wx.redirectTo({
      url: '/pages/review/mbti/introduction/intr1'
    })
  },

  onLoad(){
    // if (wx.getStorageSync('gotUserInfo'))
      this.setData({
        buttonText: '进入主页面'
      })
  },

  onShow(){
    // setTimeout(this.goToIntr, 2000)
  }

})
