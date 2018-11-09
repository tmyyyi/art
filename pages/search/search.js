// pages/search/search.js
import ajax from "../../utils/request.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchHistory: [],
    inputText:'',
    history:[],
    hot:[],
    result:false
  },

  // 取消
  quxiao(){
    wx.switchTab({
      url: '/pages/mall/mall',
    })
  },
  //获取输入的数据
  getInput(e){
    this.setData({
      result: false
    })
    // console.log(e.detail.value)
    this.setData({
      inputText: e.detail.value
    })
    console.log(this.data.inputText)
  },
  //搜索开始
  gotodetail(){
    this.setData({
      result: true
    })
    console.log(".....")    
    const history = this.data.history
    if(history){
      if (history.length > 4) {
        history.pop();
      } else {
        history.unshift(this.data.inputText)
      }
      this.setData({
        history: history
      })
      this.sethistory()
    }else{
      const history = []
      history.push(this.data.inputText)
      this.setData({
        history: history
      })
      this.sethistory()
    }
  },
  //存历史数据
  sethistory(){
    wx.setStorageSync('history', this.data.history)
  },
  //取数据
  gethistory(){
    // const history = this.data.history
    // history = wx.getStorageSync('history')
    this.setData({
      history: wx.getStorageSync('history')
    })
  },

  // 清除历史记录
  clear() {
    console.log(2)
    this.data.history = [],
      wx.removeStorageSync('history')
    this.setData({
      history:[]
    })
  },
  //获取热门数据
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethistory()
    ajax.get("https://openapi.ywart.com/2.0/api/AppView/Index/New2?_=1541580718252")
    .then(resp=>{
      this.setData({
        hot:resp.data.Body.Recommends.Artworks        
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
    this.setData({
      result: false
    })
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