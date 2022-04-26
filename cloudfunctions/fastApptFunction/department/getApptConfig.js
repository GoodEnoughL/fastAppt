const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({env: "cloud1-5gukdsmgf9c78413"});
const db = app.database();

const _ = db.command;

exports.main = async (event, context) => {
    //console.log(event)
  // try {
      const res = await db
    .collection("apptconfig").where({
        name: event.apptConfigName
    })
    .get();
    return res
  // } catch(e) {
  //     return event
  // }
};