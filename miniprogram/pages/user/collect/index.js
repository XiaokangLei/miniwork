import Dialog from '@vant/weapp/dialog/dialog';
const db = wx.cloud.database({
  env: "test-4gn9gu0ucc6657ba"
})
const app = getApp()
Component({
  data: {
    loding: true,
    active: 0,
    tabCur: 0,
    type: "小程序",
    tab: [
      "校招",
      "资讯",
    ],
    db_value:'xz'
  },
  pageLifetimes: {
    show: function () {
      this.post()
    },
  },
  created() {
    this.post()
    wx.setNavigationBarTitle({
      title: "我的收藏"
    })
  },

  methods: {
    post() {
      db.collection('collect').where({
        Type:this.data.db_value
      }).limit(10).orderBy('add_time', 'asc').get().then(res => {
        this.setData({
          xw_list: res.data,
          loding: false
        })
      })
    },
    onChange(event) {
      this.setData({
        loding: true
      })
      if (event.detail.title == "资讯") {
        this.setData({
          db_value : 'news'
        })
      }
      else{
        this.setData({
          db_value : 'xz'
        })
        
      }
      db.collection('collect').where({
        Type:this.data.db_value
      }).limit(10).orderBy('add_time', 'asc').get().then(res => {
        this.setData({
          xw_list: res.data,
          loding: false
        })
      })

    },
    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },


  }
})