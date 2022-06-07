var app = getApp()
import api from "../../../utils/api.js"

Component({
  data: {},
  methods: {
    post() {
      api.GET_Resume.then(res => {
        this.setData({
          list: res
        })
      })
    },

    tz(e) {
      console.log(e.currentTarget.dataset)
      this.setData({
        urlshow: e.currentTarget.dataset.url
      })
      wx.downloadFile({
        url: e.currentTarget.dataset.url,
        filePath: `${wx.env.USER_DATA_PATH}/` + e.currentTarget.dataset.tille + '.docx',

        success: function (res) {
          const filePath = res.filePath
          console.log(filePath)
          wx.openDocument({
            filePath: filePath,
            showMenu: true,
            success: function (res) {
              console.log(filePath),
                console.log('打开成功')
            }
          })
        }
      }).onProgressUpdate((res) => {
        this.setData({
          tl: res.progress
        })
        console.log(res.progress);
      })
    },
  },
  created() {
    this.post()
    wx.setNavigationBarTitle({
      title: "简历模板"
    })
    wx.getSavedFileList({
      success(res) {
        console.log(res)
      }
    })
  },
})