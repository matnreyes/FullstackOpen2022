const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const user = {
    username: 'username',
    name: 'testUser',
    password: 'password'
  }
  await api.post('/api/users').send(user)
})

describe('adding users', () => {
  test('fails when username is too short', async () => {
    const usersAtStart = await api.get('/api/users')
    const newUser = {
      username: 'te',
      name: 'short user0',
      password: 'password'
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    expect(result.body.error).toContain(
      'Username is should be longer than 3 characters'
    )

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)
  })

  test('fails when password is too short', async () => {
    const usersAtStart = await api.get('/api/users')
    const newUser = {
      username: 'testusername',
      name: 'short user1'
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    expect(result.body.error).toContain(
      'Password must be at least 3 characters long'
    )

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)
  })

  test('fails when username already in DB', async () => {
    const user = {
      username: 'username',
      name: 'user',
      password: 'testtpass'
    }

    const usersAtStart = await api.get('/api/users')

    const result = await api.post('/api/users').send(user).expect(400)

    expect(result.body.error).toContain(
      'Error, expected `username` to be unique'
    )

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
