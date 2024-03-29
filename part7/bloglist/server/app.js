// eslint-disable-next-line import/order
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const resetRouter = require('./controllers/reset')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('Connecting to mongoDB', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to mongoDB')
  })
  .catch((error) => {
    logger.error(error)
  })

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing/reset', resetRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
