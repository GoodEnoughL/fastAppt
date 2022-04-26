const cloud = require('wx-server-sdk');

cloud.init({env: "cloud1-5gukdsmgf9c78413"})

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const res = await db
    .collection("wares")
    .where({
      "name": event.waresName,
      "busstime": parseInt(event.dateName)
    })
    .get();
    return res
  }
  catch(e) {
    return e
  }
};