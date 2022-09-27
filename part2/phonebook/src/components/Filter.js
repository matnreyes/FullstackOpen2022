import { useState } from 'react'

const Filter = ({ persons, setDisplay }) => {
    const [newSearch, setNewSearch] = useState('')

    const handleSearch = (e) => {
        setNewSearch(e.target.value)
        const match = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()))
        match ? setDisplay(match) : setDisplay(persons)
    }

    return (
        <div>
            filter shown with<input value={newSearch} onChange={handleSearch}/>
        </div>
    )
}

export default Filter