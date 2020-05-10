const debug = require('debug')('app:controller-role');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const roleModel = require('../model/role');

// 获取当前用户信息
async function add(authority) {
  // debug('addUser')
  var info = {
    user_id: 1,
    authority
  };
  const record = await roleModel.create(info);
  return record;
  // return 1;
}

module.exports = {
  add
}
