const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe('when there is initially some notes saved', async () => {

  beforeAll(async () => {
    await Blog.remove({})
    const blogObjs = initialBlogs.map(blog => new Blog(blog))
    await Promise.all(blogObjs.map(blog => blog.save()))
  })

  test('all blogs are returned as json gy GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedContents = response.body.map(n => n.content)
    blogsInDatabase.forEach(note => {
      expect(returnedContents).toContain(note.content)
    })
  })

  test('individual blogs are returned as json by GET /api/blogs/:id', async () => {
    const blogsInDatabase = await blogsInDb()
    const aBlog = blogsInDatabase[0]

    const response = await api
      .get(`/api/blogs/${aBlog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe(aBlog.title)
    expect(response.body.author).toBe(aBlog.author)
    expect(response.body.url).toBe(aBlog.url)
  })

  test('404 returned by GET /api/blogs/:id with nonexisting valid id', async () => {
    const validNonexistingId = await nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('400 is returned by GET /api/blogs/:id with invalid id', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')

    const title = response.body.map(r => r.title)

    expect(title).toContain('Canonical string reduction')
  })

  describe('addition of a new blog', async () => {

    test('POST /api/blogs succeeds with valida data', async () => {
      const blogsBefore = await blogsInDb()

      const newBlog = {
        title: 'React patterns, Part II',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 12
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api
        .get('/api/blogs')

      const blogsAfter = await blogsInDb()

      expect(blogsAfter.length).toBe(blogsBefore.length + 1)

      const title = response.body.map(r => r.title)

      expect(title).toContain('React patterns, Part II')
    })

    test('POST /api/notes fails with proper statuscode if title or url is missing ', async () => {
      const newBlog = {
        author: 'New Author',
        likes: 1
      }

      const blogsBefore = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter.length).toBe(blogsBefore.length)
    })

    test('blog without likes gets a like value 0', async () => {
      const newBlog = {
        title: 'React patterns, Part III',
        author: 'Michael Chan and Chris Cross',
        url: 'https://reactpatterns.com/'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

      expect(response.body.likes).toBe(0)
    })
  })

  afterAll(() => {
    server.close()
  })

})