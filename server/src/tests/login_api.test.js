const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/User')
const {users, cryptPassword} = require('./testutils')

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany()

  const user = await cryptPassword(users[0])
  await new User(user).save()
})

test('Logging in works with existing user credentials', async () => {
  const response = await api
    .post('/login')
    .send(users[0])
    .expect(200)
    .expect('Content-type', /application\/json/)

  expect(response.body.token).toBeDefined()
})

test('Cannot login with invalid credentials', async () => {
  const response = await api
    .post('/login')
    .send({username: users[0].username, password: 'wrongpassword'})
    .expect(401)

  expect(JSON.parse(response.error.text).error).toBe('Wrong username or password')
})

test('Cannot login with nonexisting user', async () => {
  const response = await api
    .post('/login')
    .send(users[2])
    .expect(401)

  expect(JSON.parse(response.error.text).error).toBe('Username not found')
})

afterAll(async () => {
  mongoose.connection.close()
})