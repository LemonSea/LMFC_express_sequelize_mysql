const BaseService = require('./baseService');
const vcardModel = require('../model/vcardModel');

class VCardService extends BaseService{
	constructor(){
		super(vcardModel)
	}
	// async specialService2(){
	// 	try {
	// 		return await vcardModel.specialDAO2()
	// 	} catch (ex) {
	// 		throw ex
	// 	}
	// }
	
}
module.exports = new VCardService()