import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, setDisplay }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNewNumber = (e) => {
        setNewNumber(e.target.value)
      }

    const handleNewName = (e) => {
        setNewName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (findDupe(newName)) {
          alert(`${newName} is already in the phonebook`)

        } else {
          personService
            .create({name: newName, number: newNumber})
            .then(newPerson => {
              setDisplay(persons.concat(newPerson))
              setPersons(persons.concat(newPerson))
            })
        }
        setNewName('')
        setNewNumber('')
      }
    
      const findDupe = (newName) => persons.some(p => p.name.toLowerCase() === newName.toLowerCase())
    
    return (
        <form onSubmit={handleSubmit}>
        <div>name: <input value={newName} onChange={handleNewName}/></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm