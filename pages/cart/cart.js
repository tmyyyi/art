// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    selectAll: false,
    totalPrice:0,
    delectindex:[] 
  },
  goother(){
    wx.switchTab({
      url: '/pages/mall/mall'
    })
  },
  // 加减
  increase(e){
    const n = e.currentTarget.dataset.index;
    app.inc(n);
    this.setData({
      cartList: wx.getStorageSync('detail-cart') || []  
    })
    this.totalcount()    
  },
  minus(e){
    const n = e.currentTarget.dataset.index;
    app.minus(n),
    this.setData({
      cartList: wx.getStorageSync('detail-cart') || []
    })
    this.totalcount()    
  },

  //计算总价
  totalcount(){
    let cartList = this.data.cartList;
    let total = 0;
    const newcartList = cartList.filter(item => item.selected === true)
    if(newcartList!=""){
      total=newcartList.reduce((result,item) => {
        return result += item.count*item.price
      },0)
    }
    this.setData({
      totalPrice: total,
      cartList:cartList
    })
  },
  //单选
  checkchange(e){
    const index = e.currentTarget.dataset.index;
    const cartList = this.data.cartList;
    const selected = cartList[index].selected;
    cartList[index].selected = !selected;
    //判断是否全选
    const item = cartList.filter(item=>item.selected===true)    
    if(item.length==cartList.length){
      this.setData({
        selectAll: true
      })
    }else{
      this.setData({
        selectAll: false
      })
    }
    this.setData({
      cartList: cartList
    })
    this.totalcount()
  },

  //全选
  selectedall(){
    const selectAll = !this.data.selectAll;
    const cartList = this.data.cartList;
    cartList.map(item => {
      return item.selected = selectAll
    })
    console.log(cartList)
    this.setData({
      selectAll : selectAll,
      cartList : cartList
    })
    this.totalcount()
  },

  //删除
  delete(e){
    let cartList = this.data.cartList;
    const n = e.currentTarget.dataset.index;
    wx.showModal({
      title: 'o(╥﹏╥)o',
      content: '确认删除吗？',
      cancelText:'再想想~',
      confirmText:'再见了',
      success:(res)=>{
        if (res.confirm) {
          app.delete(n)   
          this.setData({
            cartList: wx.getStorageSync('detail-cart') || []
          }) 
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      cartList: wx.getStorageSync('detail-cart') || [],     
    }),
    app.setBadge();   
    
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