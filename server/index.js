const express = require('express')
const http = require('http')
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.port || 8000
const HOST = '0.0.0.0'

const app = express()

app.use(morgan('dev'))

const server = http.createServer(app)

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-st9gc.gcp.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.log('mongodb error ' + error)
  })

server.listen(PORT, () => {
  console.log(`Server running on port http://${HOST}:${PORT}`)
})

module.exports = {app, server}