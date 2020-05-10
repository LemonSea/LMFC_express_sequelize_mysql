const debug = require('debug')('app:baseServer');
const sequelize = require('sequelize');
const Op = sequelize.Op
class BaseService{
	constructor(instance){
		this.instance = instance
	}
	baseFindAll(attributes){
		// return this.instance.findAll(attributes)
		return attributes ? this.instance.findAll({ attributes: attributes }) : this.instance.findAll()
	}
	baseFindByFilter(attributes, where){		
		// return this.instance.findByFilter(attributes, where)
		return attributes ? this.instance.findAll({ attributes: attributes, where: where }) : this.instance.findAll({ where: where })
	}
	baseFindByFilterOrder(attributes, where, order){
		// return this.instance.findByFilterOrder(attributes, where, order)
		let orderOps = [[order, 'DESC']]
		return attributes ? this.instance.findAll({ attributes: attributes, where: where, order: orderOps }) : this.instance.findAll({ where: where, order: orderOps })
	}
	baseFindLikeByFilter(attributes, where){
		// return this.instance.findLikeByFilter(attributes, where)
		let whereOps = {}
		for (let k in where) { whereOps[k] = { [Op.like]: '%' + where[k] + '%' } }
		debug(whereOps)
		return attributes ? this.instance.findAll({ attributes: attributes, where: whereOps }) : this.instance.findAll({ where: whereOps })
	
	}
	baseFindLikeByFilterOrder(attributes, where, order){
		// return this.instance.findLikeByFilterOrder(attributes, where, order)
		let orderOps = [[order, 'DESC']]
		let whereOps = {}
		for (let k in where) { whereOps[k] = { [Op.like]: '%' + where[k] + '%' } }
		return attributes ? this.instance.findAll({ attributes: attributes, where: whereOps, order: orderOps }) : this.instance.findAll({ where: whereOps, order: orderOps })
	
	}
	baseUpdate(attributes, where){
		// return this.instance.update(attributes, where)
		return where ? this.instance.update(attributes, { where: where }) : this.instance.update(attributes, { where: {} })
	}
	baseDelete(where){
		// return this.instance.delete(where)
			return this.instance.destroy({ where: where })
	}
	baseCreate(entity){
		// return this.instance.create(entity)
		return this.instance.create(entity)
	}
	baseCreateBatch(entitys){
		// return this.instance.createBatch(entitys)
		return this.instance.bulkCreate(entitys)
	}
}
module.exports = BaseService