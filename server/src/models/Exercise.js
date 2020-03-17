const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  accepted: {
    type: Boolean,
  }
})

module.exports = mongoose.model('Exercise', schema)