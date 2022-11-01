const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://admin:${password}@cluster0.ev0ug1n.mongodb.net/phonebook?retryWrites=true&w=majority`

const contactSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Contact = mongoose.model('Contact', contactSchema)


mongoose
.connect(url)
.then(result => {
        const contact = new Contact({
            name: process.argv[3],
            number: process.argv[4]
        })

        return contact.save()
    })
    .then(() => {
        return mongoose.connection.close()
    })
    .catch(err => console.log(err))