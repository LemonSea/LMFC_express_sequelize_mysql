const route = require('express').Router();
const debug = require('debug')('app:route-user');
const logger = require('../../middlewares/logger');
const _ = require('lodash');


const userInfoServer = require('../../service/userInfo');

module.exports = (app) => {

  app.use('/userInfo', route);

  route.get('/findAll',
    async (req, res, next) => {
      try {
        const result = await userInfoServer.findAll();
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
        const item = _.pick(req.body, ['birthday', 'nickname']);
        debug(item)
        const result = await userInfoServer.add(item.birthday, item.nickname);
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


