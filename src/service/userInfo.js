const debug = require('debug')('app:controller-userInfo');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const userInfoModel = require('../model/userInfo');

// 获取当前用户信息
async function add(birthday, nickname) {
  // debug('addUser')
  var userInfo = {
    user_id: 1,
    birthday: new Date(birthday),
    nickname
  };
  const record = await userInfoModel.create(userInfo);
  return record;
  // return 1;
}

module.exports = {
  add
}
