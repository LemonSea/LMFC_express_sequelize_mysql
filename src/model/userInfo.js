const sequelize = require('sequelize');
const db = require('../lib/db');//引入数据库配置信息
const User = require('./user')

const UserInfo = db.define('user_info', {//创建一个User对象，info是表名
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  // user_id: {
  //   type: sequelize.INTEGER,
  //   allowNull: false
  // },
  birthday: {
    type: sequelize.DataTypes.DATEONLY,
    allowNull: true
  },
  nickname: {
    type: sequelize.STRING,
    allowNull: true
  }
}, {
  tableName: 'user_info',//表名
  timestamps: true,//默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新。请注意，如果您使用Sequelize迁移，则需要将createdAt和updatedAt字段添加到迁移定义中
  freezeTableName: true// 默认false修改表名为复数，true不修改表名，与数据库表名同步
});

UserInfo.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' })
// force:是否删除旧表创建新表，默认 false
UserInfo.sync({ force: true });
// UserInfo.sync({ force: false });
module.exports = UserInfo;