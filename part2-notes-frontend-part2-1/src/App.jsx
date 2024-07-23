import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from './components/services/persons.js'
import Notification from "./components/Notification.jsx";

/*
const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState()
    const [showAll, setShowAll] = useState(true)


    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)
    //if show all => show all notes, else => show only the important ones


    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: notes.length + 1
        }
        setNotes(notes.concat(noteObject)) //always use concat instead of changing the state directly
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note}/>
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type={'submit'}>save</button>
            </form>
        </div>
    )
}

 */

import {useState, useEffect} from 'react'

/*
const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log('promise fulfilled')
                setNotes(response.data)
            })
    }

    useEffect(hook, [])
    console.log('render', notes.length, 'notes')

    // ...
}
*/

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchQ, setSearchQ] = useState('')
    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState(false)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
    }, []);


    const addPerson = (event, id) => {
        event.preventDefault()
        const input = {
            name: newName,
            number: newNumber
        }

        const personExists = persons.some(person => person.name === newName && person.number === newNumber)
        const numberChange = persons.some(person => person.name === newName && person.number !== newNumber)


        if (personExists) {
            alert(newName + ' is already added to phonebook')
        } else {
            if (numberChange) {
                const personToUpdate = persons.find(person => person.name === newName)
                const confirmChange = window.confirm(`Change ${input.name}'s number?`)

                if (confirmChange) {
                    const changedNum = {... personToUpdate, number: newNumber}
                    personService
                        .update(personToUpdate.id, changedNum)
                        .then(returned => {
                            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returned))
                        })
                        .catch(error => {
                            setNotification(`Information of ${personToUpdate.name} has already been removed from the server`)
                            setNotificationType(true)
                            setTimeout(() => {
                                setNotification(null)
                            }, 5000)
                        });
                }
            }

            else {
                personService
                    .create(input)
                    .then(returned => {
                        setPersons(persons.concat(returned))
                        setNotification(`Added ${returned.name}`)
                        setNotificationType(false)
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    })
            }
        }

        setNewName('')
        setNewNumber('')
    }

    const deletePerson = id => {
        const person = persons.find(p => p.id === id);
        const confirmDelete = window.confirm(`Delete ${person.name}?`);

        if (confirmDelete) {
            personService
                .erase(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id));
                })
                .catch(error => {
                    alert(`The person '${person.name}' was already deleted from the server.`);
                    setPersons(persons.filter(p => p.id !== id));
                });
        }
    };

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearchQ(event.target.value)
    }

    const personsToShow = searchQ
        ? persons.filter(person => person.name.toLocaleLowerCase().includes(searchQ.toLowerCase()))
        : persons


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} error={notificationType}/>
            <div>
                <Filter searchQ={searchQ} onChange={handleSearchChange}/>
            </div>
            <h3>Add a new</h3>
            <PersonForm add={addPerson} handleName={handleNameChange} handleNumber={handleNumberChange}
                        newNumber={newNumber} newName={newName}/>
            <h2>Numbers</h2>
            <Persons persons={personsToShow} deleteOption={deletePerson}/>
        </div>
    )
}


export default App