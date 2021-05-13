const {celebrate, Joi} = require("celebrate");
const mongoose = require('mongoose');
const {commentSchema} = require("./comment.model");

const postSchema = new mongoose.Schema({
	created_at: {
		type: Date,
		default: new Date()
	},
	title: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	pic_url: {
		type: String,
		minlength: 5,
		maxlength: 255,
		required: true,
		// default: "Default url of post picture"
	},
	author_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
		// here we are referencing another MongoDB collection called User using ObjectID.
	},
	geolocation: String,
	comments: [commentSchema],
	likes_counter: {
		type: Number,
		default: 0
	}
});

const Post = mongoose.model('Post', postSchema);

const postSchemaJoi = {
	body: Joi.object({
		created_at: Joi.string(),
		title: Joi
			.string()
			.min(3)
			.max(55)
			.required(),
		pic_url: Joi.string().required(),
		author_id: Joi.string().required(),
		geolocation: Joi.string().min(3).max(55),
		comments: Joi.array(),
		likes_counter: Joi.number().integer()
	})
};

exports.Post = Post;
exports.postSchemaJoi = postSchemaJoi;

