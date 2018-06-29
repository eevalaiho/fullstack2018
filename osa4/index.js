const express = require('express')
const app = express()

const config = require('./utils/config')
const mongoose = require('mongoose')
mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const middleware = require('./utils/middleware')
app.use(middleware.logger)
app.use(middleware.extractToken)

const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.error)

const http = require('http')
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