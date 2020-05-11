const BaseService = require('./baseService');
const roleModel = require('../model/roleModel').getModel();
// @AutoWritedCompanyModel
class RoleService extends BaseService{
	constructor(){
		super(roleModel)
		// super('model')
	}
}
module.exports = new RoleService()