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
        const isDupe = findDupe(newName.toLocaleLowerCase())
        if (isDupe) {
          if (window.confirm(`${newName} is already in your phonebook, would you like to update their number?`)) {
            personService
              .update({...isDupe, number: newNumber})
              .then(updated => {
                const newContacts = persons.map(p => p.id === updated.id ? updated : p)
                setDisplay(newContacts)
                setPersons(newContacts)
              })
          }

          setNewName('')
          setNewNumber('')
          return
        }

        personService
          .create({name: newName, number: newNumber})
          .then(newPerson => {
            setDisplay(persons.concat(newPerson))
            setPersons(persons.concat(newPerson))
          })
        setNewName('')
        setNewNumber('')
      }
    
      const findDupe = (name) => persons.find(p => p.name.toLowerCase() === name)
    
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