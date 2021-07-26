const db = wx.cloud.database({
  env: "test-4gn9gu0ucc6657ba"
})
const app = getApp()
Component({
  data: {
    loding: true,
    active: 0,
    type: "基础",
  },
  pageLifetimes: {
    show: function () {
      this.post()
    },
  },
  created() {
    this.post()
  },

  methods: {
    post() {
      db.collection('press').limit(10).where({
        type: this.data.type
      }).orderBy('add_time', 'asc').get().then(res => {
        this.setData({
          xw_list: res.data,
          loding: false
        })
      })

    },
    onChange(event) {
      console.log(event.detail.title)
      this.setData({
        loding: true,
        type: event.detail.title
      })
      db.collection('press').limit(10).where({
        type: event.detail.title
      }).orderBy('add_time', 'asc').get().then(res => {
        console.log(res)
        this.setData({
          xw_list: res.data,
          loding: false,
          active: event.detail.name
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