/* eslint-disable no-undef */
const mongoose = require('mongoose')

const params = process.argv.length

if (params < 3) {
  console.log('Please enter your password')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://admin:${password}@cluster0.ev0ug1n.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Contact = mongoose.model('Contact', contactSchema)

if (params < 5) {
  Contact
    .find({})
    .then(results => {
      console.log('phonebook:')
      results.forEach(result => {
        console.log(result.name, result.number)
      })
      mongoose.connection.close()
      process.exit(0)
    })
}

const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4]
})

contact.save().then(() => {
  console.log(`added ${contact.name} ${contact.number} to phonebook`)
  mongoose.connection.close()
})