const resetRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const Comment = require('../models/comment')

resetRouter.post('/', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Comment.deleteMany({})

  res.status(204).end()
})

module.exports = resetRouter
