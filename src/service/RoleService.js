const BaseService = require('./baseService');
const roleModel = require('../model/roleModel');

class RoleService extends BaseService{
	constructor(){
		super(roleModel)
	}

	async specialService2(){
		try {
			return await roleModel.specialDAO2()
		} catch (ex) {
			throw ex
		}
	}
}
module.exports = new RoleService()