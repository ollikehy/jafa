const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/User')
const Exercise = require('../models/Exercise')
const Workout = require('../models/Workout')

const { users, cryptPassword, newWorkout, initializeExercises } = require('../utils/testutils')

let token = null

beforeAll(async () => {
  await User.deleteMany()
  await Exercise.deleteMany()
  await Workout.deleteMany()

  const user = await cryptPassword(users[0])
  await new User(user).save()

  const response = await api.post('/login').send(users[0])
  token = response.body.token
  await Exercise.deleteMany().then(initializeExercises())
})

beforeEach(async () => {
  await Workout.deleteMany()
})

test('A new workout is created properly', async (done) => {
  const workout = await newWorkout()
  await api
    .post('/workout')
    .set('Authorization', 'bearer ' + token)
    .send(workout)
    .expect(200)

  done()
})

test('A workout with no exercises cannot be saved', async (done) => {
  const workout = { username: users[0].username, date: new Date(), exercises: [] }
  await api
    .post('/workout')
    .set('Authorization', 'bearer ' + token)
    .send(workout)
    .expect(400)

  done()
})

test('Authorized user can fetch its workouts', async (done) => {
  const workout = await newWorkout()
  await api
    .post('/workout')
    .set('Authorization', 'bearer ' + token)
    .send(workout)
    .expect(200)

  const response = await api
    .get('/workout')
    .set('Authorization', 'bearer ' + token)
    .query({ username: users[0].username })
    .expect(200)
    .expect('content-type', /application\/json/)

  expect(response.body.length).toBe(1)
  done()
})

test('Authorized user can delete its workouts', async (done) => {
  const workout = await newWorkout()
  await api
    .post('/workout')
    .set('Authorization', 'bearer ' + token)
    .send(workout)
    .expect(200)

  const response = await api
    .get('/workout')
    .set('Authorization', 'bearer ' + token)
    .query({ username: users[0].username })
    .expect(200)
    .expect('content-type', /application\/json/)

  expect(response.body.length).toBe(1)

  await api
    .post('/workout/delete')
    .set('Authorization', 'bearer ' + token)
    .send({ id: response.body[0].id })
    .expect(200)

  const newResponse = await api
    .get('/workout')
    .set('Authorization', 'bearer ' + token)
    .query({ username: users[0].username })
    .expect(200)
    .expect('content-type', /application\/json/)

  expect(newResponse.body.length).toBe(0)

  done()
})

afterAll(async () => {
  mongoose.connection.close()
})