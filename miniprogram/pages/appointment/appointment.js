Page({

    data: {
      showOverlay: false,
        department: [],
        arr: [5,5,6,4]
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
        this.getDepartement()
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

    getDepartement: function() {
        wx.cloud.callFunction({
          name: 'fastApptFunction',
          config: {
            env: "cloud1-5gukdsmgf9c78413"
          },
          data:{
            type: 'getDepartment'
          }
        }).then((res)=>{
          let arr = []
          Array.isArray(res.result.res.data) && res.result.res.data.forEach(element => {
            arr.push(element.picurl[0])
          });
          this.setData({
            department: res.result.res.data
          })
          console.log("depPic:",this.data.department)
        },err=>{
          console.log(err)
        })
      },

      onClickShow: function() {
        this.setData({
          showOverlay: true
        })
      },

      onClickHide: function() {
        this.setData({
          showOverlay: false
        })
      },

      onClickDepartment: function(event) {
        // console.log("navigation:",event.currentTarget.dataset.dep)
        wx.navigateTo({
          url: `/pages/appointDetail/appointDetail?dep=${event.currentTarget.dataset.dep}`,
          events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function(data) {
              console.log(data)
            },
            someEvent: function(data) {
              console.log(data)
            }
          },
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
          }
        })
      }

})