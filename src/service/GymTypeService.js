const debug = require('debug')('app:controller-coachType');

const BaseService = require('./baseService');
const gymTypeModel = require('../model/gymTypeModel');

const db = require('../lib/db');//引入数据库配置信息

class GymTypeService extends BaseService{
	constructor(){
		super(gymTypeModel)
	}
}
module.exports = new GymTypeService()