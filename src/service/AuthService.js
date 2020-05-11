const BaseService = require('./baseService');
const authModel = require('../model/authModel').getModel();
// @AutoWritedCompanyModel
class AuthService extends BaseService{
	constructor(){
		super(authModel)
		// super('model')
	}
}
module.exports = new AuthService()