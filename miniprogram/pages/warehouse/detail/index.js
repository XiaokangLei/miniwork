const app = getApp()
var base64Helper = require('../../../utils/Base64.js');
/**
 * 页面的初始数据
 */
Page({
  data: {
    repoInfo: null,
    namespace: "",
    path: "",
    readme: "",
    branch: "master",
    branchList: [],
    commitList: [],
    isStarred: true,
    isWatched: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    app.loadFont();
    var that = this;
    if (e.namespace && e.path) {
      that.setData({
        namespace: e.namespace,
        path: e.path,
      });
      wx.showLoading({
        title: '仓库读取中',
      });
    } else {
      wx.showModal({
        title: '参数错误',
        content: '系统发生错误，无法为你读取仓库',
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
        that.getDetail(false);
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
  openProfilePage() {
    if (this.data.repoInfo) {
      var repoInfo = this.data.repoInfo;
      switch (repoInfo.namespace.type) {
        case 'group':
          wx.navigateTo({
            url: '../orgs/index?path=' + repoInfo.namespace.path,
          })
          break;
        case 'personal':
          wx.navigateTo({
            url: '../user/detail?login=' + repoInfo.namespace.path,
          })
          break;
        case 'enterprise':
          wx.navigateTo({
            url: '../enterprises/index?path=' + repoInfo.namespace.path,
          })
          break;
        default:
      }
    }
  },
  getDetail: function (loading = true) {
    var that = this;
    if (loading) {
      wx.showLoading({
        title: '仓库读取中',
      });
    }
    wx.request({
      url: app.config.apiUrl + "api/v5/repos/" + that.data.namespace + "/" + that.data.path,
      method: "GET",
      data: {
        access_token: app.access_token,
      },
      success: function (result) {
        if (result.data.hasOwnProperty("id")) {
          that.setData({
            repoInfo: result.data
          });
          that.getBranchs(loading);
          that.checkStarAndWatch();
        } else {
          wx.stopPullDownRefresh();
          wx.hideLoading();
          wx.showModal({
            title: '仓库数据获取失败',
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
  checkStarAndWatch: function () {
    var that = this;
    wx.request({
      url: app.config.apiUrl + "api/v5/user/starred/" + that.data.namespace + "/" + that.data.path,
      method: "GET",
      data: {
        access_token: app.access_token,
      },
      success: function (result) {
        var isStarred = false;
        if (result.data.hasOwnProperty('message')) {
          isStarred = false;
        } else {
          isStarred = true;
        }
        that.setData({
          isStarred: isStarred
        });
        wx.request({
          url: app.config.apiUrl + "api/v5/user/subscriptions/" + that.data.namespace + "/" + that.data.path,
          method: "GET",
          data: {
            access_token: app.access_token,
          },
          success: function (result) {
            var isWatched = false;
            if (result.data.hasOwnProperty('message')) {
              isWatched = false;
            } else {
              isWatched = true;
            }
            that.setData({
              isWatched: isWatched
            });
          }
        });
      }
    });
  },
  doStar: function () {
    var that = this;
    wx.showLoading({
      title: '操作中',
    });
    wx.request({
      url: app.config.apiUrl + "api/v5/user/starred/" + that.data.namespace + "/" + that.data.path,
      method: "PUT",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.access_token,
      },
      success: function (result) {
        wx.hideLoading();
        if (result.data.hasOwnProperty('message')) {
          wx.showModal({
            title: 'Star失败',
            content: result.data.message,
            showCancel: false,
          });
        } else {
          wx.showModal({
            title: 'Star成功',
            content: "有你的鼓励作者会更加努力完善这个仓库呀~",
            showCancel: false,
            success: function (res) {
              that.checkStarAndWatch();
            }
          });
        }
      }
    });
  },
  doUnStar: function () {
    var that = this;
    wx.showLoading({
      title: '操作中',
    });
    wx.request({
      url: app.config.apiUrl + "api/v5/user/starred/" + that.data.namespace + "/" + that.data.path,
      method: "DELETE",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.access_token,
      },
      success: function (result) {
        wx.hideLoading();
        if (result.data.hasOwnProperty('message')) {
          wx.showModal({
            title: '取消Star失败',
            content: result.data.message,
            showCancel: false,
          });
        } else {
          wx.showModal({
            title: '取消Star成功',
            content: "感谢你曾经的鼓励，我们会做得更好~",
            showCancel: false,
            success: function (res) {
              that.checkStarAndWatch();
            }
          });
        }
      }
    });
  },
  doWatch: function () {
    var that = this;
    wx.showLoading({
      title: '操作中',
    });
    wx.request({
      url: app.config.apiUrl + "api/v5/user/subscriptions/" + that.data.namespace + "/" + that.data.path,
      method: "PUT",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.access_token,
        watch_type: 'watching',
      },
      success: function (result) {
        wx.hideLoading();
        if (result.data.hasOwnProperty('message')) {
          wx.showModal({
            title: 'Watch失败',
            content: result.data.message,
            showCancel: false,
          });
        } else {
          wx.showModal({
            title: 'Watch成功',
            content: "你可以在好友动态里看到这个仓库的更新啦~",
            showCancel: false,
            success: function (res) {
              that.checkStarAndWatch();
            }
          });
        }
      }
    });
  },
  doUnWatch: function () {
    var that = this;
    wx.showLoading({
      title: '操作中',
    });
    wx.request({
      url: app.config.apiUrl + "api/v5/user/subscriptions/" + that.data.namespace + "/" + that.data.path,
      method: "DELETE",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.access_token,
        watch_type: 'watching',
      },
      success: function (result) {
        wx.hideLoading();
        if (result.data.hasOwnProperty('message')) {
          wx.showModal({
            title: '取消Watch失败',
            content: result.data.message,
            showCancel: false,
          });
        } else {
          wx.showModal({
            title: '取消Watch成功',
            content: "你将不会再看到这个仓库的动态~",
            showCancel: false,
            success: function (res) {
              that.checkStarAndWatch();
            }
          });
        }
      }
    });
  },
  doFork: function () {
    wx.showToast({
      title: "正在开发中"
    });
  },
  getReadme: function (loading = true) {
    var that = this;
    if (loading) {
      wx.showLoading({
        title: 'README读取中',
      });
    }
    wx.request({
      url: app.config.apiUrl + "api/v5/repos/" + that.data.namespace + "/" + that.data.path + "/readme",
      method: "GET",
      data: {
        access_token: app.access_token,
        extend: "readme",
      },
      success: function (result) {
        that.getCommits(loading);
        if (result.data.hasOwnProperty("content")) {
          var readmeMarkdown = base64Helper.baseDecode(result.data.content);
          //TODO 码云图片不允许盗链 先搭个图片代理站用着
          readmeMarkdown = readmeMarkdown.replace(/images.gitee.com/g, 'gitee_image.hamm.cn');
          that.setData({
            readme: readmeMarkdown ? readmeMarkdown : "### No Readme File!"
          });
        } else {
          wx.stopPullDownRefresh();
          wx.hideLoading();
          wx.showModal({
            title: '读取README失败',
            content: result.data.message,
            showCancel: false,
          });
        }
      }
    });
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
        that.getReadme(false);
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
        that.getReadme(loading);
        if (!result.data.hasOwnProperty("message")) {
          that.setData({
            branchList: result.data
          });
        } else {
          wx.stopPullDownRefresh();
          wx.hideLoading();
          wx.showModal({
            title: '读取分支失败',
            content: result.data.message,
            showCancel: false,
          });
        }
      }
    });
  },
  getCommits: function (loading = true) {
    var that = this;
    if (loading) {
      wx.showLoading({
        title: '提交记录读取中',
      });
    }
    wx.request({
      url: app.config.apiUrl + "api/v5/repos/" + that.data.namespace + "/" + that.data.path + "/commits",
      method: "GET",
      data: {
        access_token: app.access_token,
        sha: that.data.branch,
        per_page: 5,
      },
      success: function (result) {
        that.getComments();
        if (!result.data.hasOwnProperty("message")) {
          that.setData({
            commitList: result.data
          });
        } else {
          wx.stopPullDownRefresh();
          wx.hideLoading();
          wx.showModal({
            title: '读取Commit失败',
            content: result.data.message,
            showCancel: false,
          });
        }
      }
    });
  },
  getComments: function (loading = true) {
    var that = this;
    if (loading) {
      wx.showLoading({
        title: '评论读取中',
      });
    }
    wx.request({
      url: app.config.apiUrl + "api/v5/repos/" + that.data.namespace + "/" + that.data.path + "/comments",
      method: "GET",
      data: {
        access_token: app.access_token,
        per_page: 5,
        direction: "desc",
        order: "desc"
      },
      success: function (result) {
        if (!result.data.hasOwnProperty("message")) {
          that.setData({
            commentList: result.data
          });
          wx.stopPullDownRefresh();
          wx.hideLoading();
        } else {
          wx.stopPullDownRefresh();
          wx.hideLoading();
          wx.showModal({
            title: '读取评论失败',
            content: result.data.message,
            showCancel: false,
          });
        }
      }
    });
  },
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: that.data.repoInfo.human_name,
      path: '/pages/repos/detail?namespace=' + that.data.namespace + '&path=' + that.data.path
    }
  }
})