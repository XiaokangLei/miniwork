// pages/test/test.js
var mbti = require('../../../../data/mbti.js')

var numOfAll = 87 //题目总数

function ques_id(i) { //获取MBTI问题的index
  if (i < 26) {
    return i + 1
  } else {
    if (i >= 57 && i <= 76) {
      return i - 30
    } else {
      return 47
    }
  }
}

Page({

  data: {
    id: 0,
    qid: 1,
    numOfAll: numOfAll,
    question: mbti.mbti_question,
    ans: mbti.mbti_ans,
    boolReturn: false,
    boolSkip: false,
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  },

  //选择了一个答案，触发：
  on_ans: function (envent) {
    var old_id = envent.currentTarget.dataset.id
    var bool = envent.currentTarget.dataset.bool
    var id = old_id + 1
    var qid = ques_id(id)
    this.setData({
      id: id
    })
    this.setData({
      qid: qid
    })
    this.setData({
      boolReturn: true
    })
    //根据mbti.js中的规则更改八维的值
    var rule = mbti.mbti[old_id]
    var theDem = rule.type;
    if ((rule.btype == "true" && bool == true) || (rule.btype == "false" && bool == false)) {
      switch (theDem) {
        case "E":
          var temp = this.data.E + 1
          this.setData({
            E: temp
          })
          break
        case "S":
          var temp = this.data.S + 1
          this.setData({
            S: temp
          })
          break
        case "T":
          var temp = this.data.T + 1
          this.setData({
            T: temp
          })
          break
        case "J":
          var temp = this.data.J + 1
          this.setData({
            J: temp
          })
          break
        default:
          console.log("no mbti switch")
      }
    } else {
      switch (theDem) {
        case 'E':
          var temp = this.data.I + 1
          this.setData({
            I: temp
          })
          break
        case "S":
          var temp = this.data.N + 1
          this.setData({
            N: temp
          })
          break
        case "T":
          var temp = this.data.F + 1
          this.setData({
            F: temp
          })
          break
        case "J":
          var temp = this.data.P + 1
          this.setData({
            P: temp
          })
          break
        default:
          console.log("no mbti switch")
      }
    }
    //更新新旧缓存
    var tempSto = wx.getStorageSync('eight')
    wx.setStorageSync('oldeight', tempSto)
    wx.setStorageSync('eight', {
      E: this.data.E,
      I: this.data.I,
      S: this.data.S,
      N: this.data.N,
      T: this.data.T,
      F: this.data.F,
      J: this.data.J,
      P: this.data.P,
    })
    //如果做完了numOfAll道题，那么判断MBTI类型：
    if (old_id >= numOfAll - 1) {
      this.jud()
    } else { //否则显示“跳过本题”
      var boolSkip = this.can_skip(id)
      this.setData({
        boolSkip: boolSkip
      })
    }
  },

  //判断MBTI类型：
  jud: function () {
    var rE = this.data.E,
      rI = this.data.I,
      rS = this.data.S,
      rN = this.data.N,
      rT = this.data.T,
      rF = this.data.F,
      rJ = this.data.J,
      rP = this.data.P;
    var rEI = (rE) / (rE + rI);
    var rSN = (rS) / (rS + rN);
    var rTF = (rT) / (rT + rF);
    var rJP = (rJ) / (rJ + rP);
    var res1 = rEI > 0.5 ? "E" : "I"
    var res2 = rSN > 0.5 ? "S" : "N"
    var res3 = rTF > 0.5 ? "T" : "F"
    var res4 = rJP > 0.5 ? "J" : "P"
    var result = res1 + res2 + res3 + res4

    //将测试结果存入缓存，跳换页面
    wx.setStorageSync('MBTI', result)
    wx.setStorageSync('E', rEI)
    wx.setStorageSync('S', rSN)
    wx.setStorageSync('T', rTF)
    wx.setStorageSync('J', rJP)
    wx.navigateTo({
      url: '/pages/review/mbti/result/result'
    })
  },

  //判断是否可以跳过，以E-I为例，E+I<=7时都不能跳过；E+I为8-15时，小/大<2/3才能跳过；E+I>15时，小/大<9/11就能跳过。
  can_skip: function (id) {
    var u = mbti.mbti[id]
    var char = u.type
    var pos, neg
    switch (char) {
      case "E":
        pos = this.data.E
        neg = this.data.I
        break
      case "S":
        pos = this.data.S
        neg = this.data.N
        break
      case "T":
        pos = this.data.T
        neg = this.data.F
        break
      case "J":
        pos = this.data.J
        neg = this.data.P
    }
    var n = pos + neg
    // console.log("pos=" + pos)
    // console.log("neg=" + neg)
    // console.log("n=" + n)
    if (n <= 7) { //n<=7
      return false
    } else {
      if (n > 15) { //n>15
        var p = neg / n
        if (p < 0.55 && p > 0.45) { //比值太接近0.5
          return false
        }
      } else { //7<n<=15
        var p = neg / n
        if (p > 0.4 && p < 0.5) { //比值太接近0.5
          return false
        }
      }
    }
    return true
  },

  //跳过本题：
  on_skip: function (envent) {
    var old_id = envent.currentTarget.dataset.id
    var id = old_id + 1
    this.setData({
      id: id
    })
    this.setData({
      qid: ques_id(id)
    })
    //如果做完了numOfAll道题，那么判断MBTI类型：
    if (id >= numOfAll) {
      this.jud()
    }
    //可以显示“返回上一题”了
    this.setData({
      boolReturn: true
    })
    //是否显示“跳过本题”
    var boolSkip = this.can_skip(id)
    this.setData({
      boolSkip: boolSkip
    })
  },

  //重做上一题：
  on_return: function (envent) {
    var old_id = envent.currentTarget.dataset.id
    var id = old_id - 1
    this.setData({
      id: id
    })
    this.setData({
      qid: ques_id(id)
    })
    this.setData({
      boolReturn: false
    })
    //将缓存eight改为oldeight
    var tempSto = wx.getStorageSync('oldeight')
    wx.setStorageSync('eight', tempSto)
    //将data中的八维数值数据改成与oldeight中的一致
    this.setData({
      E: tempSto.E
    });
    this.setData({
      I: tempSto.I
    })
    this.setData({
      S: tempSto.S
    });
    this.setData({
      N: tempSto.N
    })
    this.setData({
      T: tempSto.T
    });
    this.setData({
      F: tempSto.F
    })
    this.setData({
      J: tempSto.J
    });
    this.setData({
      P: tempSto.P
    })
    //是否显示“跳过本题”
    var boolSkip = this.can_skip(id)
    this.setData({
      boolSkip: boolSkip
    })
  },

  onLoad: function (options) {
    this.tag = false;
    if (wx.getStorageSync('eight')) {
      var id = wx.getStorageSync('test-id'),
        qid = wx.getStorageSync('test-qid'),
        eight = wx.getStorageSync('eight');
      this.setData({
        id: id,
        qid: qid
      });
      this.setData(eight);
    } else {
      console.log('restart');
      wx.setStorageSync('eight', {
        E: 0,
        I: 0,
        S: 0,
        N: 0,
        T: 0,
        F: 0,
        J: 0,
        P: 0,
      });
      wx.setStorageSync('oldeight', {
        E: 0,
        I: 0,
        S: 0,
        N: 0,
        T: 0,
        F: 0,
        J: 0,
        P: 0,
      });
    }
  },

  quit() {
    wx.setStorageSync('test-id', this.data.id);
    wx.setStorageSync('test-qid', this.data.qid);
    this.tag = true;
    wx.switchTab({
      url: '/pages/introduction/intr1'
    });
  },

  onUnload: function () {
    if (!this.tag) {
      wx.removeStorageSync('eight');
    }
    wx.removeStorageSync('oldeight');
  },

})