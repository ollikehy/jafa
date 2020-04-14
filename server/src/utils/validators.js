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

const exerciseValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(4),
    weightExercise: Joi.boolean(),
    distanceExercise: Joi.boolean(),
    timedExercise: Joi.boolean(),
    accepted: Joi.boolean().required()
  })
})

const workoutValidator = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required(),
    date: Joi.string().required(),
    exercises: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        id: Joi.string().required(),
        weight: Joi.number().allow(null),
        distance: Joi.number().allow(null),
        time: Joi.number().allow(null),
        sets: Joi.number().allow(null),
        repetitions: Joi.number().allow(null)
      })
    )
  })
})

const validators = {
  registrationValidator,
  loginValidator,
  userValidator,
  exerciseValidator,
  workoutValidator
}

module.exports = validators