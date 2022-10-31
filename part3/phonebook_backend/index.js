const express = require ('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))

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

let contacts = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-12345"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-52423342"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-123455"
    },
    {
        "id": 4,
        "name": "Harry Povenmire",
        "number": "337-123-4565"
    }
]

app.get('/api/contacts', (req, res) => {
    res.json(contacts)
})

app.get('/info', (req, res) => {
    res.send(`
        Phoneboook has info for ${contacts.length} 
        <p>${Date()}</p>
    `)
})

app.get('/api/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find(p => p.id === id)

    contact ? res.json(contact) : res.status(404).end()
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

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})