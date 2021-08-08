// miniprogram/pages/index/index.js
import Notify from '/@vant/weapp/notify/notify';
import task from "../../utils/request.js"
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 3,
    list: [],
    page: 1,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    isTiptrue: false,
  },
  onPageScroll(e) {
    let op
    op = e.scrollTop / 200
    this.setData({
      hd_op: op
    })
  },
  closeThis() {
    wx.setStorageSync("loadOpen", true)
    this.setData({
      isTiptrue: false,
    })
  },
  tab_tz: function (e) {
    var id = e.currentTarget.dataset.id
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.setData({
      id: id
    })
  },

  initial(e) {
    if (this.data.page == 1) {
      this.setData({
        loding: true
      })
    }
    console.log(e)
    if (e) {
      this.setData({
        page: 1
      })
      if (e.detail == "全部") {
        e.detail = ""
      }
    }
    let data = {
      size: 10,
      page: this.data.page,
      Type: e ? e.detail : "",
      database: "press"
    }
    console.log(task)
    task.Tree_cloud("list", data).then(res => {
      let data = res.data.data
      let list = this.data.list
      if (this.data.page == 1) {
        this.setData({
          list: data,
          loding: false,
          count: res.count
        })
      } else {
        data.forEach(res => {
          list.push(res)
        })
        this.setData({
          list,
          count: res.count,
          loding: false
        })
      }
    })
  },

  index_initial(options) {
    if (options.id) {
      wx.navigateTo({
        url: "../../pages/work/details_work/index?id=" + options.id
      })
    }
    if (options.sign) {
      wx.navigateTo({
        url: "../../pages/user/sign/index"
      })
    }
    if (options.id_index) {
      this.setData({
        id: 2
      })
    }
    let firstOpen = wx.getStorageSync("loadOpen")
    if (firstOpen == undefined || firstOpen == '') { //根据缓存周期决定是否显示新手引导
      this.setData({
        isTiptrue: true,
      })
    } else {
      this.setData({
        isTiptrue: false,
      })
    }
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  onLoad: function (options) {
    this.index_initial(options)
  },

  onShow: function () {
    this.setData({
      page: 1
    })
    this.initial()
  },

  onReachBottom: function () {
    if (this.data.id == 3) {
      if (app.globalData.type == 0) {
        if (this.data.count >= this.data.page * 10) {
          this.setData({
            page: this.data.page + 1,
          })
          this.initial()
        }
      }
    }
    if (this.data.id == 1) {
      // let that = this
      // Notify({
      //   background: '#f4c998',
      //   message: '到底啦，2秒后自动跳转学习页面',
      //   top: app.globalData.CustomBar
      // });
      // setTimeout(funcName, 2000);

      // function funcName() {
      //   that.setData({
      //     id: 3
      //   })
      //   wx.pageScrollTo({
      //     scrollTop: 0
      //   })
      // }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (this.data.id == 2) {
      return {
        path: '/pages/index/index?id_index=' + this.data.id,
        imageUrl: "https://7465-test-4gn9gu0ucc6657ba-1304273986.tcb.qcloud.la/img/share_def.webp",
      }
    } else {
      return {
        title:'获取校招资讯、内推，简历模板、在线刷题等',
        imageUrl: "../../images/logo.jpg",
      }
    }
  }
})