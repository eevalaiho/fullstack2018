const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const loginRouter = require('./controllers/login')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')

const middleware = require('./utils/middleware')
app.use(middleware.logger)
app.use(middleware.extractToken)
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)
app.use(middleware.error)

const server = http.createServer(app)
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}