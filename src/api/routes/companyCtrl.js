const route = require('express').Router();
const debug = require('debug')('app:route-user');
const logger = require('../../middlewares/logger');
const _ = require('lodash');


const companyService = require('../../service/companyService');

module.exports = (app) => {

	app.use('/company', route);
	
	route.get('/all',
    async (req, res, next) => {
      try {
        const result = await companyService.baseFindAll(['id', 'name']);
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

	route.get('/find/where',
    async (req, res, next) => {
      try {
				debug(req.query)
        const result = await companyService.baseFindLikeByFilter(null, req.query);
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
		
	route.post('/add',
    async (req, res, next) => {
      try {
				debug(req.body['entitys'])
        const result = await companyService.baseCreate(req.body['entitys']);
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


