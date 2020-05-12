const sequelize = require('sequelize');
const BaseModel = require('./baseModel');
// const UserModel = require('./userModel');

class SiteModel extends BaseModel {
	constructor() {
		super('site', {
			id: {
				field: 'id',//对应数据库的名字
				primaryKey: true,//自增
				type: sequelize.INTEGER,//类型
				autoIncrement: true
			},
			serial: {type: sequelize.STRING},
			manSerial: {type: sequelize.STRING},
			coaSerial: {type: sequelize.STRING},
			name: {type: sequelize.STRING},
			description: {type: sequelize.STRING},
			logo: {type: sequelize.STRING}
		})
		this.model = super.getModel()
    // this.model.belongsTo(UserModel['model']);
    this.model.sync({ force: false })
	}
	
  // specialDAO2(){
	// 	return this.model.findAll({
	// 		include:[{
	// 			model:UserModel['model'],
  //     }],
  //     // raw:true
	// 	})
  // }
}
module.exports = new SiteModel()