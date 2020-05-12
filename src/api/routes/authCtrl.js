const route = require('express').Router();
const debug = require('debug')('app:route-user');
const logger = require('../../middlewares/logger');
const _ = require('lodash');


const authServer = require('../../service/AuthService');

module.exports = (app) => {

  app.use('/auth', route);

  /*************** 查询业务 ***************/
  route.get('/all', async (req, res, next) => {
    try {
      const result = await authServer.baseFindAll();
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
  /*************** 创建业务 ***************/
  route.post('/createBatch', async (req, res, next) => {
    try {
      const result = await authServer.baseCreateBatch(req.body['entitys']);
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
  /*************** 删除业务 ***************/
  route.delete('/delete', async (req, res, next) => {
    try {
      const result = await authServer.baseDelete(req.body);
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
  
  /*************** 特殊业务 ***************/
  route.put('/update', async (req, res, next) => {
    try {
      debug(req.body)
      const result = await authServer.updateAuth(req.body['update'], req.body['where']);
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


