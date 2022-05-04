const cloud = require('wx-server-sdk');

cloud.init({env: "cloud1-5gukdsmgf9c78413"})

const db = cloud.database();
const _ = db.command

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();
    const res = await db.collection("appointment").where({
      userId: event.userId
    }).get()
    
    return res
  }
  catch(e) {
    return "fail"
  }
};