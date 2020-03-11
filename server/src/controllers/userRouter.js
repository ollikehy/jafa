const userRouter = require('express-promise-router')()
const User = require('../models/User')

userRouter.get('/', async (req, res) => {
  const query = req.query

  const userData = await User.find({username: query.username})

  if (!userData) {
    return res.status(500).send({error: 'User not found'})
  }

  const user = {
    username: userData[0].username,
    weight: userData[0].weight,
    height: userData[0].height
  }

  res.status(200).send({user})
})

module.exports = userRouter