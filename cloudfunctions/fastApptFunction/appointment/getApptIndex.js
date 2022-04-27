const cloud = require('wx-server-sdk');

cloud.init({env: "cloud1-5gukdsmgf9c78413"})

const db = cloud.database();
const _ = db.command
const wxContext = cloud.getWXContext();
exports.main = async (event, context) => {
  try {
    const res = await db.collection("appointment").where({
      user: wxContext.OPENID
    }).get()
    
    return res
  }
  catch(e) {
    return e
  }
};