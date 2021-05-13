const { Router } = require ('express');
const authRoute = require("./routes/authRoute");
const usersRoute = require('./routes/usersRoute');
const postsRoute = require ("./routes/postsRoute");


module.exports =  () => {
	const app = Router();

	usersRoute(app);
	postsRoute(app);
	authRoute(app);

	return app;
}
