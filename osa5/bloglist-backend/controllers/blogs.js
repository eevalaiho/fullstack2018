const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User= require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1, adult: 1})
  response.json(blogs.map(Blog.format))
})

blogRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog
      .findById(request.params.id)
      .populate('user')
    if (blog) {
      response.status(200).json(Blog.format(blog))
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!token || !decodedToken.id)
      return response.status(401).json({ error: 'token missing or invalid' })

    const blog = await Blog.findById(request.params.id)
    if (!blog)
      return response.status(404).end()

    const user = await User.findById(decodedToken.id)
    if (!user || (blog.user && !(blog.user.toString() === user._id.toString())))
      return response.status(403).json({ error: 'unauthorized' })

    const result = await Blog.findByIdAndRemove(request.params.id)
    if (result)
      response.status(204).json(result).end()
    else
      response.status(400).json({ error: 'something went wrong...' })

  } catch (exception) {
    console.log(exception)
    response.status(400).send()
  }
})

blogRouter.post('/', async (request, response) => {
  try {

    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!token || !decodedToken.id)
      return response.status(401).json({ error: 'token missing or invalid' })

    const { title, author, url, likes } = request.body

    if (title === undefined || title.length === 0)
      return response.status(400).json({ error: 'title missing' })

    if (url === undefined || url.length === 0)
      return response.status(400).json({ error: 'url missing' })

    const user = await User.findById(decodedToken.id)

    const blog = await new Blog({
      author: author,
      title: title,
      url: url,
      likes: likes === undefined ? 0 : likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
  catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  try {

    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!token || !decodedToken.id)
      return response.status(401).json({ error: 'token missing or invalid' })

    if (request.body.title === undefined)
      return response.status(400).json({ error: 'title missing' })

    if (request.body.url === undefined)
      return response.status(400).json({ error: 'url missing' })

    const user = await User.findById(decodedToken.id)

    const blog = Blog.findById(request.params.id)

    if (blog.user === user._id) {
      blog.author = request.body.author
      blog.title = request.body.title
      blog.url = request.body.url
      blog.likes = request.body.likes === undefined ? 0 : request.body.likes
      const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
      response.status(201).json(savedBlog)
    }
    else {
      response.status(403).json({ error: 'something went wrong...' })
    }
  }
  catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogRouter.put('/:id/like', async (request, response) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!token || !decodedToken.id)
      return response.status(401).json({ error: 'token missing or invalid' })

    const user = await User.findById(decodedToken.id)
    if (!user)
      response.status(403).json({ error: 'user not found' })

    let blog = await Blog.findById(request.params.id)
    if (!blog)
      response.status(404).json({ error: 'blog not found' })

    blog.likes = blog.likes ? blog.likes + 1 : 1

    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  }
  catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = blogRouter