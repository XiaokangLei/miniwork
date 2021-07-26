const app = getApp()
/**
 * 页面的初始数据
 */
Page({
  data: {
    hash: "",
    namespace: "",
    path: "",
    commit: null,
    commentFormShow: false,
    filename: "",
  },
  nothing: function () {},
  addComment: function (e) {
    this.setData({
      filename: e.mark.filename,
      commentFormShow: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  hideAddForm: function () {
    this.setData({
      commentFormShow: false
    });
  },
  doCommentFormSubmit: function (e) {
    var that = this;
    if (!e.detail.value.body) {
      wx.showModal({
        title: '评论失败',
        content: '什么都不填的话就没必要发布评论了吧？',
        showCancel: false,
      });
      return;
    }
    wx.showLoading({
      title: '正在提交评论',
    });
    wx.request({
      url: app.config.apiUrl + "api/v5/repos/" + that.data.namespace + "/" + that.data.path + "/commits/" + that.data.hash + "/comments",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        ...{
          access_token: app.access_token,
        },
        ...e.detail.value
      },
      success: function (result) {
        wx.hideLoading();
        if (result.data.hasOwnProperty("message")) {
          wx.showModal({
            title: '评论失败',
            content: result.data.message,
            showCancel: false,
          });
        } else {
          wx.showModal({
            title: '评论发布成功',
            content: '你的评论已经发布成功，感谢你对这个仓库的关注',
            showCancel: false,
          });
        }
      }
    });
  },
  onLoad: function (e) {
    wx.showLoading({
      title: '数据加载中',
    });
    app.loadFont();
    var that = this;
    if (e.hash && e.path && e.namespace) {
      that.setData({
        hash: e.hash,
        namespace: e.namespace,
        path: e.path,
      });
    } else {
      wx.showModal({
        title: '参数错误',
        content: '系统发生错误，无法为你读取数据',
        showCancel: false,
        success(res) {
          wx.navigateBack();
        }
      });
    }
  },
  /**
   * 页面显示事件
   */
  onShow: function () {
    var that = this;
    app.getUserInfo(function (result) {
      if (result) {
        that.getDetail();
      } else {
        app.loginFirst();
      }
    });
  },
  /**
   * 下拉刷新事件
   */
  onPullDownRefresh() {
    this.getDetail();
  },
  getDetail: function () {
    var that = this;
    wx.showLoading({
      title: '数据读取中',
    });
    wx.request({
      url: app.config.apiUrl + "api/v5/repos/" + that.data.namespace + "/" + that.data.path + "/commits/" + that.data.hash,
      method: "GET",
      data: {
        access_token: app.access_token,
      },
      success: function (result) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (result.data.hasOwnProperty("sha")) {
          that.setData({
            commit: result.data
          });
        } else {
          wx.showModal({
            title: 'Commit获取失败',
            content: result.data.message,
            showCancel: false,
            success(res) {
              wx.navigateBack();
            }
          });
        }
      }
    });
  },
  onShareAppMessage: function (res) {}
})