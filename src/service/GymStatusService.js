const debug = require('debug')('app:controller-gymStatus');

const BaseService = require('./baseService');
const gymStatusModel = require('../model/gymStatusModel');

const db = require('../lib/db');//引入数据库配置信息

class GymStatusService extends BaseService{
	constructor(){
		super(gymStatusModel)
	}
}
module.exports = new GymStatusService()