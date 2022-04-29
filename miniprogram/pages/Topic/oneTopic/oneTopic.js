// pages/Topic/Topic/Topic.js
const db = wx.cloud.database({env:"cloud1-5gukdsmgf9c78413"});

var _ = db.command;

var app = getApp();

var util = require("../../../util/util");

Page({
    /**
   * 页面的初始数据
   */
    data: {
        data: {},
        comment: [],
        topNum: 0
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad:async function onLoad(options) {
        const _this = this
        if (options.topicId) {
            this.setData({
                topicId: options.topicId
            });
            // console.log(options.topicId)
            await this.search(options.topicId);
            
            var topicId;
            wx.setStorageSync("topicId", topicId);
        }
    },
    search:async function search(id) {
        var _this = this;
        id = this.data.topicId;
        db.collection("topic").where({
            topicId: id
        }).get().then(res=>{
            var D = res.data;
            _this.setData({
                data: D[0]
            });
            console.log("onLoad",this.data.data)
            let promiseArr = []
            if(this.data.data.topicCommentNum && this.data.data.topicCommentNum > 0){
                for(let i = 0; i < this.data.data.topicCommentNum;i++){
                    // let commentPromise = new Promise((resolve, reject) => {
                        
                    //   })
                    // promiseArr.push(commentPromise)
                    this.getCommentById(this.data.data.comment[i])
                }
            }
            // console.log("promiseArr1:",promiseArr)
            // return Promise.all(promiseArr)
        }).catch(err=>{
            console.log(err)
        })
    },

    getCommentById: function getCommentById(commentId) {
        console.log("getCommentById：",commentId)
        db.collection("topic").where({
            topicId: commentId
        }).get().then(res=>{
            var D = res.data;
                let comment = this.data.comment
                comment.push(D[0])
                this.setData({
                    comment: comment
                })
                console.log("commnet:",comment)
        },err=>{
            console.log(err)
        })
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function onReady() {},
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function onShow() {},
    /**
   * 生命周期函数--监听页面卸载
   */
    onUnload: function onUnload() {},
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function onPullDownRefresh() {},
    /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function onReachBottom() {},
    // 评论
    addComment: function addComment(e) {
        // console.log(e)
        var commentTxt = null;
        this.setData({
            commentTxt: e.detail.value
        });
    },
    confirm: function confirm() {
        var _this2 = this;
        var db = wx.cloud.database();
        var _ = db.command;
        var userId = wx.getStorageSync("userId");
        // 评论Id
                var commentId = null;
        if (!commentId) {
            commentId = this.getCommentId();
        }
        //发送评论
                var d = new Date(), data = {};
        var arr = util.typeC(this.data.data.comment) == "array" ? this.data.data.comment : new Array(this.data.data.comment);
        var comment;
        if (this.data.commentTxt) {
            data = {
                comment: this.data.commentTxt,
                commentUserName: wx.getStorageSync("userName"),
                commentTime: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                commentUserId: wx.getStorageSync("userId"),
                commentId: wx.getStorageSync("commentId"),
                commentUserImg: wx.getStorageSync("userImg"),
                topicId: this.data.topicId
            };
            arr.push(data);
        } else wx.showToast({
            title: "请填写内容",
            icon: "none"
        });
        if (!userId) {
            wx.showToast({
                title: "您还未登录,请先登录",
                icon: "none"
            });
            setTimeout(function() {
                wx.switchTab({
                    url: "../../me/index/index"
                });
            }, 1e3);
        } else {
            db.collection("comment").add({
                data: {
                    commentId: data.commentId,
                    commentUserId: data.commentUserId,
                    comment: data.comment,
                    commentUserName: data.userName,
                    commentTime: data.commentTime,
                    commentUserImg: data.commentUserImg,
                    topicId: this.data.topicId
                },
                success: function success(res) {
                    // console.log('Comment新增成功')
                },
                fail: function fail(e) {
                    // console.log('Comment新增失败')
                }
            });
            var commentNum = this.data.data.comment.length;
            wx.cloud.callFunction({
                name: "comment",
                data: {
                    comment: arr,
                    topicId: this.data.topicId,
                    commentNum: commentNum
                },
                success: function success(res) {
                    wx.showToast({
                        title: "评论成功"
                    });
                    // console.log('云Comment',res)
                                        _this2.search();
                },
                fail: function fail(err) {
                    wx.showToast({
                        icon: "none",
                        title: "评论失败"
                    });
                    // console.error('云Comment调用失败：', err)
                                }
            });
        }
        // console.log(data)
        // this.onLoad()
        },
    getCommentId: function getCommentId() {
        // var w = "abcdefghijklmnopqrstuvwxyz0123456789",
        // firstW = w[parseInt(Math.random() * (w.length))];
        var firstW = "comment";
        var commentId = firstW + Date.now() + (Math.random() * 1e5).toFixed(0);
        // console.log(commentId)
                wx.setStorageSync("commentId", commentId);
        return commentId;
    },
    // 获取滚动条当前位置
    scrolltoupper: function scrolltoupper(e) {
        if (e.detail.scrollTop > 100) {
            this.setData({
                floorstatus: true
            });
        } else {
            this.setData({
                floorstatus: false
            });
        }
    },
    //回到顶部
    goTop: function goTop(e) {
        // 一键回到顶部
        this.setData({
            topNum: this.data.topNum = 0
        });
    }
    // //回到顶部
    // goTop: function (e) {  // 一键回到顶部
    //   if (wx.pageScrollTo) {
    //     wx.pageScrollTo({
    //       scrollTop: 0,
    //     })
    //   }
    // },
});