// const route = require('express').Router();
// const debug = require('debug')('app:route-user');
// const logger = require('../../middlewares/logger');
// const _ = require('lodash');


// const roleServer = require('../../service/RoleService');

// module.exports = (app) => {

//   app.use('/role', route);

//   /***************查询业务***************/
//   route.get('/', async (req, res, next) => {
//     try {
//       const result = await roleServer.specialService2();
//       res.status(200).json(
//         {
//           "status": 0,
//           "data": result
//         }
//       )
//     } catch (e) {
//       logger.error('%o', e);
//       next(e)
//     }
//   })

//   route.get('/all', async (req, res, next) => {
//     try {
//       const result = await roleServer.baseFindAll();
//       res.status(200).json(
//         {
//           "status": 0,
//           "data": result
//         }
//       )
//     } catch (e) {
//       logger.error('%o', e);
//       next(e)
//     }
//   })
  
//   route.get('/all/some', async (req, res, next) => {
//     try {
//       const result = await roleServer.baseFindAll(Object.values(req.query));
//       res.status(200).json(
//         {
//           "status": 0,
//           "data": result
//         }
//       )
//     } catch (err) {
//       logger.error('%o', err);
//       next(err)
//     }
//   })
//   route.get('/find/where', async (req, res, next) => {
//     try {
//       const result = await roleServer.baseFindByFilter(null, req.query);
//       res.status(200).json(
//         {
//           "status": 0,
//           "data": result
//         }
//       )
//     } catch (err) {
//       logger.error('%o', err);
//       next(err)
//     }
//   })
//   route.get('/find/where/order', async (req, res, next) => {
//     try {
//       const result = await roleServer.baseFindByFilterOrder(null, req.query.where, req.query.order)
//       res.status(200).json(
//         {
//           "status": 0,
//           "data": result
//         }
//       )
//     } catch (err) {
//       logger.error('%o', err);
//       next(err)
//     }
//   })
//   route.get('/findlike/where', async (req, res, next) => {
//     try {
//       const result = await roleServer.baseFindLikeByFilter(null, req.query)
//       res.status(200).json(
//         {
//           "status": 0,
//           "data": result
//         }
//       )
//     } catch (err) {
//       logger.error('%o', err);
//       next(err)
//     }
//   })
//   route.get('/findlike/where/order', async (req, res, next) => {
//     try { 
//       const result = await roleServer.baseFindLikeByFilter(null, req.query.where, req.query.order)
//       res.status(200).json(
//         {
//           "status": 0,
//           "data": result
//         }
//       )
//     } catch (err) {
//       logger.error('%o', err);
//       next(err)
//     }
//   })

//   route.put('/update', async (req, res, next) => {
//     try {
//       const result = await roleServer.baseUpdate(req.body['update'], req.body['where']);
//       res.status(200).json(
//         {
//           "status": 0,
//           "data": result
//         }
//       )
//     } catch (e) {
//       logger.error('%o', e);
//       next(e)
//     }
//   })
//   route.delete('/delete', async (req, res, next) => {
//     try {
//       const result = await roleServer.baseDelete(req.body);
//       res.status(200).json(
//         {
//           "status": 0,
//           "data": result
//         }
//       )
//     } catch (e) {
//       logger.error('%o', e);
//       next(e)
//     }
//   })
//   route.post('/create', async (req, res, next) => {
//     try {
//       const result = await roleServer.baseCreate(req.body);
//       res.status(200).json(
//         {
//           "status": 0,
//           "data": result
//         }
//       )
//     } catch (e) {
//       logger.error('%o', e);
//       next(e)
//     }
//   })
//   route.post('/createBatch', async (req, res, next) => {
//     try {
//       const result = await roleServer.baseCreateBatch(req.body['entitys']);
//       res.status(200).json(
//         {
//           "status": 0,
//           "data": result
//         }
//       )
//     } catch (e) {
//       logger.error('%o', e);
//       next(e)
//     }
//   })
// }


