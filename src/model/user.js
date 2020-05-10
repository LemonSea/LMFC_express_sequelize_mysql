const sequelize = require('sequelize');
const db = require('../lib/db');//引入数据库配置信息

const UserInfo = require('./userInfo');
const Role = require('./role');

const User = db.define('user', {//创建一个User对象，info是表名
    id: {
        field: 'id',//对应数据库的名字
        primaryKey: true,//自增
        type: sequelize.INTEGER,//类型
        autoIncrement: true
    },
    username: {
        field: 'username',
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        field: 'password',
        type: sequelize.STRING,
        allowNull: false,
        // unique: true,
        validate: {
            isEmail: true
        }
    }
}, {
    tableName: 'user',//表名
    timestamps: true,//默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新。请注意，如果您使用Sequelize迁移，则需要将createdAt和updatedAt字段添加到迁移定义中
    freezeTableName: true// 默认false修改表名为复数，true不修改表名，与数据库表名同步
});
User.hasOne(UserInfo, {foreignKey: 'user_id', sourceKey: 'id'})
User.hasMany(Role, {foreignKey: 'user_id', sourceKey: 'id'})
// force:是否删除旧表创建新表，默认 false
User.sync({force: false});
// User.sync({force: true});
// User.hasOne(UserInfo, {foreignKey: 'user_id', sourceKey: 'id'})

module.exports = User;