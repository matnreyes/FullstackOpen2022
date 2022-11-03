const { response } = require('express')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(err => {
        console.log('error connecting to MongoDB', err.meesage)
    })

const contactSchema = new mongoose.Schema({
    name: String,
    number: Number
})


contactSchema.set('toJSON', {
    transform: (documenct, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)
