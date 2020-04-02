const workoutRouter = require('express-promise-router')()
const Workout = require('../models/Workout')

workoutRouter.get('/', async (req, res) => {
  const query = req.query

  const workouts = await Workout.find({ username: query.username }).populate('exercises.exercise')

  res.status(200).send(workouts)
})

workoutRouter.post('/', async (req,res) => {
  const body = req.body

  const workout = await new Workout(body).save()

  res.status(200).send(workout)
})

module.exports = workoutRouter