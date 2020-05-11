const sequelize = require('sequelize');
const BaseModel = require('./baseModel');
const vcardModel = require('./vcardModel');

class UserModel extends BaseModel {
	constructor() {
		super('user', {
			id: {
				field: 'id',//对应数据库的名字
				primaryKey: true,//自增
				type: sequelize.INTEGER,//类型
				autoIncrement: true
      },
      name: {
        type: sequelize.STRING,
        allowNull: false,
      },
		})
    this.model = super.getModel()
    // this.model.hasOne(User)
    this.model.sync({ force: false })
	}	
	
  specialDAO2(){
		return this.model.findAll({
			include:[{
				model:vcardModel['model'],
      }],
      // raw:true
		})
  }
}
module.exports = new UserModel()