import { useState } from 'react'

const NewContact = ({ persons, setPersons }) => {
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
        findDupe(newName)
        ? alert(`${newName} is already in the phonebook`)
        : setPersons(persons.concat({name: newName, number: newNumber}))
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

export default NewContact