const { db } = require("../env/env")
const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const wxContext = cloud.getWXContext();

exports.main = async (event, context) => {
  // return {"OPENID:":cloud.getWXContext().OPENID}
  const openId = cloud.getWXContext().OPENID
  const result = {status: 'fail',openId: openId}
  try {
    const res = await db.collection('user').where({
      userId: event.userId
    }).get()
    if(res.data && res.data.length > 0){
      if(res.data[0].password == event.userPassword){
        db.collection('user').where({
          userId: event.userId,
          userName: event.userName
        }).update({
          openId: openId
        })
        
        result.status = 'success'
      }
      else {
        result.status = "password error"
      }
    }
    else {
      result.status = "userId dosen't exist"
    }
    return result
  }
  catch(e) {
    result.status = "error"
    return result
  }
};