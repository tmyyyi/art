//app.js
App({
  cart: wx.getStorageSync('detail-cart')||[], 
  setBadge(){
    const total=this.cart.reduce((result,item)=>{
      result +=item.count;
      return result;
    },0)
    // console.log(cartcount)
    wx.setTabBarBadge({
      index: 2,
      text: `${total}`
    })
  },
  //添加购物车
  addtocart(item){
    const isIncart = this.cart.some(cartItem => cartItem.id === item.id);
    if(isIncart) {
      this.cart = this.cart.map(cart => {
        if(cart.id === item.id) {
          cart.count ++;
        }
        return cart;       
      })
    }else{
      this.cart.push({
        ...item,
        count: 1        
      });      
      this.setBadge()              
    }
    wx.setStorageSync('detail-cart', this.cart)
    this.setBadge();
  },
  //增加数量
  inc(n){
    this.cart[n].count += 1;
    wx.setStorageSync('detail-cart', this.cart)
    this.setBadge();
  },
  //减
  minus(n){
    if (this.cart[n].count<1) {
      const index = n;
      wx.showToast({
        title: '不能再减少啦~',
        image: '/assets/img/biaoqin2.png',
        duration: 3000
      })
    }else{
      this.cart[n].count -= 1;
      wx.setStorageSync('detail-cart', this.cart)
      this.setBadge();
    } 
  },
  //删除
  delete(n) {
    const cart = this.cart
    cart.splice(n,1)
    wx.setStorageSync('detail-cart', cart) 
    this.setBadge();   
  },


  onShow:function() {
    this.setBadge()
  },

  onLaunch: function () {
    this.setBadge();
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log("aaa",res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})