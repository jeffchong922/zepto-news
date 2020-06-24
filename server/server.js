const http = require('http'),
      app = require('./app'),
      dotenv = require('dotenv')

dotenv.config()

const server = http.createServer(app)

server.listen(process.env.PORT || 8488, () => {
  console.log(`'Server is running on port ${process.env.PORT || 8848}'`)
})