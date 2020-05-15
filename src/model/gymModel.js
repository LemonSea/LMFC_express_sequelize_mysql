const sequelize = require('sequelize');
const BaseModel = require('./baseModel');
const roleModel = require('./roleModel');
const gymStatusModel = require('./gymStatusModel');
const gymTypeModel = require('./gymTypeModel');

class GymModel extends BaseModel {
  constructor() {
    super('gym', {
      id: {
        field: 'id',//对应数据库的名字
        primaryKey: true,//自增
        type: sequelize.INTEGER,//类型
        autoIncrement: true
      },
      num: {
        type: sequelize.STRING,
      }
    })

    this.model = super.getModel()
    // 一对多关系
    this.model.belongsTo(gymStatusModel['model']);
    this.model.belongsTo(gymTypeModel['model']);
    // this.model.belongsTo(RoleModel['model'], {foreignKey: 'roleId', targetKey: 'id'});
    // this.model.belongsTo(RoelModel['model'], {foreignKey: 'roleId', targetKey: 'id'});
    this.model.sync({ force: false })
  }	
}
module.exports = new GymModel()