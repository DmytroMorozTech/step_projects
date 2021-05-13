const expressLoader = require("./express");
const {connectToMongoDb} = require("./mongodb");

module.exports = async ({expressApp}) => {

	await connectToMongoDb();
	console.log('✌ MongoDB is connected and loaded!');

	await expressLoader({ app: expressApp });
	console.log('✌ Express loaded');
};