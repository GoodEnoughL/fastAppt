'use strict';
const login = require("./login/login.js")
const depPic = require("./index/depPic/depPic.js")
const indexPic = require("./index/indexPic/indexPic.js")
const getApptConfig = require("./department/getApptConfig.js")
const getApptWares = require("./wares/getApptWares")

// department
const getDepartment = require("./department/getDepartment.js")
exports.main = async (event, context) => {
    switch (event.type) {
    case 'login':
      return await login.main(event, context);
    case 'depPic':
        return await depPic.main(event,context);
    case 'indexPic':
        return await indexPic.main(event,context);
    case 'getDepartment':
        return await getDepartment.main(event,context);
    case 'getApptConfig':
        return await getApptConfig.main(event,context);
    case 'getApptWares':
        return await getApptWares.main(event,context);
    default:
      return "success";
  }
// return event
};
