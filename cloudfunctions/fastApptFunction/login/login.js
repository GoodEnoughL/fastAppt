const cloudbase = require("@cloudbase/node-sdk");
//import $config from "../../cloudbaserc";

const app = cloudbase.init({
  env: "cloud1-5gukdsmgf9c78413",
  credentials: require("../tcb_custom_login_key(cloud1-5gukdsmgf9c78413).json")
});
// 2. 开发者自定义的用户唯一身份标识
const customUserId = "Brando_h";
// 3. 创建ticket
const ticket = app.auth().createTicket(customUserId);

exports.main = async (event, context) => {
  return {
    ticket,
  };
};