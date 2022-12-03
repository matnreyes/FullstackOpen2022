const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body
  if (password.length < 3) {
    const error = {
      name: 'ValidationError',
      message: 'Password must be at least 3 characters long'
    }
    return next(error)
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = new User({
    username,
    name,
    passwordHash
  })
  const savedUser = await newUser.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})

  res.json(users)
})

module.exports = usersRouter
