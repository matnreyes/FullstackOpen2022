const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(err => {
        console.log('failed to connect to MongoDB', err.meessage)
    })

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must be longer than 3 characters'],
        unique: [true, 'Contact is already in the database'],
        uniqueCaseInsensitive: true,
        required: [true, 'Contact name required']
    },
    number: {
        type: String,
        validate: {
            validator: (n) => /^\d{2,}-\d+/.test(n),
            message: 'Number format is invalid'
        },
        required: [true, 'Contact must have a number']
    }
})

contactSchema.plugin(uniqueValidator)


contactSchema.set('toJSON', {
    transform: (documenct, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)
