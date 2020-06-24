const express = require('express'),
      app = express()

app.use('/', express.static(__dirname + '/public/dist'))

require('./router/ttNews')(app)
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message
  })
})

module.exports = app