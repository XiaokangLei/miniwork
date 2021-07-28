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
    sc_show: false,
    dz_show: false,
    fx_show: true
  },
  top() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  initial: function (id) {
    this.setData({
      loding: true
    })
    wx.cloud.callFunction({
      name: "details",
      data: {
        id: this.data.id,
      },
    }).then(res => {
      let result = res.result.details.html
      this.setData({
        loding: false
      })
      result = result.replace(/<img/gi, '<img class="img_yl" style="max-width:100%;height:auto;margin: 0 auto;display:block" ')
        .replace(/<code/gi, '<code  class="language-css" ')
        .replace(/<br\/>/g, "\n");
      this.setData({
        html: result,
        xw_list: res.result.details
      })
    })

  },
  initial_tx: function () {
    db.collection('press').doc(this.data.id).get().then(res => {
      this.setData({
        xw_list: res.data,
      })
    })
    wx.cloud.callFunction({
      name: "details_cs",
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

  tz: function (e) {
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.url + "?wzid=" + e.currentTarget.dataset.id
    })
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
      data.press_id = data._id
      console.log(e.currentTarget.dataset.id)
      wx.cloud.callFunction({
        name: e.currentTarget.dataset.id,
        data: {
          press: this.data.xw_list,
        },
      }).then(res => {
        console.log(res.result)
        wx.showToast({
          title: res.result,
          duration: 1000,
          icon: 'none',
          mask: true
        })
        this.initial_tx(that.data.id)
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

  dz_l() {
    db.collection('press').where({
      _id: this.data.xw_list._id
    }).update({
      data: {
        statr: 10
      }
    }).then(res => {
      console.log(res)
      this.initial(this.data.id)
    })
  },
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    this.initial(options.id)
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    wx.cloud.callFunction({
      name: "details_cs",
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
  onShareAppMessage: function (res) {
    console.log(this.data.xw_list.img)
    this.setData({
      fx_show: false
    })
    return {
      title: this.data.xw_list.tille,
      path: '/pages/index/index?id=' + this.data.id + "&share=true",
      imageUrl: this.data.xw_list.img || "",

    }
  },

  onShareTimeline: function (res) {
    console.log(res)

    return {
      title: this.data.xw_list.tille,
   
      imageUrl: this.data.xw_list.img
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
    this.setData({
      fx_show: true
    })
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



})