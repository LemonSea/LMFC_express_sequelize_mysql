const debug = require('debug')('app:controller-coach');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../lib/db');//引入数据库配置信息

const BaseService = require('./baseService');
const coachModel = require('../model/coachModel');
const RoleService = require('./RoleService');
const CoachTypeService = require('./CoachTypeService');

class CoachService extends BaseService {
	constructor() {
		super(coachModel)
	}
	/**
	 * object
	 * @param {注册} user object
	 */
	async signUp(user) {
		try {
			// 判断是否需要默认头像
			user.avatar = user.avatar ? user.avatar : ''
			user.photo = user.photo ? user.photo : ''

			// 密码加盐
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);

			return await this.baseCreate(user)
		} catch (ex) {
			throw ex
		}
	}

	// 查询所有
	async findWherePagingIsOrder(where, offset, limit, order, orderBy) {
		let record;
		record = orderBy
			? await this.baseFindLikeByFilterPagingOrder(null, where, offset, limit, order, orderBy)
			: await this.baseFindLikeByFilterPaging(null, where, offset, limit)

		// 给员工附加角色内容
		const roleList = await RoleService.baseFindAll()
		for (let p of record.rows) {
			for (let r of roleList) {
				if (r.get().id === p.get().roleId) {
					p.get().role = _.pick(r.get(), ['name', 'num', 'describe'])
				}
			}
		}

		const typeList = await CoachTypeService.baseFindAll()
		for (let p of record.rows) {
			for (let r of typeList) {
				if (r.get().id === p.get().typeId) {
					p.get().type = _.pick(r.get(), ['name', 'num', 'describe'])
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
module.exports = new CoachService()