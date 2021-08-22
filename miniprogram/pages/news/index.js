import envId from "../../utils/config.js"
const db = wx.cloud.database({
  env: envId.envId
})
const app = getApp()
import api from "../../utils/api.js"
import task from "../../utils/request.js"
Component({
  properties: {
    popr: {
      type: Number,
      default: 0
    },
  },
  data: {
    cardCur: 0,
    latest_list: [],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
  },
  created() {
    this.initial()
    wx.setNavigationBarTitle({
      title: "校招资讯"
    })
  },
  methods: {
    initial() {
      api.GET_news_top.then(res => {
        this.setData({
          xw_list: res
        })
      })
      api.GET_news.then(res => {
        this.setData({
          latest_list: res
        })
      })
      task.Tree_cloud('userlist').then(res => {
        this.setData({
          userlist: res.data
        })
      })
      task.Tree_cloud('user_browse').then(res => {
        this.setData({
          t_data_rs: res.total + 5
        })
      }),
      api.GET_news_swiper.then(res => {
        this.setData({
          swiperList: res
        })
      })
    },
    tz_swiper(e) {
      wx.navigateTo({
        url: "../../pages/news/details_news/index?id=" + e.currentTarget.dataset.url
      })
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    tz(e) {
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
  }
})