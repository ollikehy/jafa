const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const {celebrateMiddleware} = require('./utils/middleware')

const registerRouter = require('./controllers/registerRouter')
const loginRouter = require('./controllers/loginRouter')
const userRouter = require('./controllers/userRouter')
const exerciseRouter = require('./controllers/exerciseRouter')

// eslint-disable-next-line no-undef
const PORT = process.env.port || 8000
const HOST = '0.0.0.0'

require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/user', userRouter)
app.use('/exercise', exerciseRouter)

app.use(celebrateMiddleware)

const server = http.createServer(app)

// eslint-disable-next-line no-undef
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-st9gc.gcp.mongodb.net/${process.env.NODE_ENV}?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
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