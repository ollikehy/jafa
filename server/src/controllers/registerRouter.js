const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const registerRouter = require('express-promise-router')()
const User = require('../models/User')
const registerValidator = null //ToDo

registerRouter.post('/', async (req, res) => {
  console.log('router')
  const body = req.body

  const existingUser = await User.find({username: body.username})

  if (existingUser.username) {
    return res.status(401).send({error: 'Username is already taken'})
  }

  const hashedPassword = await bcrypt.hash(body.password, 10)

  const user = new User({username: body.username, password: hashedPassword})

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET)
  res.status(200).send({token, username: user.username})
})

module.exports = registerRouter