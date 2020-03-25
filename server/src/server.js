const app = require('./app')
const http = require('http')

const server = http.createServer(app)

const PORT = process.env.port || 8000
const HOST = '0.0.0.0'

server.listen(PORT, () => {
  console.log(`Server running on port http://${HOST}:${PORT}`)
})

module.exports = {app, server}