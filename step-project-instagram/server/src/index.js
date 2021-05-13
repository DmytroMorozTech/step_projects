// import '@babel/polyfill';

const express = require('express');
const appLoader=require('./loaders/index');
const config = require('./config');

async function startServer() {
	const app = express();

	await appLoader({expressApp: app});

	app.listen(config.PORT, err => {
		if (err) {
			process.exit(1);
			return;
		}

		console.log(`
        ################################################
        Server listening on port: ${ config.PORT }
        🛡️################################################`);
	});
}

startServer();



