const testingRouter = require('express-promise-router')()
const User = require('../models/User')
const Exercise = require('../models/Exercise')

testingRouter.post('/reset', async (req, res) => {
  await User.deleteMany()
  await Exercise.deleteMany()

  res.status(204).end()
})

module.exports = testingRouter