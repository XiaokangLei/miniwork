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
  },
  initial_tx: function (id) {
    wx.cloud.callFunction({
      name: "dictionaries_details",
      data: {
        id: this.data.id,
      },
    }).then(res => {})
    this.setData({
      loding:true
    })
    db.collection('dictionaries').doc(this.data.id).get().then(res => {
      console.log(res.data)
      this.setData({
        xw_list: res.data,
      })
      let result = res.data.html
      result = result.replace(/<img/gi, '<img class="img_yl" style="max-width:100%;height:auto;margin: 0 auto;display:block" ')
        .replace(/<code/gi, '<code  class="language-css" ')
        .replace(/<br\/>/g, "\n");
      this.setData({
        html: result,
        xw_list: res.data,
        loding:false
      })
    })

  },
  tz: function (e) {
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.url + "?wzid=" + e.currentTarget.dataset.id
    })
  },



  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.initial_tx(options.id)
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
      path: '/pages/index/index?id=' + this.data.id + "&share=true",
      title: this.data.xw_list.tille,
      imageUrl:  this.data.xw_list.img 
    }
  },





})