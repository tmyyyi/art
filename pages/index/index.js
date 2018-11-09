//index.js
//获取应用实例
import ajax from "../../utils/request.js";
const app = getApp()

Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    HotOriginals: [],
    page:1,
    total:3
  },
  // 搜索
  gotosearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 滑动
  loadmore(){
    if(this.data.page<this.data.total){
    ajax.get("https://openapi.ywart.com/2.0/api/AppView/Index/New2?_=1541477288543")
      .then(resp => {
        // console.log(resp.data.Body.HotOriginals.Artworks)
        this.setData({
          HotOriginals: this.data.HotOriginals.concat(resp.data.Body.HotOriginals.Artworks),
          page:this.data.page+1
        })
      })  
    }
  },
  //事件处理函数
  gotoDetail(e){
    const n = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?img=${n.img}&author=${n.author}&price=${n.price}&workname=${n.workname}&id=${n.id}`         
    })
    console.log(e.currentTarget)
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    ajax.get("https://openapi.ywart.com/2.0/api/AppView/Index/New2?_=1541477288543")
    .then(resp=>{
      this.setData({
        imgUrls: resp.data.Body.Banners.Banners,
        HotOriginals: resp.data.Body.HotOriginals.Artworks
      })
    })
    // wx.request({
    //   url: 'https://openapi.ywart.com/2.0/api/AppView/Index/New2?_=1541477288543',
    //   success: (resp) => {
    //     // console.log(resp.data.Body.Banners.Banners)
    //     // console.log(resp.data.Body.HotOriginals.Artworks[0])        
    //     this.setData({
    //       imgUrls : resp.data.Body.Banners.Banners,
    //       HotOriginals: resp.data.Body.HotOriginals.Artworks
    //     })
    //   }
    // })
    

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
