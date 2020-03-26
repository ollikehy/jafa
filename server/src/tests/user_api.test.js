const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')

const {users, cryptPassword} = require('../utils/testutils')

const api = supertest(app)

let token = null

beforeAll(async () => {
  await User.deleteMany()

  const user = await cryptPassword(users[0])
  await new User(user).save()

  const response = await api.post('/login').send(users[0])
  token = response.body.token
})

test('Existing user data can be fetched', async (done) => {
  await api
    .get('/user')
    .set('Authorization', 'bearer ' + token)
    .query({username: users[0].username})
    .expect(200)
    .expect('Content-type', /application\/json/)

  done()
})

test('Existing user data can be updated', async (done) => {
  const updatedUser = {username: users[0].username, weight: 80, height: 180}
  const response = await api
    .post('/user')
    .set('Authorization', 'bearer ' + token)
    .send(updatedUser)
    .expect(200)
    .expect('Content-type', /application\/json/)

  expect(response.body.user.weight).toBe('80')
  expect(response.body.message).toEqual('User updated succesfully')
  done()
})

test('User can update a single value', async (done) => {
  const updatedUser = {username: users[0].username, weight: 100}
  const response = await api
    .post('/user')
    .set('Authorization', 'bearer ' + token)
    .send(updatedUser)
    .expect(200)
    .expect('Content-type', /application\/json/)

  expect(response.body.user.weight).toBe('100')
  expect(response.body.user.height).toBe(180)
  done()
})

afterAll(async () => {
  mongoose.connection.close()
})