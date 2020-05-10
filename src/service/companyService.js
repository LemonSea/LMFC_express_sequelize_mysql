const BaseService = require('./baseService');
const companyModel = require('../model/companyModel')
// @AutoWritedCompanyModel
class CompanyService extends BaseService{
	constructor(){
		super(companyModel['model'])
		// super('model')
	}
}
module.exports = new CompanyService()