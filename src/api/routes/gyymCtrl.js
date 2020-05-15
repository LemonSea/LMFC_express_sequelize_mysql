const route = require('express').Router();
const debug = require('debug')('app:route-user');
const logger = require('../../middlewares/logger');
const _ = require('lodash');
const serialNumber = require('../../tools/serialNumber');

const GymService = require('../../service/GymService');

module.exports = (app) => {

  app.use('/gym', route);

  /***************查询业务***************/
  route.get('/', async (req, res, next) => {
    try {
      const result = await GymService.specialService2();
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
      const result = await GymService.baseFindAll();
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
      const result = await GymService.baseFindAll(Object.values(req.query));
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
      const result = await GymService.baseFindByFilter(null, req.query);
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
      const result = await GymService.baseFindByFilterOrder(null, req.query.where, req.query.order)
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
      const result = await GymService.baseFindLikeByFilter(null, req.query)
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
      const result = await GymService.baseFindLikeByFilter(null, req.query.where, req.query.order)
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
      const result = await GymService.baseUpdate(req.body['update'], req.body['where']);
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
      const result = await GymService.baseDelete(req.body);
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
      const result = await GymService.deleteBatchByIdArr(req.body);
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

      // const result = await GymService.baseCreate(entity)

      res.status(201).json(
        {
          "status": 0,
          "data": req.body
        }
      )
    } catch (e) {
      logger.error('%o', e);
      next(e)
    }
  })
  route.post('/createBatch', async (req, res, next) => {
    try {
      const result = await GymService.baseCreateBatch(req.body['entitys']);
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
      let result = await GymService.findWherePagingIsOrder(where, offset, limit, order, orderBy)
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
