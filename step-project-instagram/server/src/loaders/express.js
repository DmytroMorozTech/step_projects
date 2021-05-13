const express = require('express');
const routes = require('../api');
const cors = require('cors');
const path = require("path");

module.exports = ({app}) => {
	app.use(cors());

	app.use(express.static(__dirname + '/../../public'));
	// here we have specified the path to our static files, which will be located on the server. This folder should containe index.html, *.css and *.js files.

	// app.use(helmet());
	// app.use(compression());
	app.use(express.json({ limit: '50mb' }));

	// Load API routes
	app.use('/api', routes());

	// the route below is for all addresses that do not exist in our app. The user will be redirected to index.html page in this case.
	app.get('*',function(req, res){
		// console.log('MAIL VERSION HERE!');
		res.sendFile(path.join(__dirname + '/../../public/index.html'));
		// console.log(path.join(__dirname + '/../../public/index.html'));
	});


	/// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err['status'] = 404;

		next(err);
	});

	/// error handlers
	app.use((err, request, response, next) => {
		let statusCode = typeof err === 'object' && err.status > 0 ? err.status : 500;
		const {
			status = statusCode,
			name = '',
			message: error = 'Internal Application Error'
		} = err;

		const customResponse = response.status(statusCode).json({
			status: statusCode,
			success: false,
			error
		});

		return name === 'UnauthorizedError'
			? customResponse.end()
			: customResponse;
	});
}