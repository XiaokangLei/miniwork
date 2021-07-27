
import api from "../../../utils/api.js"
Page({
  data: {

  },

  tz: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  post(){
    api.GET_answer.then(res => {
      console.log(res)
      this.setData({
        as_list: res
      })
    })
  },
  onLoad: function (options) {
    this.post()

  },



})