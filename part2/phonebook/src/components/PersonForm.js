import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, setDisplay, setMessage }) => {
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
                setMessage(`${newName} has been updated`)
                setDisplay(updated)
                setPersons(updated)
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
              })
              .catch(error => {
                setMessage(`error: ${error.response.data.error}`)
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
              })
          }

          setNewName('')
          setNewNumber('')
          return
        }

        personService
          .create({name: newName, number: newNumber})
          .then(newPerson => {
            setMessage(`Added ${newName} to phonebook`)
            setDisplay(persons.concat(newPerson))
            setPersons(persons.concat(newPerson))
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage('error: ' + error.response.data.error)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
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