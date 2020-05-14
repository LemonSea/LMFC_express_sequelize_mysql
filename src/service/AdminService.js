const debug = require('debug')('app:server-admin');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../lib/db');//引入数据库配置信息

const BaseService = require('./baseService');
const AdminModel = require('../model/adminModel');
const AuthService = require('./AuthService');
const RoleService = require('./RoleService');
const roleModel = require('../model/roleModel');

class AdminService extends BaseService {
	constructor() {
		super(AdminModel)
	}

	/**
	 * 验证账号
	 * @param {账号} account string
	 */
	async validationAccount(account) {
		try {
			return await this.baseFindByFilter(null, { account })
		} catch (ex) {
			throw ex
		}
	}
	/**
		 * 创建 token
		 * @param {id} id int
		 * @param {账号} account string
		 */
	generateAuthToken(id, account) {
		// deadTime
		// one hour
		const deadTime = Math.floor(Date.now() / 1000) + (60 * 60 * 60);
		const token = Jwt.sign(
			{
				_id: id,
				account: account,
				exp: deadTime,
			},
			config.jwtSecret
		)
		return token;
	}

	/**
	 * 管理员注册
	 * @param {管理员} user object
	 */
	async signUp(user) {
		try {
			// 判断是否需要默认头像
			user.avatar = user.avatar ? user.avatar : ''

			// 密码加盐
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);

			return await this.baseCreate(user)
		} catch (ex) {
			throw ex
		}
	}

	/**
	 * 管理员登录
	 * @param {管理员} user object
	 */
	async signIn(password, record) {
		try {
			record.menu = [];
			// 验证密码
			const validPassword = await bcrypt.compare(password, record.password);
			if (!validPassword) {
				return false;
			}

			// 获取对应权限
			const auth = await AuthService.baseFindByFilter(['auth'], { roleId: record.roleId })
			auth.forEach(element => {
				record.menu.push(element.get().auth)
			});

			return _.omit(record, ['password'])

		} catch (ex) {
			throw ex
		}
	}

	async specialService2() {
		try {
			return await AdminModel.specialDAO3()
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
		const roleList = await roleModel.findAll()
		for (let p of record.rows) {
			for (let r of roleList) {
				if (r.get().id === p.get().roleId) {
					p.get().role = _.pick(r.get(),['name','num','describe'])
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
			// // step 1
			// const step1 = await this.baseDelete(where, { transaction });
			// // step 2
			// const step2 = await this.baseCreateBatch(entitys, { transaction });

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
module.exports = new AdminService()