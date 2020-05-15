const debug = require('debug')('app:controller-gym');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../lib/db');//引入数据库配置信息

const BaseService = require('./baseService');
const gymModel = require('../model/gymModel');
const GymStatusService = require('./GymStatusService');
const GymTypeService = require('./GymTypeService');

class GymService extends BaseService {
	constructor() {
		super(gymModel)
	}

	// 查询所有
	async findWherePagingIsOrder(where, offset, limit, order, orderBy) {
		let record;
		record = orderBy
			? await this.baseFindLikeByFilterPagingOrder(null, where, offset, limit, order, orderBy)
			: await this.baseFindLikeByFilterPaging(null, where, offset, limit)

		// 添加类型内容
		const typeList = await GymTypeService.baseFindAll()
		for (let p of record.rows) {
			for (let r of typeList) {
				if (r.get().id === p.get().gymTypeId) {
					p.get().type = _.pick(r.get(), ['name', 'num', 'describe'])
				}
			}
		}

		// 添加状态内容
		const statusList = await GymStatusService.baseFindAll()
		for (let p of record.rows) {
			for (let r of statusList) {
				if (r.get().id === p.get().gymStatusId) {
					p.get().status = _.pick(r.get(), ['name', 'num', 'describe'])
				}
			}
		}
		return record;
	}
	
	/**
		 * 根据id批量删除
		 * @param {批量删除} idArr idArr
		 */
	async deleteBatchByIdArr(idArr) {
		let transaction;
		try {
			// get transaction
			transaction = await db.transaction();
			for (let i = 0; i < idArr.length; i++) {
				await this.baseDelete({ id: idArr[i] }, { transaction });
			}
			// commit
			await transaction.commit();

			return true;
		} catch (ex) {
			// Rollback transaction if any errors were encountered
			await transaction.rollback();
			throw ex
		}
	}
}
module.exports = new GymService()