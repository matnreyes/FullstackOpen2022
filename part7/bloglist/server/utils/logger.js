/* eslint-disable no-unused-expressions */
const info = (...params) => {
  process.env.NODE_ENV === 'test' ? 1 : console.log(...params)
}

const error = (...params) => {
  process.env.NODE_ENV === 'test' ? 1 : console.error(...params)
}

module.exports = {
  info,
  error
}
