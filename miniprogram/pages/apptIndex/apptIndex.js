// pages/apptIndex/apptIndex.js
// const { envId } = require("../../../cloudbaserc.json")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointment: []
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
   
    wx.cloud.callFunction({
      name: "fastApptFunction",
      config: {
        env: "cloud1-5gukdsmgf9c78413"
      },
      data: {
        type: "getApptIndex",
      }
    }).then(res=>{
      
      const appointment = res.result.data
      appointment.map(x=>{
        let ddes = parseInt(x.apptDate)+parseInt(x.appttime)*1000
        x.dateDes =this.timestampToTime(new Date(ddes)) 
      })
      this.setData({
        appointment: appointment
      })
      console.log("res",appointment)
    },err=>{
      console.log("err",err)
    })
  },

  timestampToTime: function(timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    
    let strDate = Y+M+D+h+m+s;
    return strDate;
}
})