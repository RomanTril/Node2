const Joi=require('joi');
const regex = require("../config/regexp.enum");

module.exports={
    loginValidator:Joi.object({
        email:Joi.string().regex(regex.EMAIL).required().trim().lowercase(),
        password:Joi.string().regex(regex.PASSWORD).required(),
    })
}