const route = require('express').Router();
const debug = require('debug')('app:route-user');
const logger = require('../../middlewares/logger');
const _ = require('lodash');


const roleServer = require('../../service/role');

module.exports = (app) => {

  app.use('/role', route);

  route.get('/findAll',
    async (req, res, next) => {
      try {
        const result = await roleServer.findAll();
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

  // 增加员工
  route.post('/add',
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['authority']);
        debug(item)
        const result = await roleServer.add(item.authority);
        debug(req.body)
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

}

