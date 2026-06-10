const Joi = require("joi");
module.exports.postSchema =
  Joi.object({
    post:Joi.object({
      discription:Joi.string().required()
    })
  }).required();


  
