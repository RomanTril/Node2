const Joi=require('joi');
const regex=require ('../config/regexp.enum');

module.exports={
    newUserValidator:Joi.object({
        name:Joi.string().min(2).max(100).required().default(''),
        email:Joi.string().regex(regex.EMAIL).required().trim().lowercase(),
        password:Joi.string().regex(regex.PASSWORD).required(),
        age:Joi.number().integer().min(1).max(130)
    }),

    editUserValidator:Joi.object({
        name:Joi.string().min(2).max(100).default('').optional(),
        email:Joi.string().regex(regex.EMAIL).trim().lowercase().optional(),
        age:Joi.number().integer().min(1).max(130).optional()
    })
}