const cloud = require('wx-server-sdk')
cloud.init({
  env: "cloud1-5gukdsmgf9c78413",
})
const db = cloud.database();
const _ = db.command
function getLocaleDateZone() {
  return new Date(new Date().toDateString()).getTime()
}
function toUTC8DateZone(utc0) {
  return utc0 - 28800000
}
exports.main = async (event, context) => {
  const result = {status:'fail'}
  try {
    const today = toUTC8DateZone(getLocaleDateZone())
    db.collection("wares").add({
        data:{"alias":"篮球馆","bussdate":today,"name":"basket","stock":[{"busstime":68400,"endTime":70200,"equipment":"A1","surplus":5,"record":[]},{"busstime":70200,"endTime":72000,"equipment":"A1","surplus":0,"record":[]},{"busstime":72000,"endTime":73800,"equipment":"A1","surplus":0,"record":[]},{"busstime":73800,"endTime":75600,"equipment":"A1","surplus":2,"record":[]}],"equipment":["A1"]}
    })
    db.collection("wares").where({
      bussdate: _.lt(today)
    }).remove()
    result.status = 'success'
    return result
  }
  catch(e) {
    result.reason = e
    return result
  }
};