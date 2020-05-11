const route = require('express').Router();
const debug = require('debug')('app:route-user');
const logger = require('../../middlewares/logger');
const _ = require('lodash');


const roleServer = require('../../service/RoleService');

module.exports = (app) => {

  app.use('/role', route);

  /***************查询业务***************/
  route.get('/all', async (req, res, next) => {
    try {
      const result = await roleServer.baseFindAll();
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
  // route.get('/all/some', async (req, res, next) => {
  //   try { res.json(await phoneService.baseFindAll(Object.values(req.query))) } catch (err) { next(err) }
  // })
  // route.get('/find/where', async (req, res, next) => {
  //   try { res.json(await phoneService.baseFindByFilter(null, req.query)) } catch (err) { next(err) }
  // })
  // route.get('/find/where/order', async (req, res, next) => {
  //   try { res.json(await phoneService.baseFindByFilterOrder(null, { sex: '0' }, 'age')) } catch (err) { next(err) }
  // })
  // route.get('/findlike/where', async (req, res, next) => {
  //   try { res.json(await phoneService.baseFindLikeByFilter(null, req.query)) } catch (err) { next(err) }
  // })
  // route.get('/findlike/where/order', async (req, res, next) => {
  //   try { res.json(await phoneService.baseFindLikeByFilter(null, { name: 'z' }, 'age')) } catch (err) { next(err) }
  // })

  route.put('/update', async (req, res, next) => {
    try {
      const result = await roleServer.baseUpdate(req.body['update'], req.body['where']);
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
      const result = await roleServer.baseDelete(req.body);
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
      const result = await roleServer.baseCreate(req.body);
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
  // route.put('/update', async (req, res, next) => {
  //   try { res.json(await phoneService.baseUpdate(req.body['update'], req.body['where'])) } catch (err) { next(err) }
  // })
  // route.delete('/delete', async (req, res, next) => {
  //   try { res.json(await phoneService.baseDelete(req.body)) } catch (err) { next(err) }
  // })
  // route.post('/create', async (req, res, next) => {
  //   try { res.json(await phoneService.baseCreate(req.body)) } catch (err) { next(err) }
  // })
  // route.post('/createBatch', async (req, res, next) => {
  //   try { res.json(await phoneService.baseCreateBatch(req.body['entitys'])) } catch (err) { next(err) }
  // })
}


