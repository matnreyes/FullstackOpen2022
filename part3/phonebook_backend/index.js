const express = require ('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const app = express()
const Contact = require('./models/contact')

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
})

app.delete('/api/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    contacts = contacts.filter(p => p.id !== id)

    res.status(204).end()
})

const generateId = () => {
    const maxId = contacts.length > 0
        ? Math.max(...contacts.map(p => p.id))
        : 0
    
    return maxId + 1
}

const findDupe = (name) => contacts.find(c => c.name.toLowerCase() === name)

app.post('/api/contacts', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    if (findDupe(body.name.toLowerCase())) {
        return res.status(409).json({
            error: 'contact already exists'
        })
    }

    const contact = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    contacts = contacts.concat(contact)
    res.json(contact)
})

app.put('/api/contacts/:id', (req, res) => {
    const body = req.body

    contacts = contacts.map(p => p.id === body.id ? body : p)
    res.json(contacts)
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})