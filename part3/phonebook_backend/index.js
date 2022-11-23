const express = require ('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const app = express()
const Contact = require('./models/contact')
const contact = require('./models/contact')
const { response } = require('express')

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.static('build'))

app.use(cors())
app.use(express.json())
app.use(morgan((tokens, req, res) => [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
    ].join(' ')
))

app.get('/api/contacts', (req, res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts)
    })
})

app.get('/info', (req, res) => {
    res.send(`
        Phoneboook has info for ${contacts.length} 
        <p>${Date()}</p>
    `)
})

app.get('/api/contacts/:id', (req, res) => {
    Contact.findById(req.params.id).then(contact => {
        res.json(contact)
    })
    .catch(err => {
        console.log('unknown id')
        res.status(500).json('note not found').end()
    })
})

app.delete('/api/contacts/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
    const maxId = contacts.length > 0
        ? Math.max(...contacts.map(p => p.id))
        : 0
    
    return maxId + 1
}

app.post('/api/contacts', (req, res) => {
   const body = req.body
   console.log(body)

   if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({ error: 'missing field'})
   }

   const contact = new Contact({
        name: body.name,
        number: body.number
   })

   contact.save().then((returnedContact) => {
        res.json(returnedContact)
   })
})

app.put('/api/contacts/:id', (req, res) => {
    const body = req.body

    Contact.findById(req.params.id).then(contact => {
        contact.number = body.number
        contact.save()
    })
    
    Contact.find({}).then(contacts => {
        res.json(contacts)
    })
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})