const {celebrate, Joi} = require('celebrate')

const registrationValidator = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().min(4),
    password: Joi.string().required().min(8)
  })
})

const loginValidator = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
})

const userValidator = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required(),
    weight: Joi.number(),
    height: Joi.number()
  })
})

const validators = {
  registrationValidator,
  loginValidator,
  userValidator
}

module.exports = validators