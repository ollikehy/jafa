const bcrypt = require('bcryptjs')

const users = [
  {username: 'johnnydoe', password: 'password123'},
  {username: 'usr', password: 'short'},
  {username: 'johndoe', password: 'hunter2'},
  {username: 'admintest', pass: 'hackerman'}
]

const cryptPassword = async (user) => {
  const hashed = await bcrypt.hash(user.password, 10)
  return {username: user.username, password: hashed}
}

module.exports = {users, cryptPassword}