const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [4, 'Name should be at least 4 characters']
  },
  born: {
    type: Number
  }
})

module.exports = mongoose.model('Author', schema)