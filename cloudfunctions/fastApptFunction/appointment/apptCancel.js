const cloud = require('wx-server-sdk');

cloud.init({env: "cloud1-5gukdsmgf9c78413"})

const db = cloud.database();
const _ = db.command()
const _ = db.command
exports.main = async (event, context) => {
  const result = {status:'fail'}
  try {
    const up = db.collection("wares").where({
      name: event.department,
      bussdate: event.bussdate,
      "stock.busstime": event.busstime,
      "stock.equipment": event.equipment,
    }).update({
      "stock.surplus": _.inc(1)
    })
    // db.collection("appointment").doc(event._id).
    // update({
    //   data: {
    //     status: 'unsubscribe'
    //   }
    // }).then(res=>{
      
    // })
    return up
  }
  catch(e) {
    return result
  }
};