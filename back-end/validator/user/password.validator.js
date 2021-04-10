const Joi = require('joi');

const { regexpEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(50)
        .required(),
    age: Joi.number()
        .integer()
        .min(3)
        .max(100),
    gender: Joi.string().valid('female', 'male'),
    email: Joi.string().regex(regexpEnum.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEXP).required(),
});
