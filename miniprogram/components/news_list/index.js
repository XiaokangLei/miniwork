// components/tree_list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {


  },
  properties: {
   list: {
    type: Object,
      default: ''
    }, 
    loding: {
      type:Boolean,
        default: true
      }, 
     phb: {
        type:Boolean,
          default: false
        }, 
  },
  observers: {
    'list': function (list) {
      if(list){
        this.setData({
          loding:false
        })
      }

    }
  },

  methods: {
    tz(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },
  }
})
