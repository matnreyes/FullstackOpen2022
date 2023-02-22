/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id.toString()
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: '1h'
  })

  res.status(200).send({ token, username: user.username })
})

module.exports = loginRouter
