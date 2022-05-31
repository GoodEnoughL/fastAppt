const cloud = require('wx-server-sdk');

cloud.init({env: "cloud1-5gukdsmgf9c78413"})

const db = cloud.database();
const _ = db.command
exports.main = async (event, context) => {
  const result = {status:'fail'}
  console.log(event)
  try {
    const ap = await db.collection("appointment").doc(event._id).get()
    const {department , apptDate, appttime, equipment} = ap.data
    console.log(`ap:${ap}`,ap,department,apptDate)
    const up = await db.collection("wares").where({
      name: department,
      bussdate: apptDate,
    }).get()
    if(!up) return result
    console.log('up:',up.data[0])
    const waresID = up.data[0]._id
    //修改整个stock
    for(let key in up.data[0].stock) {
      if(up.data[0].stock[key].busstime == appttime && up.data[0].stock[key].equipment == equipment){
        up.data[0].stock[key].surplus += 1
      }
    }

    const re = await db.runTransaction(async transaction => {
      const updateWares = await transaction.collection('wares').doc(waresID).update({
        data: {
          stock: up.data[0].stock
        }
      })
      const updateAppt = await transaction.collection('appointment').doc(event._id).remove().then((res) => {
        console.log('updateAppt；',res)
        result.status = 'success'
      })
      console.log('update:',updateAppt)
      
    })
    console.log("result:",result)
    return result
  }
  catch(e) {
    result.reason = e.msg
    console.log(e)
    return result
  }
};