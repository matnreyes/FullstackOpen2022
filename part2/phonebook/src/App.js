import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [display, setDisplay] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setDisplay(response.data)
      })
  }, [])

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