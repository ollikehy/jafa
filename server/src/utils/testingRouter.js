const testingRouter = require('express-promise-router')()
const User = require('../models/User')
const Exercise = require('../models/Exercise')
const Workout = require('../models/Workout')

testingRouter.post('/reset', async (req, res) => {
  await User.deleteMany()
  await Exercise.deleteMany()
  await Workout.deleteMany()

  res.status(204).send('All data deleted succesfully')
})

module.exports = testingRouter