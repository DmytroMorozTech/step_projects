import {UserModel} from '../db/models';
import jwt from 'jsonwebtoken';
import config from '../config';
import {randomBytes} from 'crypto';
import argon2 from 'argon2';

export default class UserService {

	/**
	 * @desc Вибрати Користувача з БД
	 * @param {String} userId
	 * @return {Promise}
	 **/
	static async getUserById(userId) {
		return UserModel.findById(userId);
	}

	static async login({email, password}) {
		const user = await UserModel.findOne({
			email
		});

		if (!user) {
			throw new Error('User not found');
		}

		const verification = await argon2.verify(user.password, password, {
			salt: user.salt
		});

		if (!verification) {
			throw new Error('Invalid Password');
		}

		const result = user.toObject();

		delete result.__v;
		delete result.salt;
		delete result.password;

		return result;
	}


	// /**
	//  * @desc Створення Користувача
	//  * @param {String} name
	//  * @param {String} email
	//  * @param {String} password
	//  * @return {Promise}
	//  **/
	// static async createUser({name, email, password}) {
	// 	const salt = randomBytes(32);
	// 	const pswd = await argon2.hash(password, {salt});
	// 	const user = await UserModel.create({
	// 		email,
	// 		name,
	// 		salt,
	// 		password: pswd
	// 	});
	//
	// 	const today = new Date();
	// 	const exp = new Date(today);
	// 	exp.setDate(today.getDate() + 60);
	//
	// 	const token = jwt.sign(
	// 		{
	// 			_id: user._id,
	// 			name: user.name,
	// 			exp: exp.getTime() / 1000,
	// 		},
	// 		config.JWT_SECRET,
	// 	);
	//
	// 	const result = user.toObject();
	//
	// 	delete result.__v;
	// 	delete result.salt;
	// 	delete result.password;
	//
	// 	return {
	// 		...result,
	// 		token
	// 	}
	// }
}