// pages/index/index.js
const { envId } = require("../../envList")
Page({
    /**
     * 页面的初始数据
     */
    data: {
		motto: 'MiHome_Store',
		userInfo: {},
		indicatorDots: true,
		autoplay: true,
		interval: 3000,
		duration: 100,
		backgroundData: [],
      departmentPic:[],
      swiperIndex: 0,
      indexInfo: ""
	  },


    onLoad: function (options) {
      // wx.cloud.getTempFileURL({
      //   fileList:["https://636c-cloud1-5gukdsmgf9c78413-1310582258.tcb.qcloud.la/FastAppoint/department/8b13632762d0f703c7b9a249dda851372797c5fc.jpeg?sign=d3324936a12769f82a5d8667f73988a4&t=1650008582"]
      // }).then(res=>{
      //   this.backgroundData = []
      //   this.backgroundData.push(res.fileList[0].fileID)
      //   console.log(this.backgroundData)
      // })
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
      this.getIndexPic()
      this.getAnnounce()
      this.getDepPic()
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

    bindchange: function() {

    },

    getIndexPic: function() {
      wx.cloud.callFunction({
        name: 'fastApptFunction',
        config: {
          env: "cloud1-5gukdsmgf9c78413"
        },
        data:{
          type: 'indexPic'
        }
      }).then((res)=>{
        this.setData({
          backgroundData: res.result.res.data[0].picurl
        })
      },err=>{
        console.log(err)
      })
    },


    getAnnounce: function() {
      const db = wx.cloud.database({env:"cloud1-5gukdsmgf9c78413"});
      db.collection("announcement").get().then((res)=> {
        this.indexInfo = res
        this.setData({
          indexInfo: res.data[0].content
        })
      }, err=>{
        this.indexInfo = err
        console.log(err)
      })
    },
    
    getDepPic: function() {
      wx.cloud.callFunction({
        name: 'fastApptFunction',
        config: {
          env: "cloud1-5gukdsmgf9c78413"
        },
        data:{
          type: 'depPic'
        }
      }).then((res)=>{
        let arr = []
        Array.isArray(res.result.res.data) && res.result.res.data.forEach(element => {
          arr.push(element.picurl[0])
        });
        this.setData({
          departmentPic: arr
        })
      },err=>{
        console.log(err)
      })
    }
})