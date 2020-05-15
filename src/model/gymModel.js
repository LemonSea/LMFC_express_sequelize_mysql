const sequelize = require('sequelize');
const BaseModel = require('./baseModel');
const roleModel = require('./roleModel');
const coachStatusModel = require('./coachStatusModel');
const coachTypeModel = require('./coachTypeModel');

class CoachModel extends BaseModel {
  constructor() {
    super('coach', {
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
      account: {
        type: sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: sequelize.STRING,
        allowNull: false,
      },
      realName: {
        type: sequelize.STRING,
      },  
      IDCard: {
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
      avatar: {
        type: sequelize.STRING,
      },  
      photo: {
        type: sequelize.STRING,
      },
      prefix: {
        type: sequelize.STRING,
      },
      phone: {
        type: sequelize.STRING,
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
      // statusId: {
      //   type: sequelize.INTEGER,
      //   allowNull: false,
      // },
      // typeId: {
      //   type: sequelize.INTEGER,
      //   allowNull: false,
      // },
      roleId: {
        type: sequelize.INTEGER,
        allowNull: false
      }
    })

    this.model = super.getModel()
    // 一对多关系
    this.model.belongsTo(roleModel['model']);
    this.model.belongsTo(coachStatusModel['model']);
    this.model.belongsTo(coachTypeModel['model']);
    // this.model.belongsTo(RoleModel['model'], {foreignKey: 'roleId', targetKey: 'id'});
    // this.model.belongsTo(RoelModel['model'], {foreignKey: 'roleId', targetKey: 'id'});
    this.model.sync({ force: false })
  }	
}
module.exports = new CoachModel()