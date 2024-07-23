import {useState, useEffect} from 'react'
import Note from './components/Note.jsx'
import Notification from './components/Notification.jsx'
import noteService from './services/notes.js'
import axios from "axios";
import CountriesView from "./components/CountriesView.jsx";


const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br/>
            <em>Note app, Department of Computer Science</em>
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5,
        }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
            <Footer/>
        </div>
    )
}


/*
const App = () => {
    const [searchQ, setSearchQ] = useState('');
    const [country, setCountry] = useState([]);

    useEffect(() => {
        if (searchQ) {
            axios
                .get(`https://restcountries.com/v3.1/name/${searchQ}`)
                .then(response => {
                    // Ensure response.data is an array; if not, setCountry to an empty array
                    setCountry(Array.isArray(response.data) ? response.data : []);
                })
                .catch(error => {
                    console.error("Failed to fetch countries:", error);
                    setCountry([]); // Set to empty array on error to avoid mapping errors
                });
        }
    }, [searchQ]);

    const handleSearchChange = (event) => {
        console.log(event.target.value);
        setSearchQ(event.target.value);
    };

    // No need to check for null here as country is always an array
    const countriesToShow = searchQ
        ? country.filter(country => country.name.common.toLowerCase().includes(searchQ.toLowerCase()))
        : country;

    return (
        <div>
            find countries: <input value={searchQ} onChange={handleSearchChange}/>
            <CountriesView countries={countriesToShow}/>
        </div>
    );
};
 */

export default App;