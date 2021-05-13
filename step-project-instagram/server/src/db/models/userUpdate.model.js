const {celebrate, Joi} = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);
// npm package "joi-objectid" allows us to verify incoming info from client for correct objectIds.

const userUpdateSchemaJoi = {
	body: Joi.object({
		active_user: Joi.objectId().required(),
		action_type: Joi.string().min(3).max(55),
		action_payload: Joi.objectId().required(),
	})
};

exports.userUpdateSchemaJoi = userUpdateSchemaJoi;

