const debug = require('debug')('app:controller-coachStatus');

const BaseService = require('./baseService');
const coachTypeModel = require('../model/coachTypeModel');

const db = require('../lib/db');//引入数据库配置信息

class CoachTypeService extends BaseService{
	constructor(){
		super(coachTypeModel)
	}
}
module.exports = new CoachTypeService()