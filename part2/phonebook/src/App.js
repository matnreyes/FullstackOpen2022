import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [display, setDisplay] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setDisplay(initialPersons)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={persons} setDisplay={setDisplay}/>
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setDisplay={setDisplay}/>
      <h2>Numbers</h2>
      <Persons setPersons={setPersons} setDisplay={setDisplay} display={display}/>
    </div>
  )
}

export default App