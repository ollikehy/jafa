const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
const Exercise = require('../models/Exercise')

const {users, cryptPassword, initialExercises, exercisesInDb} = require('../utils/testutils')

const api = supertest(app)

let token = null

beforeAll(async () => {
  await User.deleteMany()
  await Exercise.deleteMany()

  const user = await cryptPassword(users[0])
  await new User(user).save()

  const response = await api.post('/login').send(users[0])
  token = response.body.token
})

test('When no exercises exist server returns 204', async (done) => {
  await api
    .get('/exercise')
    .expect(204)

  done()
})

test('Fetching exercises returns them all', async (done) => {
  await initialExercises.forEach(exercise => new Exercise(exercise).save())

  const response = await api
    .get('/exercise')
    .expect(200)
    .expect('Content-type', /application\/json/)

  expect(response.body.length).toBe(initialExercises.length)
  done()
})

test('Exercises can be suggested by non-admin user', async (done) => {
  const newExercise = {name: 'Swimming', distanceExercise: true, accepted: false}
  await api
    .post('/exercise')
    .set('Authorization', 'bearer ' + token)
    .send(newExercise)
    .expect(200)

  const currentExercises = await exercisesInDb()
  expect(currentExercises.length).toBeGreaterThan(initialExercises.length)
  done()
})

test('Non admin users can only fetch accepted exercises', async (done) => {
  const response = await api
    .get('/exercise')
    .expect(200)

  expect(response.body.length).toBe(initialExercises.length)
  done()
})

test('Exercise names need to be unique', async (done) => {
  const oldExercise = {name: 'Running', distanceExercise: true, accepted: false}
  await api
    .post('/exercise')
    .set('Authorization', 'bearer ' + token)
    .send(oldExercise)
    .expect(401)

  done()
})

afterAll(async () => {
  mongoose.connection.close()
})