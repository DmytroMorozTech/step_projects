const {celebrate, Joi} = require("celebrate");
const mongoose = require('mongoose');
Joi.objectId = require("joi-objectid")(Joi);
// npm package "joi-objectid" allows us to verify incoming info from client for correct objectIds.

const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 500
	},
	author_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
		// here we are referencing another MongoDB collection called User using ObjectID to find out the author
	},
	created_at: {
		type: Date,
		default: new Date()
	}
});

const Comment = mongoose.model('Comment', commentSchema);

const commentSchemaJoi = {
	body: Joi.object({
		created_at: Joi.string(),
		text: Joi
			.string()
			.min(3)
			.max(500),
		author_id: Joi.objectId().required(),
		post_id: Joi.objectId().required()
	})
};

exports.Comment = Comment;
exports.commentSchema = commentSchema;
exports.commentSchemaJoi = commentSchemaJoi;

