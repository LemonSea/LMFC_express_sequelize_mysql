const sequelize = require('sequelize');
const BaseModel = require('./baseModel');

class GymTypeModel extends BaseModel {
	constructor() {
		super('gymType', {
			id: {
				field: 'id',//对应数据库的名字
				primaryKey: true,//自增
				type: sequelize.INTEGER,//类型
				autoIncrement: true
			},
			num: {type: sequelize.STRING},
			name: {type: sequelize.STRING},
			describe: {type: sequelize.STRING},
			msg: {type: sequelize.STRING},
		})
		this.model = super.getModel()
    this.model.sync({ force: false })
	}
}
module.exports = new GymTypeModel()