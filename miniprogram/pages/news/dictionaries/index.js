import task from "../../../utils/request.js"
Component({
  data: {
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [{
        id: 0,
        name: "HTML",
        color: "bg-blue"
      }, {
        id: 1,
        name: "Vue3",
        color: "bg-green"
      }, {
        id: 2,
        name: "Css",
        color: "bg-orange "
      },
      {
        id: 3,
        name: "Js",
        color: "bg-olive"
      },
      {
        id: 4,
        name: "JSON",
        color: "bg-brown "
      },
      {
        id: 5,
        name: "Ts",
        color: "bg-cyan "
      },
      {
        id: 6,
        name: "AJAX",
        color: "bg-cyan "
      },
    ],
    load: true,
    loding: true
  },

  created() {
    this.post()
  },

  methods: {
    post() {
      this.setData({
        loding: true
      })
      task.Tree_cloud(
        "dictionaries_list",
      ).then(res => {
        this.setData({
          list2: res.data,
          loding: false
        })
      })
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      })
    },
    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
    VerticalMain(e) {
      let that = this;
      let list = this.data.list;
      let tabHeight = 0;
      if (this.data.load) {
        for (let i = 0; i < list.length; i++) {
          let view = wx.createSelectorQuery().in(this).select("#main-" + list[i].id);
          view.fields({
            size: true
          }, data => {
            list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            list[i].bottom = tabHeight;
          }).exec();
        }
        that.setData({
          load: false,
          list: list
        })
      }
      let scrollTop = e.detail.scrollTop + 20;
      for (let i = 0; i < list.length; i++) {
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setData({
            VerticalNavTop: (list[i].id - 1) * 50,
            TabCur: list[i].id
          })
          return false
        }
      }
    }
  }
})