const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

//Reading data from file .env.develop into variable `envFound`
const envFound = dotenv.config({path: '.env.develop'});

if (!envFound) {
	throw new Error(`⚠  Couldn't find .env file  ⚠`);
}

module.exports = {
	/**
	 * @desc Оточення в якому працює система
	 * @type {String}
	 **/
	ENV: process.env.NODE_ENV,

	/**
	 * @desc Доступи до Бази Даних
	 * @type {String}
	 **/
	MONGODB_URI: process.env.MONGODB_URI,

	/**
	 * @desc Ключ для шифрування JWT токена
	 * @type {String}
	 **/
	JWT_SECRET: process.env.JWT_SECRET,

	/**
	 * @desc Порт на якому запускається система
	 * @type {Number}
	 **/
	PORT: process.env.PORT,

	/**
	 * @desc Властивість де зберігається ім'я розробника
	 * @type {String}
	 **/
	DEV_ID: process.env.DEV_NAME,

};
