const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: true
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },

  created() {
    wx.getSystemInfo({
      success: e => {
        this.setData({
          StatusBar: e.statusBarHeight
        })
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.setData({
            Custom: capsule,
            CustomBar: capsule.bottom + capsule.top - e.statusBarHeight
          })
        } else {
          this.setData({
            CustomBar: e.statusBarHeight + 50
          })
        }
      }
    })
  },
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome() {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})