const cloud = require('wx-server-sdk');

cloud.init({env: "cloud1-5gukdsmgf9c78413"})

const db = cloud.database();
const _ = db.command

exports.main = async (event, context) => {
  const result = {status:'fail'}
  try {
    const res = await db.collection("appointment").doc(event._id).remove({
      success: function (res) {
        result.status = 'fail'
      }
    })
    return event._id
  }
  catch(e) {
    return result
  }
};