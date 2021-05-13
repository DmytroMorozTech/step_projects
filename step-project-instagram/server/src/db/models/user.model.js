const config = require('../../config/index');
const {celebrate, Joi} = require("celebrate");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {Post} = require ('./post.model');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		// required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	surname: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
		default: "Default SURNAME"
	},
	username: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
		default: "Default username"
	},
	avatar_url: {
		type: String,
		minlength: 5,
		maxlength: 255,
		required: true,
		default: "Default avatar_url address"
	},
	created_at: {
		type: Date,
		default: new Date()
	},
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}],
	subscriptions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	subscribers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	liked_posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}],
	saved_posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}]
});

userSchema.methods.generateAuthToken = function(){
	const token = jwt.sign({_id: this._id}, config.JWT_SECRET);
	return token;
}

const User = mongoose.model('User', userSchema);

const userSchemaJoi = {
	body: Joi.object({
		email: Joi
			.string()
			.email()
			.required()
			.error(new Error('Email is required field.')),
		password: Joi
			.string()
			.required()
			.error(new Error('Password is required field.')),
		name: Joi.string().min(3).max(55),
		surname: Joi.string().min(3).max(55).required(),
		username: Joi.string().min(3).max(55),
		avatar_url: Joi.string().required(),
		created_at: Joi.string(),
		posts: Joi.array(),
		subscriptions: Joi.array(),
		subscribers: Joi.array(),
		liked_posts: Joi.array(),
		saved_posts: Joi.array()
	})
};

exports.User = User;
exports.userSchemaJoi = userSchemaJoi;

