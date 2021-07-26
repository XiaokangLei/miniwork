function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
 }
  
 function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
 }
 function formatTimeTwo(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (var i in returnArr) {
  format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
 }


 function  zeroFill (i) {
  if (i >= 0 && i <= 9) {
    return "0" + i;
  } else {
    return i;
  }
}

function getCurrentTime() {
  var date = new Date(); //当前时间

  var month = zeroFill(date.getMonth() + 1); //月
  var day = zeroFill(date.getDate()); //日
  var hour = zeroFill(date.getHours()); //时
  var minute = zeroFill(date.getMinutes()); //分
  var second = zeroFill(date.getSeconds()); //秒

  var curTime = date.getFullYear() + "-" + month + "-" + day +
    " " + hour + ":" + minute + ":" + second;

  return curTime;
}

function getCurrentTime2() {
  var date = new Date(); //当前时间
  var month = zeroFill(date.getMonth() + 1); //月
  var day = zeroFill(date.getDate()); //日
  var curTime = date.getFullYear() + "-" + month + "-" + day 
  return curTime;
}
  
 const getWeekByDate = dates => {
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  return show_day[day];
 }
 const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

 module.exports = {
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo,
  getCurrentTime:getCurrentTime,
  getCurrentTime2:getCurrentTime2,
  formatDate:formatDate,
  getWeekByDate: getWeekByDate
 }