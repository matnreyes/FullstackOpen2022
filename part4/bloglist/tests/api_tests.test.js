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

afterAll(() => {
  mongoose.connection.close()
})
