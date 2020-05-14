const debug = require('debug')('app:baseServer');
const sequelize = require('sequelize');
const Op = sequelize.Op
class BaseService {
	constructor(instance) {
		this.instance = instance
	}
	/**
	 * 不带条件的查询
	 * @param {过滤} attributes array
	 */
	baseFindAll(attributes) {
		return attributes ? this.instance.findAll({ attributes: attributes }) : this.instance.findAll()
	}
	baseFindAllWithParanoid(attributes) {
		return attributes 
		? this.instance.findAllWithParanoid({ attributes: attributes }) 
		: this.instance.findAllWithParanoid()
	}
	/**
	 * 带过滤条件的精确查询
	 * @param {过滤} attributes array
	 * @param {条件} where object
	 */
	baseFindByFilter(attributes, where) {
		return this.instance.findByFilter(attributes, where)
	}
	baseFindByFilterPaging(attributes, where, offset, limit) {
		return this.instance.findByFilterPaging(attributes, where, offset, limit)
	}
	baseFindLikeByFilterPaging(attributes, where, offset, limit) {
		return this.instance.findLikeByFilterPaging(attributes, where, offset, limit)
	}
	baseFindLikeByFilterPagingOrder(attributes, where, offset, limit, order, orderBy) {
		return this.instance.findLikeByFilterPagingOrder(attributes, where, offset, limit, order, orderBy)
	}
	/**
	 * 带过滤条件的排序精确查询
	 * @param {过滤} attributes array
	 * @param {条件} where object
	 * @param {排序} order string
	 */
	baseFindByFilterOrder(attributes, where, order) {
		return this.instance.findByFilterOrder(attributes, where, order)
	}
	/**
	 * 带过滤条件的模糊查询
	 * @param {过滤} attributes array
	 * @param {条件} where object
	 */
	baseFindLikeByFilter(attributes, where) {
		return this.instance.findLikeByFilter(attributes, where)
	}
	/**
	 * 带过滤条件的排序模糊查询
	 * @param {过滤} attributes array
	 * @param {条件} where object
	 * @param {排序} order string
	 */
	baseFindLikeByFilterOrder(attributes, where, order) {
		return this.instance.findLikeByFilterOrder(attributes, where, order)
	}
	/**
	 * 当where为null则批量更新表；当where为条件则条件更新表
	 * @param {修改参数} attributes object
	 * @param {条件} where object
	 */
	baseUpdate(attributes, where) {
		return this.instance.update(attributes, where)
	}
	/**
	 * 条件删除
	 * @param {条件} where object
	 */
	baseDelete(where) {
		return this.instance.delete(where)
	}
	/**
	 * 插入单个实体
	 * @param {实体} entity object
	 */
	baseCreate(entity) {
		return this.instance.create(entity)
	}
	/**
	 * 插入多个实体
	 * @param {实体数组} entitys array
	 */
	baseCreateBatch(entitys) {
		return this.instance.createBatch(entitys)
	}
}
module.exports = BaseService