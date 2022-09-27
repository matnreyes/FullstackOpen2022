const Persons = ({ display }) => {
    return (
        <ul>
            {display.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
    )
}

export default Persons