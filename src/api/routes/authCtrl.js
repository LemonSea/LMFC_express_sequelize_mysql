const route = require('express').Router();
const debug = require('debug')('app:route');
const logger = require('../../middlewares/logger');
const _ = require('lodash');

const adminServer = require('../../service/AdminService');

module.exports = (app) => {

  app.use('/auth', route);


  // 管理员注册
  route.post('/admin/signup',
    async (req, res, next) => {
      try {
        // 账号验证
        const record = await adminServer.validationAccount(req.body.account)
        debug(record)
        // // 该账号已注册
        if (record.length !== 0) return res.status(400).json(
          {
            "status": 1,
            "msg": 'User already registered.'
          })

        // 用户注册
        const result = await adminServer.signUp(req.body)

        // 获取令牌
        const token = adminServer.generateAuthToken(result.id, result.account)
        // // 注册成功
        // const { record, token } = result;
        res.status(201).header('x-auth-token', token).json(
          {
            "status": 0,
            "data": result,
            "token": token,
            "type": "admin"
          }
        )
      } catch (e) {
        logger.error('%o', e);
        next(e)
      }
    }
  )

}


