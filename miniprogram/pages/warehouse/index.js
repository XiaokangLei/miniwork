const app = getApp()

/**
 * 页面的初始数据
 */
Component({
  data: {
    type_value: "all",
    type_name: "我全部的",
    loding:true,
    typeList: [{
        "type_name": "我全部的",
        "type_value": "all"
      },
      {
        "type_name": "我创建的",
        "type_value": "owner"
      },
      {
        "type_name": "我个人的",
        "type_value": "personal"
      },
      {
        "type_name": "我加入的",
        "type_value": "member"
      },
      {
        "type_name": "我公开的",
        "type_value": "public"
      },
      {
        "type_name": "我私有的",
        "type_value": "private"
      }
    ],
    order_value: "desc",
    order_name: "倒序排列",
    orderList: [{
        order_value: "desc",
        order_name: "倒序排列",
      },
      {
        order_value: "asc",
        order_name: "升序排列",
      }
    ],
    sort_value: "pushed",
    sort_name: "推送时间",
    sortList: [{
        sort_value: "created",
        sort_name: "创建时间",
      },
      {
        sort_value: "updated",
        sort_name: "更新时间",
      },
      {
        sort_value: "pushed",
        sort_name: "推送时间",
      },
      {
        sort_value: "full_name",
        sort_name: "仓库名称",
      },
    ],
    //分页开始
    page: 1,
    isGetingData: false,
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '数据加载中',
    });
    app.loadFont();
  },
  /**
   * 页面显示事件
   */
  onShow: function () {
    var that = this;
    app.getUserInfo(function (result) {
      if (result) {
        that.getList();
      } else {
        app.loginFirst();
      }
    });
  },
  /**
   * 下拉刷新事件
   */

  created(){
    var that = this;
    app.getUserInfo(function (result) {
      console.log(result)
      if (result) {
        that.getList();
      } else {
        app.loginFirst();
      }
    });

  },
 methods:{
  getList: function () {
    var that = this;
    if (that.data.isGetingData) {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      return;
    }
    that.data.isGetingData = true;
    wx.request({
      url: app.config.apiUrl + "api/v5/user/repos",
      method: "GET",
      data: {
        access_token: app.access_token,
        type: that.data.type_value,
        sort: that.data.sort_value,
        direction: that.data.order_value,
        page: that.data.page,
      },
      success: function (result) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (result.data.hasOwnProperty("message")) {
          wx.showModal({
            title: '获取失败',
            content: "你可以尝试重新登录或稍后再试",
            showCancel: false,
            success(res) {
              wx.navigateBack();
            }
          });
        } else {
          if (that.data.page == 1) {
            that.setData({
              list: result.data,
              loding:false
            });
          } else {
            var _list = that.data.list;
            for (var i = 0; i < result.data.length; i++) {
              _list.push(result.data[i]);
            }
            that.setData({
              list: _list,
              loding:false
            });
          }
        }
        that.data.isGetingData = false;
      }
    });
  },
  /**
   * 选择器更改事件
   * @param {object} e 
   */
  typeChanged: function (e) {
    var that = this;
    var menuList = [];
    for (var i in that.data.typeList) {
      menuList.push(that.data.typeList[i].type_name);
    }
    wx.showActionSheet({
      itemList: menuList,
      success: function (ret) {
        that.setData({
          type_name: that.data.typeList[ret.tapIndex].type_name,
          type_value: that.data.typeList[ret.tapIndex].type_value,
          page: 1,
        });
        that.getList();
      }
    });
  },
  /**
   * 选择器更改事件
   * @param {object} e 
   */
  sortChanged: function (e) {
    var that = this;
    var menuList = [];
    for (var i in that.data.sortList) {
      menuList.push(that.data.sortList[i].sort_name);
    }
    wx.showActionSheet({
      itemList: menuList,
      success: function (ret) {
        that.setData({
          sort_name: that.data.sortList[ret.tapIndex].sort_name,
          sort_value: that.data.sortList[ret.tapIndex].sort_value,
          page: 1,
        });
        that.getList();
      }
    });
  },
  /**
   * 选择器更改事件
   * @param {object} e 
   */
  orderChanged: function (e) {
    var that = this;
    var menuList = [];
    for (var i in that.data.orderList) {
      menuList.push(that.data.orderList[i].order_name);
    }
    wx.showActionSheet({
      itemList: menuList,
      success: function (ret) {
        that.setData({
          order_name: that.data.orderList[ret.tapIndex].order_name,
          order_value: that.data.orderList[ret.tapIndex].order_value,
          page: 1,
        });
        that.getList();
      }
    });
  }
 }

})