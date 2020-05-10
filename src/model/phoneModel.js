const sequelize = require('sequelize');
const BaseModel = require('./baseModel');
const companyModel = require('./companyModel');

class PhoneModel extends BaseModel {
	constructor() {
		super('phone', {
			id: {
				field: 'id',//对应数据库的名字
				primaryKey: true,//自增
				type: sequelize.INTEGER,//类型
				autoIncrement: true
			},
			prefix: { type: sequelize.STRING },
			number: { type: sequelize.INTEGER },
			companyId: {
				type: sequelize.INTEGER,
				allowNull: false
			},
			// companyId:{type: sequelize.INTEGER},
		})
		this.model = super.getModel()
		this.model.sync()
		// 表结构关系关联，一对多关系
		// UserInfo.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' })
		this.model.belongsTo(companyModel['model'], { as: 'company', foreignKey: 'companyId', targetKey: 'id' })
		// this.model.belongsTo(companyModel['model'], {as:'company'})
	}
}
module.exports = new PhoneModel()