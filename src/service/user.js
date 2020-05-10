const debug = require('debug')('app:controller-user');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const userModel = require('../model/user');
const userInfoModel = require('../model/userInfo');
const roleModel = require('../model/role');

// 获取当前用户信息和用户账号
async function findAll() {
  const record = userModel.findOne({
    // where: {
    //   username: username
    // },
    include: [roleModel, userInfoModel]
    // include: [
    //   {model: UserInfo, as: 'user_info'},
    //   {model: Phone, as: 'phone'},
    // ]
    // include: [{all: true}]
    // 改为一行显示
    //raw:true
  })
  return record;
  // return 1;
}

// 获取当前用户信息
async function addUser(username, password) {
  debug(username, password)
  var saveUser = {
    username,
    password
  };
  const record = await userModel.create(saveUser);
  return record;
}

module.exports = {
  findAll,
  addUser
}
