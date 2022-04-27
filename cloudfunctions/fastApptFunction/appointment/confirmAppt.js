const cloud = require('wx-server-sdk');

cloud.init({env: "cloud1-5gukdsmgf9c78413"})

const db = cloud.database();
const _ = db.command

exports.main = async (event, context) => {
  try {
    let resData = null
    const res = await db.collection("wares")
    .where({
      "name": event.confirmName,
      "bussdate": event.confirmDate,
    }).get()
    const newStock = res.data[0].stock
    newStock.map(x=>{
        if(x.busstime == event.confirmTime && x.equipment == event.confirmEquipment){
            if(x.surplus <= 0){
                throw new Error()
            }
            else x.surplus--
        }
    })
    db.collection("wares")
    .where({
      "name": event.confirmName,
      "bussdate": event.confirmDate,
    }).update({
        data:{
            stock: newStock
        }
    })
    const wxContext = cloud.getWXContext();
    db.collection("appointment").add({
        data:{
            department: event.confirmName,
            apptDate: event.confirmDate,
            appttime: event.confirmTime,
            equipment: event.confirmEquipment,
            user: wxContext.OPENID
        }
    })
    return "success"
  }
  catch(e) {
    return "fail"
  }
};