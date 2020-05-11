const debug = require('debug')('app:baseModel');
const sequelize = require('sequelize');
const db = require('../lib/db');//引入数据库配置信息
const Op = sequelize.Op
class BaseModel {
	constructor(tableName, schema) {
		this.model = db.define(tableName, schema, {
			tableName: tableName,//表名
			timestamps: true,//默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新。请注意，如果您使用Sequelize迁移，则需要将createdAt和updatedAt字段添加到迁移定义中
			freezeTableName: true,// 默认false修改表名为复数，true不修改表名，与数据库表名同步
			paranoid: true,  // 不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期
		})
	}
	// 返回实例化的sequelize模型实例
	getModel() {
		return this.model
	}
	/**************************************查询方法**************************************/
	// 不带过滤条件的查询
	findAll(attributes) {
		return attributes ? this.model.findAll({ attributes: attributes }) : this.model.findAll()
	}
	// 带过滤条件的精确查询
	findByFilter(attributes, where) {		
		return attributes ? this.model.findAll({ attributes: attributes, where: where }) : this.model.findAll({ where: where })
	}
	// 带过滤条件的排序精确查询
	findByFilterOrder(attributes, where, order) {
		let orderOps = [[order, 'DESC']]
		return attributes ? this.model.findAll({ attributes: attributes, where: where, order: orderOps }) : this.model.findAll({ where: where, order: orderOps })
	}
	// 带过滤条件的模糊查询
	findLikeByFilter(attributes, where) {
		let whereOps = {}
		for (let k in where) { whereOps[k] = { [Op.like]: '%' + where[k] + '%' } }
		return attributes ? this.model.findAll({ attributes: attributes, where: whereOps }) : this.model.findAll({ where: whereOps })
	}
	// 带过滤条件的排序模糊查询
	findLikeByFilterOrder(attributes, where, order) {
		let orderOps = [[order, 'DESC']]
		let whereOps = {}
		for (let k in where) { whereOps[k] = { [Op.like]: '%' + where[k] + '%' } }
		return attributes ? this.model.findAll({ attributes: attributes, where: whereOps, order: orderOps }) : this.model.findAll({ where: whereOps, order: orderOps })
	}
	/**************************************更新方法**************************************/
	// 当where为null则批量更新表；当where为条件则条件更新表
	update(attributes, where) {
		return where ? this.model.update(attributes, { where: where }) : this.model.update(attributes, { where: {} })
	}
	/**************************************删除方法**************************************/
	// 条件删除
	delete(where) {
		return this.model.destroy({ where: where })
	}
	/**************************************插入方法**************************************/
	// 插入单个实体
	create(entity) {
		return this.model.create(entity)
	}
	// 批量插入实体集
	createBatch(entitys) {
		// debug(entitys)
		return this.model.bulkCreate(entitys)
	}
}
module.exports = BaseModel