const sequelize = require('sequelize');
const BaseModel = require('./baseModel');
const UserModel = require('./userModel');

class VCardModel extends BaseModel {
	constructor() {
		super('vcard', {
			id: {
				field: 'id',//对应数据库的名字
				primaryKey: true,//自增
				type: sequelize.INTEGER,//类型
				autoIncrement: true
			},
			amount: {type: sequelize.INTEGER}
		})
		this.model = super.getModel()
    this.model.belongsTo(UserModel['model']);
    this.model.sync({ force: false })
	}
	
  specialDAO2(){
		return this.model.findAll({
			include:[{
				model:UserModel['model'],
      }],
      // raw:true
		})
  }
}
module.exports = new VCardModel()