const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
const Exercise = require('../models/Exercise')

const {users, cryptPassword, initialExercises, exercisesInDb} = require('../utils/testutils')

const api = supertest(app)

let token = null

beforeEach(async () => {
  await User.deleteMany()
  await Exercise.deleteMany()

  const user = await cryptPassword(users[0])
  await new User(user).save()

  const adminUser = await cryptPassword(users[2])
  await new User(adminUser).save()

  const response = await api.post('/login').send(users[0])
  token = response.body.token

  await initialExercises.forEach(exercise => new Exercise(exercise).save())
})

test('Fetching exercises returns them all as admin', async (done) => {
  const response = await api
    .get('/exercise')
    .query({username: users[2].username})
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

  const initialAccepted = initialExercises.filter(ex => ex.accepted)
  expect(response.body.length).toBe(initialAccepted.length)
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

test('Exercise suggestions can be accepted and rejected', async (done) => {
  await api
    .post('/exercise/modify')
    .set('Authorization', 'bearer ' + token)
    .send({exercise: 'Pull up', accepted: true})
    .expect(200)

  await api
    .post('/exercise/modify')
    .set('Authorization', 'bearer ' + token)
    .send({exercise: 'Bench press', accepted: false})
    .expect(200)

  const currentExercises = await exercisesInDb()
  expect(currentExercises.length).toBeLessThan(initialExercises.length)

  done()
})

test('When no exercises exist server returns 204', async (done) => {
  await Exercise.deleteMany().then(() => {
    api
      .get('/exercise')
      .expect('204')
  })

  done()
})

afterAll(async () => {
  mongoose.connection.close()
})
