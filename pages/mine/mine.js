const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    address:''
  },
  manageaddress(){
    console.log(2)
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  tologin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  logout(){
    this.setData({
      userInfo:{},
      canIUse:false,
      address:''
    })
    wx.removeStorageSync("userInfo")
  },
  dingwei(){
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          address:res.address
        })
      },
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {  

  },
  
  //从登录页面跳转过来时执行
  onShow:function(){
    const storage = wx.getStorageSync("userInfo") || {}
    if (storage) {
      console.log("get", storage)
      this.setData({
        userInfo: storage,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})