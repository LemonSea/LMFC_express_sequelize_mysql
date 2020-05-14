const debug = require('debug')('app:controller-coachStatus');

const BaseService = require('./baseService');
const coachStatusModel = require('../model/coachStatusModel');

const db = require('../lib/db');//引入数据库配置信息

class CoachStatusService extends BaseService{
	constructor(){
		super(coachStatusModel)
	}
}
module.exports = new CoachStatusService()