const sequelize = require('sequelize');
const BaseModel = require('./baseModel');

class AuthModel extends BaseModel {
	constructor() {
		super('authority', {
			id: {
				field: 'id',//对应数据库的名字
				primaryKey: true,//自增
				type: sequelize.INTEGER,//类型
				autoIncrement: true
      },      
      roleId: {
        type: sequelize.INTEGER,
        allowNull: false
      },
      auth: {
        type: sequelize.STRING,
        allowNull: false
      },
		})
		this.model = super.getModel()
    this.model.sync({ force: false })
	}
}
module.exports = new AuthModel()