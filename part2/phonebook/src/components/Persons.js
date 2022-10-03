import personService from '../services/persons'

const Persons = ({ setPersons, setDisplay, display }) => {
    const handleDelete = (person) => {
    const id = person.id
    if (!window.confirm(`Do you wish to delete ${person.name}`)) {
        return
    }
    const updatedPersons = display.filter(p => p.id !== id)
        personService
            .delPerson(id)

        setDisplay(updatedPersons)
        setPersons(updatedPersons)
    }

    return (
        <ul>
            {display.map(person => <li key={person.id}>{person.name} {person.number}<button onClick={() => handleDelete(person)}>delete</button></li>)} 
        </ul>
    )
}

export default Persons