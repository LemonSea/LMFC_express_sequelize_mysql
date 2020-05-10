const debug = require('debug')('app:controller-user');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const userModel = require('../model/user');

// 获取当前用户信息
async function addUser(username, password) {
  // debug('addUser')
  var saveUser = {
    username,
    password
  };
  const record = await userModel.create(saveUser);
  return record;
}

module.exports = {
  addUser
}
