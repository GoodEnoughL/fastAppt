const cloud = require('wx-server-sdk')
cloud.init({
  env: "cloud1-5gukdsmgf9c78413",
})
const db = cloud.database();
const _ = db.command
exports.main = async (event, context) => {
  try {
    db.collection("wares").add({
        data:{"alias":"篮球馆","bussdate":1.6510752E+12,"name":"basket","record":[{"busstime":68400,"equipment":{"A1":[]}},{"busstime":70200,"equipment":{"A1":[]}},{"busstime":72000,"equipment":{"A1":[]}},{"busstime":73800,"equipment":{"A1":[]}}],"stock":[{"busstime":68400,"equipment":"A1","surplus":2},{"busstime":70200,"equipment":"A1","surplus":2},{"busstime":72000,"equipment":"A1","surplus":2},{"busstime":73800,"equipment":"A1","surplus":2}],"equipment":["A1"]}
    })
    return 
  }
  catch(e) {
    return e
  }
};