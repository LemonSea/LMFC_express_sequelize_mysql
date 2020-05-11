const sequelize = require('sequelize');
const BaseModel = require('./baseModel');
const RoelModel = require('./roleModel');

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
      avatar: {
        type: sequelize.STRING,
      },
      account: {
        type: sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: sequelize.STRING,
        allowNull: false,
      },
      IDCard: {
        type: sequelize.STRING,
      },
      realName: {
        type: sequelize.STRING,
      },
      gender: {
        type: sequelize.INTEGER,
      },
      age: {
        type: sequelize.INTEGER,
      },
      birthday: {
        type: sequelize.DATEONLY,
      },
      prefix: {
        type: sequelize.INTEGER,
      },
      phone: {
        type: sequelize.INTEGER,
      },
      email: {
        type: sequelize.STRING,
        validate: {
          isEmail: true,
        }
      },
      qq: {
        type: sequelize.STRING,
      },
      wechat: {
        type: sequelize.STRING,
      },
      status: {
        type: sequelize.INTEGER,
        allowNull: false,
      },
      roleId: {
        type: sequelize.INTEGER,
        allowNull: false
      }
    })
    
    this.model = super.getModel()
    // this.model.belongsTo(RoleModel['model'], {foreignKey: 'roleId', targetKey: 'id'});
    // this.model.belongsTo(RoelModel['model'], {foreignKey: 'roleId', targetKey: 'id'});
    this.model.sync({ force: false })
  }
  
}
module.exports = new AdminModel()