const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany()
})

const users = [
  {username: 'kayttaja', password: 'salasana'},
  {username: 'usr', password: 'lyhyt'}
]

test('User registration works with proper values', async () => {
  await api
    .post('/register')
    .send(users[0])
    .expect(200)
    .expect('Content-type', /application\/json/)
}, 10000)

test('If user already exists response is 401', async () => {
  await api
    .post('/register')
    .send(users[0])
    .expect(401)
    .expect('Content-type', /application\/json/)

}, 10000)

test('User registration does not work with invalid values', async () => {
  const response = await api
    .post('/register')
    .send(users[1])
    .expect(400)
    .expect('Content-type', /application\/json/)


  expect(JSON.parse(response.error.text).error).toBe('"username" length must be at least 4 characters long')
}, 10000)

test('User cannot be promoted to admin without password', async () => {
  const response = await api
    .post('/register/admin')
    .send(users[0])
    .expect(403)

  expect(response.body.error).toBe('Password required')
}, 10000)

afterAll(async () => {
  mongoose.connection.close()
  await new Promise(resolve => setTimeout(() => resolve(), 500))
})