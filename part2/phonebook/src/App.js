import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [display, setDisplay] = useState(persons)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={persons} setDisplay={setDisplay}/>
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setDisplay={setDisplay}/>
      <h2>Numbers</h2>
      <Persons setDisplay={setDisplay} display={display}/>
    </div>
  )
}

export default App