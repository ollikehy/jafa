const app = require('./app')
const http = require('http')

const server = http.createServer(app)

// eslint-disable-next-line no-undef
const applicationPort = process.env.PORT || 8000
const HOST = '0.0.0.0'

server.listen(applicationPort, () => {
  console.log(`Server running on port http://${HOST}:${applicationPort}`)
})

module.exports = {app, server}