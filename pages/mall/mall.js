// pages/mall/mall.js
import ajax from "../../utils/request.js";
const app = getApp();
Page({
  data: {
    currentTab: 0, 
    alllist:[], 
    recomendlist:[],
    limitlist:[],
    page:1,
    total:0,
    count:10
  },

  // 搜索
  gotosearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  
  //全部显示的内容
  all(e){
    this.setData({
      currentTab: e.currentTarget.dataset.current      
    })
  },

  recomend(e){
    // 请求推荐的内容
    ajax.get("https://openapi.ywart.com/2.0/api/AppView/Index/New2?_=1541580718252")
      .then(resp => {
        this.setData({
          recomendlist: resp.data.Body.Recommends.Artworks
        })
      })
    this.setData({
      currentTab: e.currentTarget.dataset.current      
    })
  },

  limitbuy(e){
    // 请求限时秒杀的商品
    ajax.get("https://openapi.ywart.com/2.0/api/AppView/Index/New2?_=1541580718252")
      .then(resp => {
        this.setData({
          limitlist: resp.data.Body.SetPriceAction.Artworks
        })
        console.log(this.data.limitlist)
      })
    this.setData({
      currentTab: e.currentTarget.dataset.current
    })
  },

  // 跳转到详情页
  gotoDetail(e) {
    const n = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?img=${n.img}&author=${n.author}&price=${n.price}&workname=${n.workname}&id=${n.id}`
    })
    console.log(e.currentTarget)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求全部的商品
    ajax.get("https://openapi.ywart.com/2.0/api/AppView/Index/RecommendArtWork?_=154155414")
    .then(resp => {
      this.setData({
        alllist: resp.data.Body
      })   
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})