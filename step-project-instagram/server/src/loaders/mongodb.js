const mongoose = require('mongoose');
const config = require('../config');

/**
 * @desc З'єднання з Базою Даних
 * @return {Promise}
 **/
module.exports = {
	connectToMongoDb: async function connectToMongoDb() {
		const connection = await mongoose
			.connect(
				config.MONGODB_URI, {
					useNewUrlParser: true,
					useCreateIndex: true,
					useUnifiedTopology: true
				});

		return connection.connection.db;}
}