const route = require('express').Router();
const debug = require('debug')('app:route-admin');
const logger = require('../../middlewares/logger');
const _ = require('lodash');


const adminServer = require('../../service/AdminService');

module.exports = (app) => {

  app.use('/administrator', route);

  // route.get('/', async (req, res, next) => {
  //   try {
  //     const result = await adminServer.specialService2();
  //     res.status(200).json(
  //       {
  //         "status": 0,
  //         "data": result
  //       }
  //     )
  //   } catch (e) {
  //     logger.error('%o', e);
  //     next(e)
  //   }
  // })
  /***************查询业务***************/
  route.get('/all', async (req, res, next) => {
    try {
      const result = await adminServer.baseFindAll();
      debug(result)
      res.status(200).json(
        {
          "status": 0,
          "data": result
        }
      )
    } catch (e) {
      logger.error('%o', e);
      next(e)
    }
  })

  /***************创建业务***************/
  // 管理员注册
  route.post('/signup',
    async (req, res, next) => {
      try {
        // 账号验证
        const record = await adminServer.validationAccount(req.body.account)
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


  // 管理员登录
  route.post('/signin',
    async (req, res, next) => {
      try {
        // 账号验证
        const record = await adminServer.baseFindByFilter(null, { account: req.body.account })

        // 该账号不存在
        if (record.length === 0) return res.status(400).json(
          {
            "status": 1,
            "msg": 'Account not registered!'
          })
        // 获取用户详细信息
        const result = await adminServer.signIn(req.body.password, record[0].get())
        if (!result) return res.status(400).json({
          "status": 2,
          "msg": 'Invalid account or password!'
        })

        // 获取令牌
        const token = adminServer.generateAuthToken(record.id, record.account)
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
    })
}


