// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({env: "cloud1-5gukdsmgf9c78413"})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('topic')
      .orderBy('topicCommentNum', 'desc')
      .get({
        success: function (res) {
          return res
        }
      });
  } catch (e) {
    return e
  }
}