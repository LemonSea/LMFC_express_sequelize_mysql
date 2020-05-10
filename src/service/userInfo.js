const debug = require('debug')('app:controller-userInfo');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const userInfoModel = require('../model/userInfo');
const userModel = require('../model/user');

// 获取当前用户信息和用户账号
async function findAll() {
  // const record = await userInfoModel.findAll()
  const record = await userInfoModel.findAll({
    // attributes: ['prdName', 'price'],
    include: [{
      model: userModel,
      // as: 'u',
      // attributes: ['userName'],
      // as: 'user_id'
    }],
    //raw:true
  })
  return record;
  // return 1;
}

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
  add,
  findAll
}
