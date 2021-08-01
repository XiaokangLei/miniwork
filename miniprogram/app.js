//app.js
var util = require('/utils/time.js');
import envId from "/utils/config.js"
App({
  onLaunch: function () {
    if (wx.cloud) {
      wx.cloud.init({
        env: envId.envId
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
    this.userInfo();
    this.updateManager();
  },

  access_token: null,
  logout: function () {
    wx.removeStorageSync('access_token');
    this.access_token = null;
  },
  // loginFirst: function () {
  //   var that = this;
  //   wx.hideLoading();
  //   wx.showModal({
  //     title: '请先绑定',
  //     content: '你需要绑定仓库才能操作',
  //     showCancel: true,
  //     confirmText: "确定",
  //     cancelText: "取消",
  //     success(res) {

  //     }
  //   });
  // },
  getUserInfo: function (callback) {
    var that = this;
    if (that.access_token) {
      wx.request({
        url: that.config.apiUrl + "api/v5/user",
        method: "GET",
        data: {
          access_token: that.access_token,
        },
        success: function (result) {
          if (result.data.hasOwnProperty('id')) {
            that.userInfo = result.data;
            callback(true);
          } else {
            callback(false);
          }
        }
      });
    } else {
      that.access_token = wx.getStorageSync("access_token");
      if (that.access_token) {
        that.getUserInfo(callback);
      } else {
        callback(false);
      }
    }
  },
    /**
   * 小程序主动更新
   */
  updateManager() {
    if (!wx.canIUse('getUpdateManager')) {
      return false;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '有新版本',
        content: '新版本已经准备好，即将重启',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      });
    });
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
  },
  userInfo: function () {
    const db = wx.cloud.database({
      env: envId.envId
    })
    db.collection('user').get({
    success: function (res) {
      if (res.data.length > 0) {
        console.log(res.data)
        wx.setStorageSync('userid', res.data[0]._id)
        wx.setStorageSync('openid', res.data[0]._openid)
        db.collection('user').doc("" + res.data[0]._id).update({
          data: {
            endtime: util.getCurrentTime()
          }
        })
        wx.setStorageSync('access_token', res.data[0].gitee_token);
        // wx.setStorageSync('access_token', res.data[0].gitee_token);
      } else {
        db.collection('user').add({
          data: {
            addtime: util.getCurrentTime()
          },
          success: function (res) {
            wx.setStorageSync('userid', res._id)
          }
        })
      }
      }
    })
  },
  config: {
    apiUrl: "https://gitee.com/", //通用API地址
    mock:false
  },
  loadFont() {
    wx.loadFontFace({
      family: 'Roboto',
      source: 'url(https://static.hamm.cn/font/Gotham-Book.woff2)',
    });
  },
  globalData: {
    key: '31c76e2a2d784c129e5518817054b111',
    type: 0,
    requestUrl: {
      weather: 'https://free-api.heweather.com/s6/weather',
    },
  },

})