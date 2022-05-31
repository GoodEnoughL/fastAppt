// pages/appointDetail.js
const util = require("../../util/index")
const { envId } = require("../../envList")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dep: "",
    date: '',
    dateSec: 0,
    showCalendar: false,
    apptTime: [],
    apptEquipment: [],
    depAlias: '',
    minDate: "",
    maxDate: "",
    defaultDate: "",
    busstime: [],
    equipment: [],
    confirmDate: 0,
    confirmTime: 0,
    confirmEndTime: 0,
    confirmEquipment: "",
    apptData: {},
    surplus: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      dep: options.dep
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
    this.getApptConfig()
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

  onDisplayCalendar() {
    this.setData({ showCalendar: true });
  },
  onCloseCalendar() {
    this.setData({ showCalendar: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirmCalendar(event) {
    console.log("date1:",Date.parse(new Date(event.detail)))
    this.setData({
      showCalendar: false,
      date: this.formatDate(event.detail),
      dateSec: Date.parse(new Date(event.detail)),
      confirmDate: Date.parse(new Date(event.detail))
    });
    this.getApptWares()
  },

  onClickTime: function(options) {
    console.log(options.currentTarget.id)
    const time = options.currentTarget.id.split('-')
    const startTime = parseInt(time[0])
    const endTime = parseInt(time[1])
    console.log(startTime,endTime)
    console.log(`apptData${this.data.apptData.stock},id:${options.currentTarget.id}`,this.data.apptData)
    for(let key in this.data.apptData.stock)
    {
      var equipment = []
      console.log(`equipment:${this.data.apptData.stock[key].equipment}`)
      if(this.data.apptData.stock[key].busstime === startTime && this.data.apptData.stock[key].endTime === endTime){
        equipment.push(this.data.apptData.stock[key].equipment)
        this.setData({
          confirmTime: startTime,
          confirmEndTime: endTime,
          apptEquipment: equipment,
          surplus: this.data.apptData.stock[key].surplus
        })
      }
    }
    console.log(`equipment:${this.data.apptEquipment}`)
  },

  onClickEquipment: function(options) {
    this.setData({
      confirmEquipment: options.currentTarget.id
    })
    //console.log(this.data.confirmDate,this.data.confirmTime,this.data.confirmEquipment)
  },

  onClickAppt: function() {
    console.log("clicj",this.data)
    const userId = wx.getStorageSync('userId')
    wx.cloud.callFunction({
      name: "fastApptFunction",
      config: {
        env: envId
      },
      data: {
        type: "confirmAppt",
        confirmName: this.data.dep,
        confirmDate: this.data.confirmDate,
        confirmTime: parseInt(this.data.confirmTime),
        confirmEndTime: parseInt(this.data.confirmEndTime),
        confirmEquipment: this.data.confirmEquipment,
        userId: userId,
        alias: this.data.depAlias
      }
    }).then(res=>{
      console.log("onClickAppt:",res.result)
      const url = '/pages/apptSuccess/apptSuccess?status='+ res.result.status
      console.log("url:",url)
      if(res.result.status === 'success'){
        wx.navigateTo({
          url: url
        })
        // console.log(res.result.confirmEndTime)
      }
      else {
        wx.showToast({
          title: res.result.reason,
          icon: 'error'
        })
      }
    },err=>{
      // wx.showToast({
      //   title: err,
      // })
      console.log(err)
      // wx.navigateTo({
      //   url: '/pages/apptSuccess/apptSuccess?status=fail'
      // })
    })
  },

  


  getEquipmentInfo: function() {

  },

  getApptConfig: function() {
    wx.cloud.callFunction({
      name: "fastApptFunction",
      config: {
        env: envId
      },
      data: {
        type: "getApptConfig",
        apptConfigName: this.data.dep
      }
    }).then(res=>{
      console.log("res",res.result.data[0].bussdate)
      const today = new Date(new Date().toDateString()).getTime();
      const d = res.result.data[0].bussdate *1000 + today 
      console.log(d)
      this.setData({
        minDate: today,
        maxDate: d
      })
    },err=>{
      console.log("err",err)
    })
  },

  getApptWares: function() {
    console.log("date:",this.data.date)
    wx.cloud.callFunction({
      name: "fastApptFunction",
      config: {
        env: envId
      },
      data: {
        type: "getApptWares",
        waresName: this.data.dep,
        dateName: parseInt(this.data.dateSec)
      } 
    }).then(res=>{
      console.log("getApptWares",res)
      const busstime = []
      if(res.result.data[0]){
        res.result.data[0].stock.forEach(element=>{busstime.push({"sec":element.busstime,"endSec":element.endTime,"startTime": util.getHMData(this.data.dateSec,element.busstime),"endTime":util.getHMData(this.data.dateSec,element.endTime)})})
        this.setData({
          // apptEquipment: res.result.data[0].equipment,
          apptTime: busstime,
          depAlias: res.result.data[0].alias,
          apptData: res.result.data[0]
        })
        console.log("getApptWares2",this.data.apptData)
      } 
      else {
        this.setData({
          apptEquipment: [],
          apptTime: []
        })
      }
      
      console.log(this.data.busstime)
    },err=>{
      console.log("err",err)
    })
  },

  


})
