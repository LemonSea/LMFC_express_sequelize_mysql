const route = require('express').Router();
const debug = require('debug')('app:route-user');
const logger = require('../../middlewares/logger');
const _ = require('lodash');
const serialNumber = require('../../tools/serialNumber');

const CoachService = require('../../service/CoachService');

module.exports = (app) => {

  app.use('/coach', route);

  /***************查询业务***************/
  route.get('/', async (req, res, next) => {
    try {
      const result = await CoachService.specialService2();
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

  route.get('/all', async (req, res, next) => {
    try {
      const result = await CoachService.baseFindAll();
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
      const result = await CoachService.baseFindAll(Object.values(req.query));
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
      const result = await CoachService.baseFindByFilter(null, req.query);
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
      const result = await CoachService.baseFindByFilterOrder(null, req.query.where, req.query.order)
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
      const result = await CoachService.baseFindLikeByFilter(null, req.query)
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
      const result = await CoachService.baseFindLikeByFilter(null, req.query.where, req.query.order)
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
      const result = await CoachService.baseUpdate(req.body['update'], req.body['where']);
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
      const result = await CoachService.baseDelete(req.body);
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
      const result = await CoachService.deleteBatchByIdArr(req.body);
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
      let allList = await CoachService.baseFindAllWithParanoid();
      let serial = serialObj.site + serialObj.roleNum + serialNumber(allList.count, 3)
      entity.num = serial;  // 流水号生成
      if (!entity.account) entity.account = serial;  // 账号生成（默认为编码）
      var string = entity.IDCard;
      var stringLength = string.length
      if (!entity.password) entity.password = string.substring(stringLength - 6, stringLength);  // 密码生成
      // 设置 num
      debug(entity)
      const result = await CoachService.signUp(entity)

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
      const result = await CoachService.baseCreateBatch(req.body['entitys']);
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
}

  /***************特殊业务***************/
  // 模糊搜索分页排序查询
  route.get('/find/where/paging', async (req, res, next) => {
    try {
      let where = _.omit(req.query, ['limit', 'offset', 'order', 'orderBy'])
      let limit = parseInt(req.query.limit)
      let offset = parseInt(req.query.offset)
      let order = req.query.order
      let orderBy = req.query.orderBy
      let result = await CoachService.findWherePagingIsOrder(where, offset, limit, order, orderBy)
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
