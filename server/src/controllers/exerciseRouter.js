const exerciseRouter = require('express-promise-router')()
const Exercise = require('../models/Exercise')
const User = require('../models/User')
const {exerciseValidator} = require('../utils/validators')
const {jwtMiddleware, jwtNotRequired} = require('../utils/middleware')

exerciseRouter.get('/', jwtNotRequired, async (req, res) => {
  const user = await User.find({username: req.query.username})

  const exercises = user.admin ? await Exercise.find() : await Exercise.find({accepted: true})

  if (exercises.length < 1) {
    return res.status(204).send({error: 'No exercises found'})
  }

  const returnedExercises = exercises.map(exercise => exercise.toJSON())
  res.status(200).send(returnedExercises)
})

exerciseRouter.post('/', jwtMiddleware, exerciseValidator, async (req, res) => {
  const body = req.body
  const existingExercise = await Exercise.find({name: body.name})

  if (existingExercise[0]) {
    return res.status(401).send({error: 'Exercise already exists'})
  }

  const exercise = await new Exercise(body).save()
  res.status(200).send(exercise)
})

module.exports = exerciseRouter