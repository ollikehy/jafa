const exerciseRouter = require('express-promise-router')()
const Exercise = require('../models/Exercise')
const User = require('../models/User')
const {exerciseValidator} = require('../utils/validators')
const {jwtMiddleware, jwtNotRequired} = require('../utils/middleware')

exerciseRouter.get('/', jwtNotRequired, async (req, res) => {
  let exercises = []
  if (req.query.username) {
    const user = await User.find({username: req.query.username})
    if (user[0].admin) {
      exercises = await Exercise.find()
    } else {
      exercises = await Exercise.find({accepted: true})
    }
  } else {
    exercises = await Exercise.find({accepted: true})
  }

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

exerciseRouter.post('/modify', jwtMiddleware, async (req, res) => {
  const body = req.body

  if (body.accepted && body.exercise) {
    await Exercise.findOneAndUpdate(
      {name: body.exercise},
      {accepted: true},
      {new: true})
    res.status(200).send({message: 'Exercise accepted'})

  } else if (!body.accepted && body.exercise) {
    await Exercise.deleteOne({name: body.exercise})
    res.status(200).send({message: 'Exercise deleted succesfully'})
  }
})

module.exports = exerciseRouter