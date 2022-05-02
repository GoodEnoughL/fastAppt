const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
  env: "cloud1-5gukdsmgf9c78413",
  credentials: require("../tcb_custom_login_key(cloud1-5gukdsmgf9c78413).json")
});
const db = app.database();
// exports.main = async (event, context) => {
//   return {
//     app,
//     db
//   };
// };

module.exports = {
  app,
  db
}