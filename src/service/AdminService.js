const BaseService = require('./baseService');
const adminModel = require('../model/adminModel').getModel();
// @AutoWritedCompanyModel
class AdminService extends BaseService{
	constructor(){
		super(adminModel)
		// super('model')
	}
}
module.exports = new AdminService()