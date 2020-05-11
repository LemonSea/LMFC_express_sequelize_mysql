const debug = require('debug')('app:controller-admin');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Jwt = require('jsonwebtoken');

const config = require('../config');

const BaseService = require('./baseService');
const AdminModel = require('../model/adminModel');
// @AutoWritedCompanyModel
class AdminService extends BaseService {
	constructor() {
		super(AdminModel)
		// super('model')
	}

	/**
	 * 验证账号
	 * @param {账号} account string
	 */
	async validationAccount(account) {
		try {
			return await this.baseFindByFilter(null, { account })
		} catch (ex) {
			throw ex
		}
	}
	/**
		 * 创建 token
		 * @param {id} id int
		 * @param {账号} account string
		 */
	generateAuthToken(id, account) {
		// deadTime
		// one hour
		const deadTime = Math.floor(Date.now() / 1000) + (60 * 60 * 60);
		const token = Jwt.sign(
			{
				_id: id,
				account: account,
				exp: deadTime,
			},
			config.jwtSecret
		)
		return token;
	}

	/**
	 * 管理员注册
	 * @param {管理员} user object
	 */
	async signUp(user) {
		try {
			// 密码加盐
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);

			return await this.baseCreate(user)
		} catch (ex) {
			throw ex
		}
	}

	/**
	 * 管理员登录
	 * @param {管理员} user object
	 */
	async signIn(password, record) {
		try {
			debug(password, record)
			// 验证密码
			const validPassword = await bcrypt.compare(password, record.password);
			if (!validPassword) {
				return false;
			}

			// 获取对应角色信息

			// 获取对应权限

			return record

		} catch (ex) {
			throw ex
		}
	}

	async find(){
		const result = await AdminModel['model'].findAll();
		debug(result)
		return result;
	}
}
module.exports = new AdminService()