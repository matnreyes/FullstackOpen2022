const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
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
