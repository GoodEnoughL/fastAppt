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
        data:{"alias":"篮球馆","bussdate":today,"name":"basket","record":[{"busstime":68400,"equipment":{"A1":[]}},{"busstime":70200,"equipment":{"A1":[]}},{"busstime":72000,"equipment":{"A1":[]}},{"busstime":73800,"equipment":{"A1":[]}}],"stock":[{"busstime":68400,"equipment":"A1","surplus":2},{"busstime":70200,"equipment":"A1","surplus":2},{"busstime":72000,"equipment":"A1","surplus":2},{"busstime":73800,"equipment":"A1","surplus":2}],"equipment":["A1"]}
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