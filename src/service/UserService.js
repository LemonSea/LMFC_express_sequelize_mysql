const BaseService = require('./baseService');
const userModel = require('../model/userModel');

class UserService extends BaseService{
	constructor(){
		super(userModel)
	}
	async specialService2(){
		try {
			return await userModel.specialDAO2()
		} catch (ex) {
			throw ex
		}
	}
	
}
module.exports = new UserService()