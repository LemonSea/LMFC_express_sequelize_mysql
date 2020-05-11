const debug = require('debug')('app:controller-phone');

const BaseService = require('./baseService');
const authModel = require('../model/authModel');

const db = require('../lib/db');//引入数据库配置信息

class AuthService extends BaseService{
	constructor(){
		super(authModel)
	}

	async updateAuth(entitys, where) {
		let transaction;
		try {
			// get transaction
    transaction = await db.transaction();

			// step 1
			const step1 = await this.baseDelete(where, { transaction });
			
			// step 2
			const step2 = await this.baseCreateBatch(entitys, { transaction });

			// commit
			await transaction.commit();

			return true;
		} catch (err) {
			console.error(err)
			// Rollback transaction if any errors were encountered
			await transaction.rollback();
			throw ex
		}
	}
}
module.exports = new AuthService()