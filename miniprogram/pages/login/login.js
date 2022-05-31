// pages/login/login.js
const { envId } = require("../../envList")
var db = wx.cloud.database({env: envId});
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '欢迎登录WXapp',
    userId: '',
    userPassword: '',
    userInfo: {},
    id_token: '',//方便存在本地的locakStorage
    response: '' //存取返回数据
  },

  userIdInput: function (e) {
    this.setData({
      userId: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  logIn: function (e) {
    var that = this
    // wx.getUserInfo({
    //   success: function(res) {
    //     this.setData({
    //       userInfo: res.userInfo
    //     })
    //   }
    // })
    // console.log("userInfo:",that.data.userInfo)
    const userName = wx.getStorageSync('userName')
    wx.cloud.callFunction({
      name: 'fastApptFunction',
      data: {
        type: 'loginAndBindId',
        userId: this.data.userId,
        userPassword: this.data.userPassword,
        userName: userName
      },
      success: function (res) {
        // if(res)
        console.log("logIn:",res)
        if(res.result.status === 'success'){
          wx.showToast({
            title: '登录成功',
          })
          wx.setStorageSync('userId',that.data.userId)
          wx.setStorageSync("openId", res.result.openId);
          wx.switchTab({
            url: "/pages/index/index"
          })
        } else {
          wx.setStorageSync("userName", "");
          wx.setStorageSync("userImg", "");
          wx.showToast({
            title: res.result.status,
          })
        }
        
      },
      fail: function (err) {
        wx.setStorageSync("userName", "");
        wx.setStorageSync("userImg", "");
        wx.showToast({
          title: err,
        })
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