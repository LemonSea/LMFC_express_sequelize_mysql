const sequelize = require('sequelize');
const BaseModel = require('./baseModel');
// const AdminModel = require('./adminModel');
const AuthModel = require('./authModel');

class RoleModel extends BaseModel {
  constructor() {
    super('role', {
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
    // as:如果定义了as，它将代替目标模型名称。
    // foreignKey:在所有情况下，都可以使用foreignKey选项覆盖默认外键。
    // targetKey:目标键是目标模型上的列，其是源模型外键列所指向的列。
    // this.model.hasMany(AdminModel['model'], {as: 'admin', foreignKey: 'roleId', sourceKey: 'id' })
    this.model.hasMany(AuthModel['model'], {as: 'auth', foreignKey: 'roleId', sourceKey: 'id' })
    // this.model.hasMany(AuthModel['model'],{as: 'Workers'});
    this.model.sync({ force: false })
  }
  specialDAO2(){
		return this.model.findAll({
			// attributes:['name', 'age'],
			include:[{
				model:AuthModel['model'], 
				as: 'auth'
        // where: {'cname': '阿里巴巴'}
        // row:true
			}]
		})
	}
}
module.exports = new RoleModel()