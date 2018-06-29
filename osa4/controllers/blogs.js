const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(Blog.format))
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
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

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const result = await Blog.findByIdAndRemove(request.params.id)
    if (result)
      response.status(204).json(result).end()
    else
      response.status(404).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    if (request.body.title === undefined)
      return response.status(400).json({ error: 'title missing' })

    if (request.body.url === undefined)
      return response.status(400).json({ error: 'url missing' })

    const blog = await new Blog({
      author: request.body.author,
      title: request.body.title,
      url: request.body.url,
      likes: request.body.likes === undefined ? 0 : request.body.likes
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
  catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    if (request.body.title === undefined)
      return response.status(400).json({ error: 'title missing' })

    if (request.body.url === undefined)
      return response.status(400).json({ error: 'url missing' })

    const blog = {
      author: request.body.author,
      title: request.body.title,
      url: request.body.url,
      likes: request.body.likes === undefined ? 0 : request.body.likes
    }
    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(201).json(savedBlog)
  }
  catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = blogsRouter