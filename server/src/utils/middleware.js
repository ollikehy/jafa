const expressJwt = require('express-jwt')
const celebrate = require('celebrate')

const jwtMiddleware = expressJwt({secret: process.env.JWT_SECRET})

const jwtNotRequired = expressJwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
})

const celebrateMiddleware = (error, req, res, next) => {
  if (celebrate.isCelebrate(error)) {
    res.status(400)

    const message = error.joi.details[0].message
    res.json({
      error: message
    })
  } else {
    res.status(error.status || 500)
    res.json({
      error: error.message
    })
  }
}

module.exports = {jwtMiddleware, jwtNotRequired, celebrateMiddleware}