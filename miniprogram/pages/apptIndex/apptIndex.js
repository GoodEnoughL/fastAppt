// pages/apptIndex/apptIndex.js
// const { envId } = require("../../../cloudbaserc.json")
const { envId } = require("../../envList")
const { timestampToTime } = require("../../util/index")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointment: [],
    status: "allAppt"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: options.status
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
    // console.log("env",this.data.envId)
    this.getApptIndex()
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

  },
  
   getApptIndex: async function (params) {
     const userId = wx.getStorageSync('userId')
    wx.cloud.callFunction({
      name: "fastApptFunction",
      config: {
        env: envId
      },
      data: {
        type: "getApptIndex",
        userId: userId
      }
    }).then(res=>{
      console.log("getApptIndex",res)
      const appointment = res.result.data
      const nowTime = Date.now()
      appointment.map(x=>{
        let ddes = parseInt(x.apptDate)+parseInt(x.appttime)*1000
        x.dateDes = timestampToTime(new Date(ddes)) 
        x.dateEndDes = timestampToTime(new Date(ddes+parseInt(x.apptEndTime)*1000)) 
        if(nowTime < ddes) {
          x.status = 'pendingAppt'
          x.statusAlias = '未使用'
        } 
        else if(nowTime >= ddes && nowTime < parseInt(x.apptDate) +( parseInt(x.appttime) + parseInt(x.apptEndTime)) *1000) {
          x.status = 'runningAppt'
          x.statusAlias = '使用中'
        }
        else {
          x.status = 'expireAppt'
          x.statusAlias = '已过期'
        }
      })
      this.setData({
        appointment: appointment   
      })
      console.log("res",appointment)
    },err=>{
      console.log("err",err)
    })
  },

//   timestampToTime: function(timestamp) {
//     var date = new Date(timestamp);
//     var Y = date.getFullYear() + '-';
//     var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//     var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
//     var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
//     var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
//     var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    
//     let strDate = Y+M+D+h+m+s;
//     return strDate;
// }
})