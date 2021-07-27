// pages/signin/signin.js
const db = wx.cloud.database({
  env: "test-4gn9gu0ucc6657ba"
})
const _ = db.command
var util = require('../../../utils/time.js');
const app = getApp();
Component({

  /**
   * 页面的初始数据
   */
  data: {
    // 日历
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    signinNow: false
  },

  lifetimes: {
    attached: function () {
      this.yesdate()
      this.userlist()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    data_time(e) {
      this.setData({
        isToday: e.currentTarget.dataset.datenum
      });
      console.log(e.currentTarget.dataset)
    },
    userlist() {
      let t = this;
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1;
      t.dateInit();
      console.log(year, month)
      this.setData({
        year: year,
        month: Number(month),
        isToday: '' + year + month + now.getDate()
      });
      console.log('' + year + month + now.getDate())
    },
    // 已签到日期
    yesdate() {
      let t = this;
      db.collection('user').doc(wx.getStorageSync("userid")).get().then(res => {
        let yesdate = res.data.sign_data
        let dateArr = t.data.dateArr;
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1;
        let newdoy = '' + year + month + now.getDate()
        res.data.sign_data.forEach(function (e) {
          if (e == Number(newdoy)) {
            t.setData({
              signinNow: true,
            })
          }
        });
        for (var i = 0; i < dateArr.length; i++) {
          for (var j = 0; j < yesdate.length; j++) {
            if (dateArr[i].isToday == yesdate[j]) {
              dateArr[i].choose = true;
              console.log(dateArr[i])
            }
          };
        }
        t.setData({
          dateArr: dateArr
        })
      })
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
      console.log(nowMonth)
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
  }
})