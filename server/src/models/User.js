const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  weight: {
    type: String
  },
  height: {
    type: Number
  }
})

module.exports = mongoose.model('User', schema)