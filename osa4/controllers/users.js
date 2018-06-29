const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
  try {
    if (!request.body.username)
      return response.status(400).json({ error: 'username is required' })

    if (!request.body.password || request.body.password.length < 3)
      return response.status(400).json({ error: 'password must be at least 3 characters' })

    const existingUser = await User.find({ username: request.body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

    const user = new User({
      username: request.body.username,
      name: request.body.name,
      adult: request.body.adult === undefined ? true : request.body.adult,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(User.format(savedUser))
  }
  catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter