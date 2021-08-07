const app = getApp()
import api from "../../utils/api.js"

Component({
  data: {
    cardCur: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    height: "40px",
    loding: true,
    type: "全部",
    active: 0,
    tab: [{
      name: "全部",
      id: "全部"
    }, {
      name: "杂谈",
      id: "zt"
    }, {
      name: "Vue.js",
      id: "Vue"
    }, {
      name: "Css",
      id: "Css"
    }, {
      name: "面试",
      id: "ms"
    }, {
      name: "小程序",
      id: "xcx"
    }, {
      name: "JavaScript",
      id: "Js"
    }, {
      name: "后台框架",
      id: "ht"
    }, {
      name: "基础",
      id: "Jc"
    }, {
      name: "网络安全",
      id: "Wl"
    }]
  },
  created() {
    this.list()
    wx.setNavigationBarTitle({
      title: "小贝校招"
    })
  },
  properties: {
    list: {
      type: Object,
      default: ''
    },
    loding: {
      type: Boolean,
      default: true
    },
  },
  watch: {
    'active': function (a, b) {
      console.log(a)
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
  },
  methods: {
     // 跳转到搜索页面
     jump_to_search: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../work/" + e.currentTarget.dataset.url
      })
    },
    show_xl() {
      if (this.data.height == "auto") {
        this.setData({
          height: "40px"
        })
      } else {
        this.setData({
          height: "auto"
        })
      }
    },
    onClick(event) {
      app.globalData.type = event.detail.name
      let that = this
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.setData({
        active: event.detail.name
      })
    },
    onChange(e) {
      this.setData({
        loding: true,
        type: e.currentTarget.dataset.type
      })
      this.triggerEvent('tab_xz', e.currentTarget.dataset.type)
    },
    list() {
      api.GET_press_cutdown.then(res => {
        this.setData({
          cutdown_list: res
        })
      })
      // 按照浏览量获取数据
      api.GET_press_browse.then(res => {
        this.setData({
          rb_list: res
        })
      })
      // 获取宣讲会数据
      api.GET_teachin.then(res => {
        this.setData({
          ls_list: res
        })
      })
      // 获取首页顶部swiper数据
      api.GET_swiper.then(res => {
        this.setData({
          swiperList: res
        })
      })
      // 获取置顶，占坑，待开发
      // api.GET_press_top.then(res => {
      //   this.setData({
      //     top_list: res
      //   })
      // })
    },
    tz_swiper(e) {
      console.log(this.data.swiperList)
      console.log(e.currentTarget.dataset.url)
      wx.navigateTo({
        url: "../../pages/work/details_work/index?id=" + e.currentTarget.dataset.url
      })
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    tz: function (e) {
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },
  },
})