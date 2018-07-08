const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
  response.json(users.map(User.format))
})

userRouter.get('/:id', async (request, response) => {
  try {
    const user = await User
      .findById(request.params.id)
      .populate('blogs')
    if (user) {
      response.status(200).json(User.format(user))
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

userRouter.post('/', async (request, response) => {
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

module.exports = userRouter