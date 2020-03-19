const exerciseRouter = require('express-promise-router')()
const Exercise = require('../models/Exercise')
const {exerciseValidator} = require('../utils/validators')
const {jwtMiddleware} = require('../utils/middleware')

exerciseRouter.post('/', jwtMiddleware, exerciseValidator, async (req, res) => {
    const body = req.body

    const existingExercise = await Exercise.find({name: body.name})

    if (existingExercise[0]) {
        return res.status(401).send({error: 'Exercise already exists'})
    }

    const exercise = await new Exercise(body).save()
    res.status(200).send(exercise)
})

module.exports = exerciseRouter