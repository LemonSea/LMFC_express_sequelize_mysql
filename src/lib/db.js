const Sequelize = require('sequelize');//引入sequelize依赖
const logger = require('../middlewares/logger');

const mysql = {//本地mysql库信息配置
    host: 'localhost',//地址
    user: 'root',//用户名
    password: '1434870859',//密码
    database: 'test',//数据库名
    dialect: 'mysql'//数据库类型
};

const db = new Sequelize(mysql.database, mysql.user, mysql.password, {
    host: mysql.host,
    dialect: mysql.dialect,
    operatorsAliases: false,
    // 连接池
    pool: {
        max: 5,//最大连接池
        min: 0,
        idle: 10000
    }
});//创建连接件程序

db.authenticate().then(function() {
  logger.info("数据库连接成功");
}).catch(function(err) {
    //数据库连接失败时打印输出
    logger.error('数据库连接失败...', err);
    throw err;
});

module.exports = db;//导出