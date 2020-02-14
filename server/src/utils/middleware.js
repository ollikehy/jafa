const expressJwt = require('express-jwt')

const jwtMiddleware = expressJwt({secret: process.env.JWT_SECRET})

const jwtNotRequired = expressJwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
})

module.exports = {jwtMiddleware, jwtNotRequired}