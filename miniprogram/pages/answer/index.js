// pages/answer/index.js
const db = wx.cloud.database({
  env: "test-4gn9gu0ucc6657ba"
})
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: true
  },
  created(){
    this.post()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id + "&limt=" + e.currentTarget.dataset.limt
      })
    },
    post() {
      db.collection('press').where({Type:"ms"}).orderBy('_createTime','desc').limit(4).get().then(res => {
        console.log(res)
        this.setData({
          wz_list: res.data,
        })
    })
      db.collection('interview').orderBy('_createTime', 'asc').where({ select: false}).limit(4).get().then(res => {
          this.setData({
            xw_list: res.data,
          })
          console.log(this.data.xw_list)
      })
      db.collection('interview').where({ select: true, ly:'Js' }).count().then(res => {
        this.setData({
         js_L:res.total
        })
      })
      db.collection('interview').where({ select: true, ly:'CSS' }).count().then(res => {
        this.setData({
         CS_L:res.total
        })
      })
    },
  }
})
