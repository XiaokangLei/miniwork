const app = getApp()
import api from "../../utils/api.js"

Component({
  data: {
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
      api.GET_press_browse.then(res => {
        this.setData({
          rb_list: res
        })
      })
      api.GET_history.then(res => {
        this.setData({
          ls_list: res
        })
      })
      api.GET_press_top.then(res => {
        this.setData({
          tz_list: res
        })
      })

    },
    tz: function (e) {
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },
  },



})