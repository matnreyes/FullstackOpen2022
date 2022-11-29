// eslint-disable-next-line import/order
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('Connecting to mongoDB', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to mongoDB')
  })
  .catch((error) => {
    logger.error(error)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
