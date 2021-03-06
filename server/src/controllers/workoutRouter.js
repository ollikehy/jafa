const workoutRouter = require('express-promise-router')()
const Workout = require('../models/Workout')
const { jwtMiddleware } = require('../utils/middleware')
const { workoutValidator } = require('../utils/validators')

workoutRouter.get('/', jwtMiddleware, async (req, res) => {
  const query = req.query

  const workouts = await Workout.find({ username: query.username }).populate('exercises.exercise')

  res.status(200).send(workouts)
})

workoutRouter.post('/', jwtMiddleware, workoutValidator, async (req, res) => {
  const body = req.body

  if (body.exercises.length < 1) {
    return res.status(400).send({ error: 'No exercises added to the workout' })
  }

  const workout = await new Workout(body).save()

  res.status(200).send(workout)
})

workoutRouter.post('/delete', jwtMiddleware, async (req, res) => {
  const body = req.body

  if (!body.id) {
    return res.status(400).send({ error: 'Failed to delete workout' })
  }

  await Workout.deleteOne({ _id: body.id })

  res.status(200).send()

})

module.exports = workoutRouter