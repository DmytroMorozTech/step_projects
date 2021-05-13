const asyncMiddleware = require("./middlewares/async");
const {Router} = require('express');
const bcrypt = require('bcrypt');
const {Joi, celebrate} = require("celebrate");
const {User} = require("../../db/models/user.model");

const route = Router();

const userSignInSchema = {
	body: Joi.object({
		email: Joi
			.string()
			.email()
			.required()
			.error(new Error('Email is required field.')),
		password: Joi
			.string()
			.required()
			.error(new Error('Password is required field.'))
	})
};

module.exports =  (app) => {
	app.use('/auth', route);
	// when user submits his login and password for signing in at front-end, this data arrives to this route.

	route.post('/', celebrate(userSignInSchema),
		asyncMiddleware(async (req, res, next) => {
					const {email, password} = req.body;

					let user = await User.findOne({ email: email });
					if (!user) return res.status(400).send('Invalid email or password');

					const validPassword = await bcrypt.compare(password, user.password);
					if (!validPassword) return res.status(400).send('Invalid email or password');

					const token = user.generateAuthToken();
					console.log('USER LOGGED IN!')

					res.send({
						token: token,
						id: user._id
					});
			}
		)
	)
}