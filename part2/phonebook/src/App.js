import { useState } from 'react'
import NewContact from './components/NewContact'

const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const handleSearch = (e) => {
    setNewSearch(e.target.value)

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>filter shown with<input value={newSearch} onChange={handleSearch}/></div>
      <h2>add a new</h2>
      <NewContact persons={persons} setPersons={(setPersons)}/>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App