const userRouter = require('express-promise-router')()
const User = require('../models/User')
const {userValidator} = require('../utils/validators')
const {jwtMiddleware} = require('../utils/middleware')

userRouter.get('/', jwtMiddleware, async (req, res) => {
  const query = req.query

  const userData = await User.find({username: query.username})

  if (!userData) {
    return res.status(500).send({error: 'User not found'})
  }

  const user = {
    username: userData[0].username,
    weight: userData[0].weight,
    height: userData[0].height,
    admin: userData[0].admin
  }

  res.status(200).send({user})
})

userRouter.post('/', jwtMiddleware, userValidator, async (req, res) => {
  const body = req.body

  const update = {
    height: body.height ? body.height : user.height,
    weight: body.weight ? body.weight : user.weight
  }

  const updatedUser = await User.findOneAndUpdate({username: body.username}, update, {new: true})

  if (!updatedUser) {
    return res.status(500).send({error: 'User not found'})
  }

  const user = {
    username: updatedUser.username,
    weight: updatedUser.weight,
    height: updatedUser.height,
    admin: updatedUser.admin
  }

  res.status(200).send({user: user, message: 'User updated succesfully'})
})

module.exports = userRouter