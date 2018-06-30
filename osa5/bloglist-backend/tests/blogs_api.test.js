const bcrypt = require('bcrypt')
const { app, server } = require('../index')
const supertest = require('supertest')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, nonExistingId, blogsInDb, usersInDb } = require('./test_helper')

beforeAll(async () => {

  await User.remove({})
  const passwordHash = await bcrypt.hash('salainen', 10)
  let objs = [{
    username:'root',
    name:'Root User',
    passwordHash,
    adult:true
  }].map(obj => new User(obj))
  await Promise.all(objs.map(obj => obj.save()))

  await Blog.remove({})
  const blogObjs = initialBlogs.map(blog => new Blog(blog))
  await Promise.all(blogObjs.map(blog => blog.save()))
})

describe('when there is initially some blogs saved', async () => {

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
    const blog = blogsInDatabase[0]

    console.log(blog)

    const response = await api
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe(blog.title)
    expect(response.body.author).toBe(blog.author)
    expect(response.body.url).toBe(blog.url)
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

  const getRootLoginToken = async () => {
    const response = await api
      .post('/api/login')
      .send({ username:'root',password:'salainen' })

    return response.body.token
  }

  describe('addition of a new blog', async () => {

    test('POST /api/blogs succeeds with valida data', async () => {
      const blogsBefore = await blogsInDb()

      const newBlog = {
        title: 'React patterns, Part II',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 12
      }

      const token = await getRootLoginToken()
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
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

      const token = await getRootLoginToken()

      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlog)
        .expect(400)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter.length).toBe(blogsBefore.length)
    })

    test('POST /api/blogs blog without likes gets a like value 0', async () => {
      const newBlog = {
        title: 'React patterns, Part III',
        author: 'Michael Chan and Chris Cross',
        url: 'https://reactpatterns.com/'
      }

      const token = await getRootLoginToken()

      const response = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlog)
        .expect(201)

      expect(response.body.likes).toBe(0)
    })
  })

  describe('deletion of blog', async () => {

    test('204 returned by DELETE /api/blogs/:id with existing id', async () => {
      const blogsBefore = await blogsInDb()
      const existingId = blogsBefore[blogsBefore.length-1].id

      const token = await getRootLoginToken()

      await api
        .delete(`/api/blogs/${existingId}`)
        .set('Authorization', 'bearer ' + token)
        .expect(204)

      const blogsAfter = await blogsInDb()
      expect(blogsAfter.length + 1).toBe(blogsBefore.length)
    })

    test('404 returned by DELETE /api/blogs/:id with valid nonexisting id', async () => {
      const validNonexistingId = await nonExistingId()

      const token = await getRootLoginToken()

      await api
        .delete(`/api/blogs/${validNonexistingId}`)
        .set('Authorization', 'bearer ' + token)
        .expect(404)
    })

    test('400 returned by DELETE /api/blogs/:id with invalid id', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      const token = await getRootLoginToken()

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', 'bearer ' + token)
        .expect(400)
    })
  })

})

describe('when there is initially one user saved', async () => {

  test('all users are returned as json gy GET /api/users', async () => {
    const usersBefore = await usersInDb()

    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(usersBefore.length)

    const usernames = response.body.map(n => n.username)
    usersBefore.forEach(user => {
      expect(usernames).toContain(user.username)
    })
  })

  describe('addition of a new user', async () => {

    test('POST /api/users succeeds with valid data', async (done) => {
      const usersBefore = await usersInDb()

      const newUser = {
        username: 'fanny',
        password: 'salainen'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api
        .get('/api/users')

      const usersAfter = await usersInDb()
      expect(usersAfter.length).toBe(usersBefore.length + 1)

      //const usernames = response.body.map(r => r.username)
      //expect(usernames).toContain('fanny')

      done()
    }, 5000)

    test('POST /api/users fails with proper statuscode if username is missing ', async () => {
      const newUser = {
        password: 'salainen'
      }
      const usersBefore = await usersInDb()

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAfter = await usersInDb()

      expect(usersAfter.length).toBe(usersBefore.length)
    })

    test('POST /api/users fails with proper statuscode if password is missing', async () => {
      const newUser = {
        username: 'annie',
      }
      const usersBefore = await usersInDb()

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAfter = await usersInDb()

      expect(usersAfter.length).toBe(usersBefore.length)
    })

    test('POST /api/users fails with proper statuscode if password is less that 3 characters', async () => {
      const newUser = {
        username: 'annie',
        password: 'sa'
      }
      const usersBefore = await usersInDb()

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAfter = await usersInDb()

      expect(usersAfter.length).toBe(usersBefore.length)
    })
  })
})

afterAll(() => {
  server.close()
})
