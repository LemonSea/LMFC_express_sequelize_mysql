const route = require('express').Router();
const debug = require('debug')('app:route-admin');
const logger = require('../../middlewares/logger');
const _ = require('lodash');
const serialNumber = require('../../tools/serialNumber');

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

  /***************基础业务***************/
  route.get('/all', async (req, res, next) => {
    try {
      const result = await adminServer.baseFindAll();
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

  route.get('/all/some', async (req, res, next) => {
    try {
      const result = await adminServer.baseFindAll(Object.values(req.query));
      res.status(200).json(
        {
          "status": 0,
          "data": result
        }
      )
    } catch (err) {
      logger.error('%o', err);
      next(err)
    }
  })
  route.get('/find/where', async (req, res, next) => {
    try {
      const result = await adminServer.baseFindByFilter(null, req.query);
      res.status(200).json(
        {
          "status": 0,
          "data": result
        }
      )
    } catch (err) {
      logger.error('%o', err);
      next(err)
    }
  })
  route.get('/find/where/order', async (req, res, next) => {
    try {
      const result = await adminServer.baseFindByFilterOrder(null, req.query.where, req.query.order)
      res.status(200).json(
        {
          "status": 0,
          "data": result
        }
      )
    } catch (err) {
      logger.error('%o', err);
      next(err)
    }
  })
  route.get('/findlike/where', async (req, res, next) => {
    try {
      const result = await adminServer.baseFindLikeByFilter(null, req.query)
      res.status(200).json(
        {
          "status": 0,
          "data": result
        }
      )
    } catch (err) {
      logger.error('%o', err);
      next(err)
    }
  })
  route.get('/findlike/where/order', async (req, res, next) => {
    try {
      const result = await adminServer.baseFindLikeByFilter(null, req.query.where, req.query.order)
      res.status(200).json(
        {
          "status": 0,
          "data": result
        }
      )
    } catch (err) {
      logger.error('%o', err);
      next(err)
    }
  })

  route.put('/update', async (req, res, next) => {
    try {
      const result = await adminServer.baseUpdate(req.body['update'], req.body['where']);
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
  route.delete('/delete', async (req, res, next) => {
    try {
      const result = await adminServer.baseDelete(req.body);
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
  route.delete('/deleteBatch', async (req, res, next) => {
    try {
      const result = await adminServer.deleteBatchByIdArr(req.body);
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
  route.post('/create', async (req, res, next) => {
    try {
      let entity = req.body.entity;
      let serialObj = req.body.serialObj;

      // 其他数据补全
      let allList = await adminServer.baseFindAllWithParanoid();
      let serial = serialObj.site + serialObj.roleNum + serialNumber(allList.count, 3)
      entity.num = serial;  // 流水号生成
      if (!entity.account) entity.account = serial;  // 账号生成（默认为编码）
      var string = entity.IDCard;
      var stringLength = string.length
      if (!entity.password) entity.password = string.substring(stringLength - 6, stringLength);  // 密码生成
      debug(entity)
      // 设置 num

      const result = await adminServer.signUp(entity)

      res.status(201).json(
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
  route.post('/createBatch', async (req, res, next) => {
    try {
      const result = await adminServer.baseCreateBatch(req.body['entitys']);
      res.status(201).json(
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

  /***************特殊业务***************/
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
    })

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


  route.get('/find/where/paging', async (req, res, next) => {
    try {
      let where = _.omit(req.query, ['limit', 'offset', 'order', 'orderBy'])
      let limit = parseInt(req.query.limit)
      let offset = parseInt(req.query.offset)
      let order = req.query.order
      let orderBy = req.query.orderBy
      // debug(where)
      // debug(limit)
      // debug(offset)
      if (orderBy) {
        const result = await adminServer.baseFindLikeByFilterPagingOrder(null, where, offset, limit, order, orderBy);
        return res.status(200).json(
          {
            "status": 0,
            "data": result
          }
        )
      }
      const result = await adminServer.baseFindLikeByFilterPaging(null, where, offset, limit);
      res.status(200).json(
        {
          "status": 0,
          "data": result
        }
      )
    } catch (err) {
      logger.error('%o', err);
      next(err)
    }
  })
}


