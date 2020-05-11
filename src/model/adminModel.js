const sequelize = require('sequelize');
const BaseModel = require('./baseModel');
const RoleModel = require('./roleModel');

class AdminModel extends BaseModel {
  constructor() {
    super('administrator', {
      id: {
        field: 'id',//对应数据库的名字
        primaryKey: true,//自增
        type: sequelize.INTEGER,//类型
        autoIncrement: true
      },
      num: {
        type: sequelize.STRING,
      },
      nickName: {
        type: sequelize.STRING,
      },
      roleId: {
        type: sequelize.INTEGER,
        allowNull: false
      }
    })
    
    this.model = super.getModel()
    // this.model.belongsTo(RoleModel, {foreignKey: 'roleId', targetKey: 'id'});
    this.model.sync({ force: false })
  }
}
module.exports = new AdminModel()