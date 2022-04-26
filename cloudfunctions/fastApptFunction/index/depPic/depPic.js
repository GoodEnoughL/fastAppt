const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({env: "cloud1-5gukdsmgf9c78413"});
const db = app.database();

const _ = db.command;

exports.main = async (event, context) => {
  const res = await db
    .collection("department").field({picurl:true})
    .get();
  return {
    res
  };
};