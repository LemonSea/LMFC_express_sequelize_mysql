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
		super(AdminModel['model'])
		// super('model')
	}

	/**
	 * 验证账号
	 * @param {账号} account string
	 */
	validationAccount(account) {
		try {
			return AdminModel.findByFilter(null,  { account })
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

			return await AdminModel.create(user)
		} catch (ex) {
			throw ex
		}
	}
}
module.exports = new AdminService()