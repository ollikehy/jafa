const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express-promise-router')()
const User = require('../models/User')
const {loginValidator} = require('../utils/validators')

loginRouter.post('/', loginValidator, async (req, res) => {
  const body = req.body

  const user = await User.findOne({username: body.username})

  if (!user) {
    return res.status(401).send({error: 'Username not found'})
  }

  if (body) {
    const passwordCheck = await bcrypt.compare(body.password, user.password)
    if (!passwordCheck) return res.status(401).send({error: 'Wrong username or password'})
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }
  // eslint-disable-next-line no-undef
  const secret = process.env.NODE_ENV === 'test' ? 'test' : process.env.JWT_SECRET
  const token = jwt.sign(userForToken, secret)
  res.status(200).send({token, username: user.username, admin: user.admin})
})

module.exports = loginRouter