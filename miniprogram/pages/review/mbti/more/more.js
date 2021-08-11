var mbti = require('../../../../data/mbti_res.js')
function mbti_id(str) {//获取MBTI类型的index
  var table = mbti.mbti_id
  for (var i = 0; i < 16; i++) {
    if (str == table[i]) {
      return i
    }
  }
}
const MBTI = wx.getStorageSync("MBTI")
var yourvalue = []
const ei = ["E", "I"]
const sn = ["S", "N"]
const tf = ["T", "F"]
const jp = ["J", "P"]
var yourei = MBTI.charAt(0)
var yoursn = MBTI.charAt(1)
var yourtf = MBTI.charAt(2)
var yourjp = MBTI.charAt(3)
if (yourei == 'E') { yourvalue.push(0) }
else { yourvalue.push(1) }
if (yoursn == 'S') { yourvalue.push(0) }
else { yourvalue.push(1) }
if (yourtf == 'T') { yourvalue.push(0) }
else { yourvalue.push(1) }
if (yourjp == 'J') { yourvalue.push(0) }
else { yourvalue.push(1) }
var yourid = mbti_id(MBTI)

function choose_img(id) {
  var img_url
  switch (id) {
    case 0: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/40fEvXBPSZaqplMD*GxnWcrFiRAzSaFEpT.AlXhz3WA!/b/dFYBAAAAAAAA&bo=jQHhAAAAAAADB08!&rf=viewer_4"
      break
    case 1: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/VfD0Cv2KRZLnHr13e5sZrZG5YAgiYoIQ3*bPNd.wQwM!/b/dPQAAAAAAAAA&bo=jQHfAAAAAAADJ1E!&rf=viewer_4"
      break
    case 2: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/hihdQkz4FJ.yBfY8cuZa8qFUMQ96RRwZFGCC21IMQcs!/b/dPQAAAAAAAAA&bo=jQHhAAAAAAADJ28!&rf=viewer_4"
      break
    case 3: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/aTqjVF.lqXmDnyIWAl.Xz4dHtk6.dDwGv.HXYBH*Qv8!/b/dDwBAAAAAAAA&bo=WwIJAwAAAAADRzE!&rf=viewer_4"
      break
    case 4: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/GmhAYjmKMZ6bpGoHPEL8rVjQaMsEkInTBnb0.AJxzWE!/b/dD0BAAAAAAAA&bo=iwHfAAAAAAADJ1c!&rf=viewer_4"
      break
    case 5: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/TG1cHEM6vBH7hLVLENBYJm360W7SZs4*sTbW5lHZZGw!/b/dPQAAAAAAAAA&bo=iwHdAAAAAAADF2U!&rf=viewer_4"
      break
    case 6: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/bqfjUAcrxTz1hJZXx*8ZIhY7jzUqxnB81UUYyuT*Iv0!/b/dDwBAAAAAAAA&bo=iQHbAAAAAAADF2E!&rf=viewer_4"
      break
    case 7: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/OFVTipGg0b2h8WywzhkpDWv3eNF*mIXsTK8Z5*u6efE!/b/dPQAAAAAAAAA&bo=iwHfAAAAAAADF2c!&rf=viewer_4"
      break
    case 8: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/PjnIJ0Tn4OBAgdt4IQxxqBXwCQbPR0j9javZuv9nRqw!/b/dPQAAAAAAAAA&bo=iwHdAAAAAAADJ1U!&rf=viewer_4"
      break
    case 9: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/jVg1g8yyX2sO*PIIUlQlVnuXoICBSz21zobInYypFhM!/b/dI4BAAAAAAAA&bo=iwHdAAAAAAADF2U!&rf=viewer_4"
      break
    case 10: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/YvmhrnZCcnC4JR8HtyGazy23o1Oeby0zD7vxHEzjaiY!/b/dOIAAAAAAAAA&bo=iQHfAAAAAAADF2U!&rf=viewer_4"
      break
    case 11: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/QOSU6aSl5.FhHwFtW*bx.1X0hjujGZwpHkANvfTgp4o!/b/dPQAAAAAAAAA&bo=jQHfAAAAAAADJ1E!&rf=viewer_4"
      break
    case 12: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/MvLQ.Yjd3ZQ4Ab*gHGyjFTE9ia0XgRfjudeZ8xB3hho!/b/dDwBAAAAAAAA&bo=jQHfAAAAAAADJ1E!&rf=viewer_4"
      break
    case 13: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/OhMSRxuT7H*4QLRTYGfblUQEIhB3vAcdoozqDyjoJm8!/b/dI4BAAAAAAAA&bo=jQHfAAAAAAADF2E!&rf=viewer_4"
      break
    case 14: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/PvJqPvYBMLpdwmHOvS2qLtoO9q1B.0iWYOY0tIpslH0!/b/dFYBAAAAAAAA&bo=iwHfAAAAAAADJ1c!&rf=viewer_4"
      break
    case 15: img_url = "http://m.qpic.cn/psb?/V11Tp57c2B9kPO/VPtdCjMQesL*IkULFsPjLsXitsj3fDxg4C.DLw22cOM!/b/dHIAAAAAAAAA&bo=iwHfAAAAAAADJ1c!&rf=viewer_4"
  }
  return img_url
}

Page({

  data: {
    eis: ei, sns: sn,
    tfs: tf, jps: jp,
    ei: yourei, sn: yoursn,
    tf: yourtf, jp: yourjp,
    value: yourvalue,
    id: yourid,
    mbtiEN: mbti.mbti_en,
    mbtiCN: mbti.mbti_cn,
    mbtiEasyDes: mbti.mbtiEasyDes,
    mbtiDesArr: mbti.mbti_des,
    img: choose_img(yourid),
  },

  bindChange: function (e) {
    const val = e.detail.value
    var ei = this.data.eis[val[0]]
    var sn = this.data.sns[val[1]]
    var tf = this.data.tfs[val[2]]
    var jp = this.data.jps[val[3]]
    var id = mbti_id(ei + sn + tf + jp)
    var img_url = choose_img(id)
    this.setData({
      ei: ei, sn: sn,
      tf: tf, jp: jp,
      id: id, img: img_url,
    })
  },

  onTapImg:function(){
    var that = this
    wx.previewImage({
      urls: [that.data.img]
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})