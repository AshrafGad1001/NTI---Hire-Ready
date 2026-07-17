const Joi = require('joi');

const createEmployeeSchema = Joi.object({
    name: Joi.string().required().trim(),
    position: Joi.string().required().trim(),
    department: Joi.string().required().trim(),
    salary: Joi.number().min(0).required().messages({
        'number.min': 'Salary cannot be negative'
    }),
    hireDate: Joi.date().optional()
});

const updateEmployeeSchema = Joi.object({
    name: Joi.string().trim().optional(),
    position: Joi.string().trim().optional(),
    department: Joi.string().trim().optional(),
    salary: Joi.number().min(0).optional().messages({
        'number.min': 'Salary cannot be negative'
    }),
    hireDate: Joi.date().optional()
});

module.exports = {
    createEmployeeSchema,
    updateEmployeeSchema
};
