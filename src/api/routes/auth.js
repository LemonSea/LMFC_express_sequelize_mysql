const route = require('express').Router();
const debug = require('debug')('app:route');
const logger = require('../../middlewares/logger');
const _ = require('lodash');

module.exports = (app) => {

  app.use('/auth', route);
  
  route.get('',
  (req, res, next) => {
    try {
      debug('auth')
      res.status(200).json('you are logout!');
    } catch (e) {
      logger.error('%o', e);
      next(e);
    }
  })

}


