const express = require ('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})