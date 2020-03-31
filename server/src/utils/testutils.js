const bcrypt = require('bcryptjs')
const Exercise = require('../models/Exercise')

const users = [
  {username: 'johnnydoe', password: 'password123'},
  {username: 'usr', password: 'short'},
  {username: 'johndoe', password: 'hunter2', admin: true},
  {username: 'admintest', pass: 'hackerman'}
]

const initialExercises = [
  {name: 'Dumbell curl', weightExercise: true, accepted: true},
  {name: 'Running', distanceExercise: true, accepted: true},
  {name: 'Squat', weightExercise: true, accepted: true}
]

const exercisesInDb = async () => {
  const exercises = await Exercise.find()
  return exercises
}

const cryptPassword = async (user) => {
  const hashed = await bcrypt.hash(user.password, 10)
  return {username: user.username, password: hashed}
}

module.exports = {users, cryptPassword, initialExercises, exercisesInDb}