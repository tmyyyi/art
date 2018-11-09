// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    author:'',
    price:'',
    workname:'',
    id:'',
    selected:false,
  },
  addtocart(){
    wx.showToast({
      title: '成功！ •ω•',
      image: '/assets/img/showcart.png',
      duration: 3000
    })
    console.log(this.data.id);
    const item = {
      id: this.data.id,      
      name:this.data.workname,
      price:this.data.price,
      selected: this.data.selected,
    }
    app.addtocart(item)
    app.setBadge();  
  },
  gotocart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      img: options.img,
      author: options.author,
      price: options.price,
      workname: options.workname,
      id: options.id
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