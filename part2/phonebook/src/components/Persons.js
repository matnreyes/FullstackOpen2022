import personService from '../services/persons'

const Persons = ({ setPersons, setDisplay, display, setMessage }) => {
    const handleDelete = (person) => {
    const id = person.id
    if (!window.confirm(`Do you wish to delete ${person.name}`)) {
        return
    }
    const updatedPersons = display.filter(p => p.id !== id)
        personService
            .delPerson(id)
            .catch(error => {
                setMessage(`${person.name} has already been deleted from server`)
                setTimeout(() => {
                    setMessage(null)
                }, 2000)
            })

        setDisplay(updatedPersons)
        setPersons(updatedPersons)
    }

    return (
        <ul>
            {display.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></li>)} 
        </ul>
    )
}

export default Persons