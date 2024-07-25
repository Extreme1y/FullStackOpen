const Persons = ({persons, deleteOption}) => {
    return (
        <ul>
            {persons.map(person =>
                <li key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => deleteOption(person.id)}>delete</button>
                </li>
            )}
        </ul>
    )
}

export default Persons