const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const registerRouter = require('express-promise-router')()
const User = require('../models/User')
const registerValidator = null //ToDo

registerRouter.get('/', async (req, res) => {
  res.status(204).send()
})

registerRouter.post('/', async (req, res) => {
  const body = req.body

  const existingUser = await User.find({username: body.username})

  if (existingUser.username) {
    return res.status(401).send({error: 'Username is already taken'})
  }

  const hashedPassword = await bcrypt.hash(body.password, 10)

  const user = await new User({username: body.username, password: hashedPassword}).save()

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET)
  res.status(200).send({token, username: user.username})
})

registerRouter.post('/admin', async (req, res) => {
  const body = req.body

  if (body.pass !== process.env.ADMIN_PASS) {
    res.status(403).send()
  }

  User.findOneAndUpdate({username : body.username}, {admin: true}).then(res.status(200).send())
})

module.exports = registerRouter