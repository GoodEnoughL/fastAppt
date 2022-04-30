// pages/user/user.js

//var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderAmount: '',
    sts: '',
    collectionCount: 0,
    userInfoGridStatus: "false",
    openid: "",
    isHide: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOpenid();
    var openid = this.data.openid,
    userId = wx.getStorageSync("userId"), 
    userImg = wx.getStorageSync("userImg"), 
    userName = wx.getStorageSync("userName");
    if (userId) {
      this.setData({
        isHide: false,
        userName: userName,
        userImg: userImg,
        userId: userId
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onSetClick: function onSetClick() {
    wx.navigateTo({
      url: "/pages/set/index/index"
    });
  },

  

  toAddressList: function() {
    wx.navigateTo({
      url: '/pages/delivery-address/delivery-address',
    })
  },


  toOrderListPage: function(e) {
    var sts = e.currentTarget.dataset.sts;
    console.log("toOrderListPage:",e)
    const url = '/pages/apptIndex/apptIndex?status=' + e.currentTarget.id
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 查询所有的收藏量
   */
  showCollectionCount: function() {
    var ths = this;
    wx.showLoading();
    var params = {
      url: "/p/user/collection/count",
      method: "GET",
      data: {},
      callBack: function(res) {
        wx.hideLoading();
        ths.setData({
          collectionCount: res
        });
      }
    };
    
  },
  /**
   * 我的收藏跳转
   */
  myCollectionHandle: function() {
    var url = '/pages/prod-classify/prod-classify?sts=5';
    var id = 0;
    var title = "我的收藏商品";
    if (id) {
      url += "&tagid=" + id + "&title=" + title;
    }
    wx.navigateTo({
      url: url
    })
  },



  //授权
  getUserInfoClick: function getUserInfoClick(e) {
    console.log("getUserInfoClick:",e)
    var _this = this;
    var d = e.detail.userInfo;
    this.setData({
      userImg: d.avatarUrl,       
      isHide: false
    });
    wx.setStorageSync("userName", d.nickName);
    wx.setStorageSync("userImg", d.avatarUrl);
    var db = wx.cloud.database();
    var _ = db.command;
    db.collection("user").where({
      openid: this.data.openid
    }).get({
      success: function success(res) {
        console.log("查询用户:", res);
        if (res.data && res.data.length > 0) {
          console.log("已存在");
          wx.setStorageSync("userId", res.data[0].userId);
          wx.setStorageSync("openId", res.data[0].openid);
          console.log(res.data[0].userId);
        } else {
          setTimeout(function () {
            var userImg = d.avatarUrl,
              userName = d.userName,
              userId;
            if (!userId) {
              userId = _this.getUserId();
            }
            // db.collection("user").add({
            //   data: {
            //     userId: userId,
            //     userImg: userImg,
            //     userName: userName,
            //     iv: d.iv
            //   },
            wx.cloud.callFunction({
              name: 'addUser',
              data: {
                userId: userId,
                userImg: userImg,
                userName: userName,
              },
              success: function success(res) {
                wx.showToast({
                  title: "注册成功"
                });
                console.log('云addUser: ', res,res.result.openid)
                console.log("用户新增成功");
                db.collection("users").where({
                  userId: userId
                }).get({
                  success: function success(res) {
                    wx.setStorageSync("openId", res.data[0]._openid);
                  },
                  fail: function fail(err) {
                    console.log("openId缓存失败");
                  }
                });
              }
            });
          }, 100);
        }
      }
    });
    this.onLoad();
  },
  // 获取用户openid
  getOpenid: function getOpenid() {
    var _this2 = this;
    // let that = this;
    wx.cloud.callFunction({
      name: "getOpenId",
      config: {
        env: "cloud1-5gukdsmgf9c78413"
      },
      complete: function complete(res) {
        console.log("云函数获取到的openid: ", res);
        var openid = res.result.openid;
        _this2.setData({
          openid: openid
        });
        console.log(_this2.data.openid);
      }
    });
  },
  getUserId: function getUserId() {
    // var w = "abcdefghijklmnopqrstuvwxyz0123456789",
    //   firstW = w[parseInt(Math.random() * (w.length))];
    var firstW = "user";
    var userId = firstW + Date.now() + (Math.random() * 1e5).toFixed(0);
    console.log(userId);
    wx.setStorageSync("userId", userId);
    return userId;
  },


})