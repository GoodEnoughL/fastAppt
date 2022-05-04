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
    let record
    const userId = event.userId
    
    newStock.map(x=>{
        if(x.busstime == event.confirmTime && x.equipment == event.confirmEquipment){
          if(Array.isArray(x.record) && x.record.indexOf(userId) !== -1){
            throw new Error('您已预约该时段')
          }
            if(x.surplus <= 0 ){
                throw new Error('库存不足')
            }
            else x.surplus--
            x.record.push(userId)
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
            apptEndTime: event.confirmEndTime,
            equipment: event.confirmEquipment,
            userId: userId,
            alias: event.alias
        }
    })
    const result = {
      status: "success",
    }
    return result
  }
  catch(e) {
    const err = {
      status: 'fail',
      reason: e.message
    }
    return err
  }
};