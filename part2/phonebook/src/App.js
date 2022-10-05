import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [display, setDisplay] = useState([])
  const [message, setMessage] = useState(null)

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
      <Message message={message} />
      <h1>Phonebook</h1>
      <Filter persons={persons} setDisplay={setDisplay}/>
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setDisplay={setDisplay} setMessage={setMessage}/>
      <h2>Numbers</h2>
      <Persons setPersons={setPersons} setDisplay={setDisplay} display={display}/>
    </div>
  )
}

export default App