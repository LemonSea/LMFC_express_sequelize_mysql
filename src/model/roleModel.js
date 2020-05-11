const sequelize = require('sequelize');
const BaseModel = require('./baseModel');
const AdminModel = require('./adminModel');
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
      isDelete: {
        field: 'isDelete',
        type: sequelize.INTEGER
      },
    })
    this.model = super.getModel()
    this.model.hasMany(AdminModel['model'], {as: 'admin', foreignKey: 'roleId', sourceKey: 'id' })
    this.model.hasMany(AuthModel['model'], {as: 'auth', foreignKey: 'roleId', sourceKey: 'id' })
    
    this.model.sync({ force: false })
  }
  
}
module.exports = new RoleModel()