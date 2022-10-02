const Persons = ({ display }) => {
    return (
        <ul>
            {display.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
        </ul>
    )
}

export default Persons