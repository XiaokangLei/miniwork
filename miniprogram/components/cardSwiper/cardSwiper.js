import TouchEvent from "./utils/touchEvent";
const db = wx.cloud.database({
  env: "test-4gn9gu0ucc6657ba"
})
const _ = db.command
const app = getApp()
Component({
  properties: {
    data: Array
  },

  options: {
    multipleSlots: true
  },

  data: {
    isLoading: false,
    swiperData: [],
    swiperCurIndex: 0,
    slideClass: "",
    lockSwipe: false
  },

  lifetimes: {
    created() {
      console.log(this.data.data)
      this.data.swiperData = this.data.swiperData.concat(this.data.data);
      new TouchEvent(this, "touchCard", {
        swipe: evt => {
          //在touch结束触发，evt.direction代表滑动的方向 ['Up','Right','Down','Left']
          if (evt.direction === "Up") this.next(evt);
          if (evt.direction === "Down") this.prev(evt);
        }
      });
    },
    attached(){

      this.post()
    }
  },

  methods: {
    post(){
      db.collection('encourage').get().then(res => {
        let result = res.data
        this.setData({
          swiperData: result
        })
        console.log(res)
      })
  
    },
    next(e) {
      if (this.data.lockSwipe) return;
      this.data.lockSwipe = true;
      if (-this.data.swiperCurIndex >= this.data.swiperData.length - 1)
        return (this.data.lockSwipe = false);

      if (-this.data.swiperCurIndex >= this.data.swiperData.length - 3) {
        this.loadMore();
      }

      const index = e.currentTarget.dataset["index"];
      this.setData({["swiperData[" + index + "].slideClass"]: " ani-slide-up"}, () => {
        this.setData({
          swiperCurIndex: --this.data.swiperCurIndex
        });
      })

      setTimeout(() => {
        this.data.lockSwipe = false;
        this.setData({
          ["swiperData[" + index + "].slideClass"]: ""
        });
      }, 590);
    },

    prev(e) {
      const index = e.currentTarget.dataset["index"] - 1;
      if (this.data.lockSwipe || index < 0) return;
      this.data.lockSwipe = true;
      this.setData({
        ["swiperData[" + index + "].slideClass"]: " ani-slide-down",
        swiperCurIndex: ++this.data.swiperCurIndex
      });

      setTimeout(() => {
        this.data.lockSwipe = false;
        this.setData({
          ["swiperData[" + index + "].slideClass"]: ""
        });
      }, 590);
    },

    loadMore() {
      this.isLoading = true;
      this.triggerEvent("loadmore", {addToList: this.addToList.bind(this)});
    },

    addToList(list) {
      this.isLoading = false;
      this.setData({
        swiperData: this.data.swiperData.concat(list)
      });
    }
  }
});
