/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testBlogs = require('../utils/testblogs')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token = 0

beforeEach(async () => {
  const signIn = await api
    .post('/api/login')
    .send({
      username: 'username',
      password: 'password'
    })

  token = `bearer ${signIn.body.token}`
  const user = await User.find({})
  testBlogs.forEach((blog) => {
    blog.user = user[0]._id
  })
  await Blog.deleteMany({})
  await Blog.insertMany(testBlogs)
})

test('gets all blogs in database', async () => {
  const allNotes = await api
    .get('/api/blogs')
    .set({ Authorization: token })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(allNotes.body).toHaveLength(testBlogs.length)
})

test('unique identifier property of blog is named id', async () => {
  const allBlogs = await api
    .get('/api/blogs')
    .set({ Authorization: token })

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
    .set({ Authorization: token })
    .expect(201)

  const allBlogs = await api
    .get('/api/blogs')
    .set({ Authorization: token })

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
    .set({ Authorization: token })
    .expect(201)

  expect(newBlog.body.likes).toEqual(0)
})

test('missing title/url field fails', async () => {
  const noTitle = {
    author: 'Anon',
    url: 'google.com'
  }

  const noURL = {
    title: 'Should Fail',
    author: 'Anon'
  }

  await api
    .post('/api/blogs')
    .send(noTitle)
    .set({ Authorization: token })
    .expect(400)

  await api
    .post('/api/blogs')
    .send(noURL)
    .set({ Authorization: token })
    .expect(400)
})

describe('deleting a blog', () => {
  test('succeeds with 204 if valid id', async () => {
    const allBlogs = await api
      .get('/api/blogs')
      .set({ Authorization: token })
    const blogToDelete = allBlogs.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: token })
      .expect(204)

    const updatedBlogs = await api
      .get('/api/blogs')
      .set({ Authorization: token })
    expect(updatedBlogs.body).toHaveLength(allBlogs.body.length - 1)

    const titles = updatedBlogs.body.map((blog) => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails 400 if invalid id', async () => {
    const fakeid = 'fakeid'

    await api
      .delete(`/api/blogs/${fakeid}`)
      .set({ Authorization: token })
      .expect(400)
  })
})

describe('update a post', () => {
  test('suceeds with status 200 if update is succesful', async () => {
    const allBlogs = await api
      .get('/api/blogs')
      .set({ Authorization: token })
    const blogToEdit = allBlogs.body[0]

    blogToEdit.likes += 1

    const updatedBlog = await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(blogToEdit)
      .set({ Authorization: token })
      .expect(200)

    expect(updatedBlog.body.likes).toEqual(blogToEdit.likes)
  })

  test('fails 400 with invalid id', async () => {
    const invalidId = 'invalidid'

    const fakeBlog = {
      title: 'fake title',
      author: 'fake author',
      url: 'fakeurl.com',
      likes: 0
    }

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(fakeBlog)
      .set({ Authorization: token })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
