const debug = require('debug')('app:server-role');
const _ = require('lodash');

const db = require('../lib/db');//引入数据库配置信息

const BaseService = require('./baseService');
const roleModel = require('../model/roleModel');
const AdminService = require('./AdminService');
const AuthService = require('./AuthService');

class RoleService extends BaseService {
	constructor() {
		super(roleModel)
	}

	// 获取角色及其对应权限
	async specialService2() {
		try {
			const record = await roleModel.specialDAO2();

			// 给每一个角色添加 menu 属性，该属性值为对应角色的所有权限
			// 同时删除每个角色的 auth 属性
			record.forEach(element => {
				let role = element.get()
				role.menu = []
				role.auth.forEach(element => {
					let auth = element.get()
					role.menu.push(auth.auth)
				});
				delete role.auth;
			});

			return record;
		} catch (ex) {
			throw ex
		}
	}

	async _role_auth_Transaction(roleId) {
		let transaction;
		try {
			// get transaction
			transaction = await db.transaction();

			// step 1
			const step1 = await AuthService.baseDelete({ roleId }, { transaction });

			// step 2
			const step2 = await this.baseDelete({ id: roleId }, { transaction });

			// commit
			await transaction.commit();

			return true;
		} catch (err) {
			// Rollback transaction if any errors were encountered
			await transaction.rollback();
			throw ex
		}
	}

	// 删除角色及其对应权限
	async deleteRoleAndAuth(where) {
		try {

			let result_f = { code: -1, msg: '删除失败' }
			let result0 = { code: 0, msg: '删除成功!' }
			let result1 = { code: 1, msg: '还有依赖于该角色的账号' }

			let roleId = where.id;

			// 检测账号依赖
			// 管理员
			const adminRecord = await AdminService.baseFindByFilter(null, { roleId })
			if (adminRecord.length !== 0) return result1;

			// 教练

			// 用户

			// 删除（事务）
			const bool = this._role_auth_Transaction(roleId);
			if (bool) return result0;

			return result_f;
		} catch (ex) {
			throw ex
		}
	}
}
module.exports = new RoleService()