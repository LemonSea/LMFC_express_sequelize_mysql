const debug = require('debug')('app:controller-phone');

const BaseService = require('./baseService');
const phoneModel = require('../model/phoneModel').getModel()
const companyModel = require('../model/companyModel').getModel()

const db = require('../lib/db');//引入数据库配置信息
// @AutoWritedPersonModel
class PhoneService extends BaseService {
	// class PhoneService{
	constructor() {
		super(phoneModel)
	}

	// specialService2() {
	// 	return PersonService.model.specialDAO2()
	// }
	async transaction() {
		let transaction;

		try {
			// get transaction
    transaction = await db.transaction();

			// // step 1
			const company = await companyModel.create({
				"name":"222"
			}, { transaction });
			// debug(company)
			// step 2
			const phone = await phoneModel.create({
				"prefix":"222",
				"number":125,
				"companyId":8
			}, { transaction });

			// commit
			await transaction.commit();
			return {
				company,
				phone
			}
		} catch (err) {
			// console.error(err)
			// Rollback transaction if any errors were encountered
			await transaction.rollback();
			throw ex
		}
	}

}

module.exports = new PhoneService()