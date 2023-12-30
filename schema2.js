const Joi = require("joi");

const Schema = Joi.object({
    reviews: Joi.object({
        rating : Joi.number().required().min(1).max(5),
        content : Joi.string().required(),
    }).required()
});

module.exports = Schema;