const app = require('./app')
const http = require('http')

const server = http.createServer(app)

// eslint-disable-next-line no-undef
const PORT = process.env.port || 8000
const HOST = '0.0.0.0'

server.listen(PORT, () => {
  console.log(`Server running on port http://${HOST}:${PORT}`)
})

module.exports = {app, server}