const Joi = require('joi');

const passwordRegex = /(?=.*\d)(?=.*[a-z]).{6,}/;

module.exports = {
	passwordRegex,
	signup: {
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string()
			.regex(passwordRegex)
			.required(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required()
	}
};
