import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

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