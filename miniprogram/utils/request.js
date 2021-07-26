const app = getApp()

function Tree_cloud(name, data) {
  console.log(app.config.mock)
  if (app.config.mock) {
    console.log("1")
    wx.showToast({
      title: '您未开启云环境，进入开发环境',
    })
    let promise = new Promise(function (resolve, reject) {
      resolve("1");

    })
    return promise
  } else {
    let promise = new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name,
        data,
        success: function (res) {
          resolve(res.result);
        },
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: String(res),
            icon: 'none',
            duration:3000
          })
          reject(res.result);
        }
      })
    })
    return promise
  }

}

function Tree_get(data) {
  if (app.config.mock) {
    wx.showToast({
      title: '您未开启云环境，进入开发环境',
    })
    var str = "123";
    console.log(data)
console.log(data.collectionName=="press");
//  if()
    let promise = new Promise(function (resolve, reject) {


      wx.request({
        url: baseURL + url,
        method: method,
        data: method === POST ? JSON.stringify(data) : data,
        header: header,
        success(res) {
      
        },
        fail(err) {
            //请求失败
            reject(err)
        }
    })

    })

   
  } else {

    let promise = new Promise(function (resolve, reject) {
    data.get({
      success: function (res) {
        resolve(res.data);
      },
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: String(res),
          icon: 'none',
          duration:3000
        })
        reject(res.result);
      }
    })
    })
    return promise
  }

}
module.exports = {
  Tree_cloud,
  Tree_get
}