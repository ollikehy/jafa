const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const registerRouter = require('express-promise-router')()
const User = require('../models/User')
const {registrationValidator} = require('../utils/validators')

registerRouter.get('/', async (req, res) => {
  res.status(204).send()
})

registerRouter.post('/', registrationValidator, async (req, res) => {
  const body = req.body

  const existingUser = await User.find({username: body.username})

  if (existingUser[0]) {
    return res.status(401).send({error: 'Username is already taken'})
  }

  const hashedPassword = await bcrypt.hash(body.password, 10)

  const user = await new User({username: body.username, password: hashedPassword}).save()

  const userForToken = {
    username: user.username,
    id: user.id
  }

  // eslint-disable-next-line no-undef
  const token = jwt.sign(userForToken, process.env.JWT_SECRET)
  res.status(200).send({token, username: user.username})
})

registerRouter.post('/admin', async (req, res) => {
  const body = req.body

  // eslint-disable-next-line no-undef
  if (body.pass !== process.env.ADMIN_PASS) {
    return res.status(403).send({error: 'Password required'})
  }
  User.findOneAndUpdate({username: body.username}, {admin: true}).then(res.status(200).send())
})

module.exports = registerRouter