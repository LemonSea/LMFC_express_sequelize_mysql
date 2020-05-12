const BaseService = require('./baseService');
const SiteModel = require('../model/SiteModel');

class SiteService extends BaseService{
	constructor(){
		super(SiteModel)
	}	
}
module.exports = new SiteService()