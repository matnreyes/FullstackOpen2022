import personService from '../services/persons'

const Persons = ({ setPersons, setDisplay, display }) => {
    const handleDelete = (id) => {
        const updatedPersons = display.filter(p => p.id !== id)
        personService
            .delPerson(id)

        setDisplay(updatedPersons)
        setPersons(updatedPersons)
    }

    return (
        <ul>
            {display.map(person => <li key={person.id}>{person.name} {person.number}<button onClick={() => handleDelete(person.id)}>delete</button></li>)} 
        </ul>
    )
}

export default Persons