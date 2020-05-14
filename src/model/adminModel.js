const sequelize = require('sequelize');
const BaseModel = require('./baseModel');
const roleModel = require('./roleModel');
const authModel = require('./authModel');

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
      photo: {
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
    // 一对多关系
    this.model.belongsTo(roleModel['model']);
    // this.model.belongsTo(RoleModel['model'], {foreignKey: 'roleId', targetKey: 'id'});
    // this.model.belongsTo(RoelModel['model'], {foreignKey: 'roleId', targetKey: 'id'});
    this.model.sync({ force: false })
  }
  specialDAO2() {
    return this.model.findAll({
      include: [{
        model: roleModel['model'],
      }],
      // raw:true
    })
  }
  specialDAO3() {
    return this.model.findAll({
      include: [
        {
          attributes:['name'],
          model: roleModel['model'],
          include: [
            {
              attributes:['auth'],
              model: authModel['model'],
              as: 'auth'
            }
          ]
        }
      ],
      // raw:true
    })
  }
  
	
}
module.exports = new AdminModel()