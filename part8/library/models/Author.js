const mongoose = require('mongoose')

// const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 4,
    // unique: true
  },
  born: {
    type: Number
  }
})

// schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)