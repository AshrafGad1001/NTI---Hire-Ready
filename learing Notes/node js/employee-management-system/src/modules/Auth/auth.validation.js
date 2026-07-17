const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().required().trim().messages({
        'string.empty': 'Name is required'
    }),
    email: Joi.string().email().required().trim().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters'
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required()
});

module.exports = {
    registerSchema,
    loginSchema
};
