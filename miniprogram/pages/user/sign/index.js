// pages/signin/signin.js
const db = wx.cloud.database({
  env: "test-4gn9gu0ucc6657ba"
})
const _ = db.command
var util = require('../../../utils/time.js');


let app = getApp()
const key = app.globalData.key
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 日历
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    CustomBar: app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar,
    // 当前维度
    latitude: "",
    // 当前精度
    longitude: "",
    yesDate: [], //此处应该是接口返回的数据，先模拟了一个
    signinNow: false
  },
  // 签到

  // 获取用户当前地理位置


  // 是否可以签到
  activeSign() {
    let t = this;
    let nowdate = t.data.isToday;
    let dateArr = t.data.dateArr;
    let yesDate = t.data.yesDate;

    wx.requestSubscribeMessage({
      tmplIds: ['K7WmbKR5PRE_8c8Rv674eHXGayNyC4DHi1GrAs4exp4'],
      success(res) {
        for (var i = 0; i < dateArr.length; i++) {
          console.log(nowdate)
          if (Number(dateArr[i].isToday) == Number(nowdate)) {
            dateArr[i].choose = true;

            if (wx.getStorageSync("userid")) {
              console.log("asd")
              db.collection('user').doc(wx.getStorageSync("userid")).update({
                data: {
                  sign_data: _.push(nowdate),
                  sign: _.inc(1)
                },
                success: function (res) {
                  t.yesdate()
                  console.log("")
                  wx.showToast({
                    title: '签到成功',
                    icon: 'none',
                  })
                  db.collection('user').doc(wx.getStorageSync("userid")).get().then(res => {

                    function getCurrentTime() {
                      let date = new Date()
                      let Y = date.getFullYear()
                      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
                      let D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
                      let hours = date.getHours()
                      let minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
                      let seconds = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
                      date = Y + '.' + M + '.' + D + ' ' + hours + ':' + minutes + ':' + seconds
                      return date
                    }

                    console.log(res.data)
                    wx.cloud.callFunction({
                      name: 'answer',
                      data: {
                        name: res.data.nickName,
                        date: getCurrentTime(),
                      },
                      success: function (res) {
                        console.log(res.result.sum) // 3
                      },
                      fail: console.error
                    })
                  })
                  t.userlist()
                }
              })
              t.setData({
                signinNow: true,
                yesDate: yesDate
              })
            } else {
              wx.showToast({
                title: '您未登录不能签到',
                icon: 'none',
              })
            }
          }
        };
        t.setData({
          dateArr: dateArr
        })

      }
    })


  },
  // 签到过

  userlist() {
    wx.cloud.callFunction({
      name: 'userlist',
    }).then(res => {
      this.setData({
        userlist: res.result.data
      })
      console.log(this.data.userlist)
    })
  },

  yesdate() {
    let t = this;
    if (wx.getStorageSync("userid")) {
      db.collection('user').doc(wx.getStorageSync("userid")).get().then(res => {
        wx.hideLoading()
        let yesdate = res.data.sign_data
        let dateArr = t.data.dateArr;
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1;
        let day = now.getDate() + 1 < 10 ? "0" + String(now.getDate()) : now.getDate();
        let newdoy = '' + year + month + day
        if (res.data.sign_data) {
          res.data.sign_data.forEach(function (e) {
            if (Number(e) == Number(newdoy)) {
              t.setData({
                signinNow: true,
              })
            }
          });
        }

        for (var i = 0; i < dateArr.length; i++) {
          for (var j = 0; j < yesdate.length; j++) {
            if (dateArr[i].isToday == yesdate[j]) {
              dateArr[i].choose = true;
            }
          };
        }
        t.setData({
          dateArr: dateArr
        })

      })

    }



  },
  // 日历
  dateInit: function (setYear, setMonth) {
    let t = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth() //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1 < 10 ? '0' + String(i - startWeek + 1) : String(i - startWeek + 1);
        obj = {
          isToday: '' + year + ((month + 1) < 10 ? "0" + (month + 1) : (month + 1)) + num,
          dateNum: num,
          weight: 5,
          choose: false
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    t.setData({
      dateArr: dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1);
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      t.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      t.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    };
  },
  /**
   * 上月切换
   */
  lastMonth: function () {
    let t = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = t.data.month - 2 < 0 ? t.data.year - 1 : t.data.year;
    let month = t.data.month - 2 < 0 ? 11 : t.data.month - 2;
    t.setData({
      year: year,
      month: (month + 1)
    })
    t.dateInit(year, month);
    t.yesdate()
  },
  /**
   * 下月切换
   */
  nextMonth: function () {
    let t = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = t.data.month > 11 ? t.data.year + 1 : t.data.year;
    let month = t.data.month > 11 ? 0 : t.data.month;
    t.setData({
      year: year,
      month: (month + 1)
    })
    t.dateInit(year, month);
    t.yesdate()
  },
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        var latitude = res.latitude || 28.13551;
        var longitude = res.longitude || 113.03555;
        that.getWeather(`${latitude},${longitude}`)
      },
    })
  },
  getWeather(location) {
    wx.request({
      url: `${app.globalData.requestUrl.weather}`,
      data: {
        location,
        key,
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode === 200) {
          let data = res.data.HeWeather6[0];
          console.log(data);
          if (data.status === 'ok') {
            this.success(data, location)
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        })
      },
    })
  },
  success(data, location) {
    this.setData({
      openSettingButtonShow: false,
      searchCity: location,
    })
    wx.stopPullDownRefresh()
    let now = new Date()
    data.updateTime = now.getTime()
    data.updateTimeFormat = util.formatDate(now, "MM-dd hh:mm")
    this.setData({
      cityDatas: data,
    })
  },

  time_get() {
    var that = this;
    var time = parseInt(new Date().getHours()); //返回小时数
    if (7 < time && time < 11) {
      this.setData({
        wh_tl: "早上好"
      })
    } else if (11 <= time && time < 17) {
      this.setData({
        wh_tl: "中午好"
      })
    } else {
      this.setData({
        wh_tl: "下午好"
      })
    }
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中…',
      mask: true
    })
    let t = this;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1;
    let day = now.getDate() + 1 < 10 ? "0" + String(now.getDate()) : now.getDate();
    var time = year + '年' + month + '月' + day + '日';

    this.time_get()
    var time2 = util.formatTime(new Date());
    var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六")
    var week = weekArray[new Date(time2).getDay()] //判断今天周几
    t.dateInit();
    t.setData({
      year: year,
      time,
      week,
      month: Number(month),
      isToday: '' + year + month + day
    });
    t.yesdate()
    this.userlist()
    this.getLocation();


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    function getCurrentTime() {
      let date = new Date()
      let Y = date.getFullYear()
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      let D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
      date = Y + '.' + M + '.' + D + ' ' + hours + ':' + minutes + ':' + seconds
      return date
    }

  },




})