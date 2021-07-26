const app = getApp()
var base64Helper = require('../../../utils/Base64.js');
/**
 * 页面的初始数据
 */
Page({
  data: {
    namespace: "",
    path: "",
    branch: "master",
    branchList: [],
    page: 1,
    isGetingData: false,
    commitList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.showLoading({
      title: '数据加载中',
    });
    app.loadFont();
    var that = this;
    if (e.namespace && e.path) {
      that.setData({
        namespace: e.namespace,
        path: e.path,
      });
      wx.showLoading({
        title: '数据读取中',
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
        that.getCommits();
        that.getBranchs();
      } else {
        app.loginFirst();
      }
    });
  },
  /**
   * 下拉刷新事件
   */
  onPullDownRefresh() {
    this.getCommits();
    this.getBranchs();
  },
  changeBranch() {
    var that = this;
    var menuList = [];
    for (var i in that.data.branchList) {
      if (i > 5) {
        break;
      }
      menuList.push(that.data.branchList[i].name);
    }
    wx.showActionSheet({
      itemList: menuList,
      success: function (ret) {
        that.setData({
          branch: that.data.branchList[ret.tapIndex].name
        });
        wx.showLoading({
          title: '切换分支中',
        });
        that.getCommits();
      }
    });
  },
  getBranchs: function (loading = true) {
    var that = this;
    if (loading) {
      wx.showLoading({
        title: '分支读取中',
      });
    }
    wx.request({
      url: app.config.apiUrl + "api/v5/repos/" + that.data.namespace + "/" + that.data.path + "/branches",
      method: "GET",
      data: {
        access_token: app.access_token,
        ref: that.data.branch,
      },
      success: function (result) {
        if (!result.data.hasOwnProperty("message")) {
          that.setData({
            branchList: result.data
          });
          that.getCommits();
        } else {
          wx.showModal({
            title: '读取分支失败',
            content: result.data.message,
            showCancel: false,
          });
        }
      }
    });
  },
  /**
   * 上拉加载时间
   */
  onReachBottom: function () {
    if (!this.data.isGetingData) {
      this.setData({
        page: this.data.page + 1
      });
      this.getCommits();
    }
  },
  getCommits: function () {
    var that = this;
    if (that.data.isGetingData) {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      return;
    }
    that.data.isGetingData = true;
    wx.request({
      url: app.config.apiUrl + "api/v5/repos/" + that.data.namespace + "/" + that.data.path + "/commits",
      method: "GET",
      data: {
        access_token: app.access_token,
        sha: that.data.branch,
        page: that.data.page,
        per_page: 8,
      },
      success: function (result) {
        wx.stopPullDownRefresh();
        wx.hideLoading();
        if (!result.data.hasOwnProperty("message")) {
          if (that.data.page == 1) {
            that.setData({
              commitList: result.data
            });
          } else {
            var _list = that.data.commitList;
            for (var i = 0; i < result.data.length; i++) {
              _list.push(result.data[i]);
            }
            that.setData({
              commitList: _list
            });
          }
        } else {
          wx.showModal({
            title: '读取Commit失败',
            content: result.data.message,
            showCancel: false,
          });
        }
        that.data.isGetingData = false;
      }
    });
  },
  onShareAppMessage: function (res) {}
})