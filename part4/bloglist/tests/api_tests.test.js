const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testBlogs = require('../utils/testblogs')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testBlogs)
})

test('gets all blogs in database', async () => {
  const allNotes = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(allNotes.body).toHaveLength(testBlogs.length)
})

test('unique identifier property of blog is named id', async () => {
  const allBlogs = await api
    .get('/api/blogs')

  const blog = allBlogs.body[0]

  expect(blog.id).toBeDefined()
})

test('new blog is created', async () => {
  const newBlog = {
    title: 'Cool Guys Blog',
    author: 'Yours Truly',
    url: 'cooldudes.com',
    likes: 2000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const allBlogs = await api
    .get('/api/blogs')

  expect(allBlogs.body).toHaveLength(testBlogs.length + 1)
})

test('missing likes property defaults to 0', async () => {
  const blog = {
    title: 'Lame blog',
    author: 'lame guy',
    url: 'lameblog.com'
  }

  const newBlog = await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)

  expect(newBlog.body.likes).toEqual(0)
})

test('missing title/url field fails', async () => {
  const noTitle = {
    author: 'Anon',
    url: 'google.com',
  }

  const noURL = {
    title: 'Should Fail',
    author: 'Anon'
  }

  await api
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(noURL)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
