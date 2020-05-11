const route = require('express').Router();
const debug = require('debug')('app:route-user');
const logger = require('../../middlewares/logger');
const _ = require('lodash');


const adminServer = require('../../service/AdminService');

module.exports = (app) => {

  app.use('/administrator', route);

  /***************查询业务***************/
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
  route.get('/update', async (req, res, next) => {
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
}


