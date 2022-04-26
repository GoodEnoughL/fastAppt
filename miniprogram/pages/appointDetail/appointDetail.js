// pages/appointDetail.js
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
    minDate: "",
    maxDate: "",
    defaultDate: "",
    busstime: [],
    equipment: [],
    confirmDate: 0,
    confirmTime: 0,
    confirmEquipment: ""
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
    this.setData({
      confirmTime: options.currentTarget.id
    })
  },

  onClickEquipment: function(options) {
    this.setData({
      confirmEquipment: options.currentTarget.id
    })
    //console.log(this.data.confirmDate,this.data.confirmTime,this.data.confirmEquipment)
  },

  onClickAppt: function() {
    console.log(this.data.confirmDate,this.data.confirmTime,this.data.confirmEquipment)
    wx.cloud.callFunction({
      name: "fastApptFunction",
      config: {
        env: "cloud1-5gukdsmgf9c78413"
      },
      data: {
        type: "confirmAppt",
        confirmName: this.data.dep,
        confirmDate: this.data.confirmDate,
        confirmTime: parseInt(this.data.confirmTime),
        confirmEquipment: this.data.confirmEquipment
      }
    }).then(res=>{
      console.log(res)
      wx.navigateTo({
        url: '/pages/apptSuccess/apptSuccess',
      })
    },err=>{
      wx.navigateTo({
        url: '/pages/apptSuccess/apptSuccess',
      })
    })
  },

  


  getEquipmentInfo: function() {
    // wx.cloud.callFunction({
    //   name: ""
    // })
  },

  getApptConfig: function() {
    wx.cloud.callFunction({
      name: "fastApptFunction",
      config: {
        env: "cloud1-5gukdsmgf9c78413"
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

        env: "cloud1-5gukdsmgf9c78413"
      },
      data: {
        type: "getApptWares",
        waresName: this.data.dep,
        dateName: this.data.dateSec
      } 
    }).then(res=>{
      console.log(res)
      const busstime = []
      if(res.result.data[0]){
        res.result.data[0].stock.forEach(element=>{busstime.push({"sec":element.busstime,"alias": this.getHMData(this.data.dateSec,element.busstime)})})
        this.setData({
          apptEquipment: res.result.data[0].equipment,
          apptTime: busstime
        })
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

  
 getHMData: function(base,timestamp){
  const date = new Date(base+timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const h = `${date.getHours()}:`
    const m = `${date.getMinutes()}`
    // s = date.getSeconds()
    return h + m
}


})