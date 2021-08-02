import envId from "../../../utils/config.js"
const db = wx.cloud.database({
  env: envId.envId
})
const app = getApp()
Page({
  data: {
    loding: true,
    show: false,
    da_show: false,
    page: 1,
    da_zq: 0,
    num:2
  },
  onLoad: function (e) {
    this.setData({
      type: e.id
    })
    wx.setNavigationBarTitle({
      title: e.id
    })
    this.post()
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  onReachBottom: function () {
    if (this.data.pro_length >= this.data.page * 10) {
      this.setData({
        page: this.data.page + 1,
      })
      this.post()
    }
  },
  backpage() {
    console.log("1")
    wx.navigateBack({
      delta: 1
    });
  },
  xz(e) {
    if (this.data.xz_color || this.data.xz_color == 0) {} else {
      let id = e.currentTarget.dataset.id
      this.setData({
        xz_color: id,
        da_show: true
      })
      console.log("id:"+id)
      if (this.data.xw_list.affirm == id) {
        let data = this.data.da_zq + 1
        console.log(data)
        this.setData({
          da_zq: data
        })
      }
    }
  },

  xz_post() {
    if (this.data.xz_color || this.data.xz_color == 0) {
      let page = this.data.page + 1
      let tmp = this.data.xw_list_all
      console.log("//////////////////////////////////"+page)
      this.setData({
        page,
        xz_color: null,
        da_show: false,
        xw_list: tmp[page - 1]
      })
      let cd_data = this.data.page / this.data.num
      this.setData({
        cd: Number(cd_data.toFixed(2))
      })
      console.log(cd_data * 100)
      // this.post()
    } else {
      wx.showToast({
        title: '您未选择答案',
        icon: "none"
      })
    }
  },

  post() {
    this.setData({
      show: false
    })
    db.collection('interview').where({
      select: true,
      kind: this.data.type
    }).count().then(res => {
      let cd_data = this.data.page / this.data.num
      this.setData({
        cd: Number(cd_data.toFixed(2))
      })
      console.log(cd_data * 100)
    })

    db.collection('interview').aggregate().match({
      select: true,
      kind: this.data.type
    }).sample({
      size: 2
    }).end().then(res => {
      console.log('***************************');
      console.log(res.list[0].concent);
      console.log(res.list);
      this.setData({
        xw_list: res.list[0],
        xw_list_all:res.list,
        show: true
      })
    })

    // db.collection('interview').where({
    //   select: true,
    //   kind: this.data.type
    // }).orderBy('_createTime', 'asc').skip((this.data.page - 1) * 1).limit(1).get().then(res => {
    //   console.log(res.data[0])
    //   console.log('***************************');
    //   this.setData({
    //     xw_list: res.data[0],
    //     show: true
    //   })
    // })
  },

  tz: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id + "&limt=" + e.currentTarget.dataset.limt
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '我答对了' + this.data.da_zq + "题",
      path: '/pages/index/index?id_index=' + this.data.id,
      imageUrl: "cloud://test-4gn9gu0ucc6657ba.7472-test-4gn9gu0ucc6657ba-1259429368/da.png",
    }
  },
})