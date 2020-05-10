const debug = require('debug')('app:controller-userInfo');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const sequelize = require('sequelize');
const db = require('../lib/db');//引入数据库配置信息

const userInfoModel = require('../model/userInfo');
const userModel = require('../model/user');

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

// 事务1
async function transaction() {
  let transaction;

  try {
    // get transaction
    transaction = await db.transaction();

    // step 1
    const user = await userModel.create({
      username: "2533567580@qq.com",
      password: "2533567560@qq.com"
    }, { transaction });

    // step 2
    const userInfo = await userInfoModel.create({
      user_id: 1,
      birthday: new Date("2020-12-29"),
      nickname: '111111'
    }, { transaction });

    // commit
    await transaction.commit();
    return record = {
      user,
      userInfo
    }
  } catch (err) {
    console.error(err)
    // Rollback transaction if any errors were encountered
    await transaction.rollback();
  }
}

// 事务2
// function transaction() {
//   //启用事务(自动提交)
//   return db.transaction(function (t) {
//     return userModel.create({
//       username: "2533567569@qq.com",
//       password: "2533567560@qq.com"
//     }, {
//       transaction: t
//     }).then(result => {
//       console.log(result)
//       return userInfoModel.create({
//         user_id: 1,
//         birthday: new Date("2020-12-29"),
//         nickname: 'xxmmgg'
//       }, {
//         transaction: t
//       })
//     })
//   }).then(result => {
//     // Transaction 会自动提交
//     // result 是事务回调中使用promise链中执行结果
//     // console.log(result.length)
//     console.log("ok")
//   }).catch(err => {
//     // Transaction 会自动回滚
//     // err 是事务回调中使用promise链中的异常结果
//     console.log(err)
//   })
// }

module.exports = {
  add,
  transaction
}
