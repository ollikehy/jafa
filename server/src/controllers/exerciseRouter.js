const exerciseRouter = require('express-promise-router')()
const Exercise = require('../models/Exercise')
const exerciseValidator = null //Todo
const {jwtMiddleware} = require('../utils/middleware')

exerciseRouter.post('/', jwtMiddleware, async (req, res) => {
    const body = req.body

    console.log(body)
})

module.exports = exerciseRouter