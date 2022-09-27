import { useState } from 'react'

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
          const newPersons = persons.concat({name: newName, number: newNumber})
          setPersons(newPersons)
          setDisplay(newPersons)
        }
        setNewName('')
        setNewNumber('')
      }
    
      const findDupe = (newName) => persons.some(p => p.name === newName)
    
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