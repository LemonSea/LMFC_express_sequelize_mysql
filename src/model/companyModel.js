const sequelize = require('sequelize');
const BaseModel = require('./baseModel');

class CompanyModel extends BaseModel {
	constructor() {
		super('company', {
			id: {
				field: 'id',//对应数据库的名字
				primaryKey: true,//自增
				type: sequelize.INTEGER,//类型
				autoIncrement: true
			},
			name: { type: sequelize.STRING },
		})
		this.model = super.getModel()
		this.model.sync()
	}
}
module.exports = new CompanyModel()