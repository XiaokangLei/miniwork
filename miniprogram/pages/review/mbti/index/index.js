//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto1: 'MBTI',
    motto2: '迈尔斯-布里格斯类型指标',
    buttonText: '基本信息授权',
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 0,
      name: '测前须知'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: 'MBTI简介'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '八维简介'
    }],
    gridCol:3,
    skin: false
  },


  //从首页index进入intr页面（由于是TabBar页面，不能用redirect方法）
  xz_post(){
    // wx.setStorageSync('gotUserInfo',true);
    wx.navigateTo({
      url: '/pages/review/mbti/result/result'
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
    wx.setNavigationBarTitle({
      title: "MBTI测试"
    })
  }

})
